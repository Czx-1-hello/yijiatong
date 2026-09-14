[CmdletBinding()]
param(
    [string]$BackendUrl = 'http://127.0.0.1:8080',
    [string]$AdminUrl = 'http://127.0.0.1:5173'
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$backendRoot = Join-Path $repoRoot 'services\backend'
$backendJar = Join-Path $backendRoot 'ruoyi-admin\target\ruoyi-admin.jar'
$foundationSql = Join-Path $backendRoot 'script\sql\p3_foundation.sql'
$mysqlContainer = 'yijiatong-dev-mysql-1'
$redisContainer = 'yijiatong-dev-redis-1'
$suffix = (Get-Date -Format 'yyyyMMddHHmmss')
$databaseName = "p3_verify_$suffix"
$databaseUser = "p3v_$($suffix.Substring(6))"
$redisUser = "p3v_$($suffix.Substring(6))"
$redisKeyPrefix = "p3_verify_${suffix}:"
$databasePassword = ([guid]::NewGuid().ToString('N') + 'Aa1!')
$redisPassword = ([guid]::NewGuid().ToString('N') + 'Bb2!')
$adminUsername = "p3-admin-$($suffix.Substring(8))"
$adminPassword = ('P3!' + [guid]::NewGuid().ToString('N').Substring(0, 20) + 'Cc3')
$actuatorUsername = "p3-health-$($suffix.Substring(8))"
$actuatorPassword = ('P3!' + [guid]::NewGuid().ToString('N') + 'Dd4')
$jwtSecret = ([guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N'))
$healthHeaders = @{}
$backendProcess = $null
$databaseCreated = $false
$redisUserCreated = $false
$logPrefix = Join-Path ([System.IO.Path]::GetTempPath()) "yijiatong-p3-$suffix"
$stdoutLog = "$logPrefix.out.log"
$stderrLog = "$logPrefix.err.log"

$dockerCandidates = @(
    (Join-Path $env:LOCALAPPDATA 'Programs\DockerDesktop\resources\bin\docker.exe'),
    'C:\Program Files\Docker\Docker\resources\bin\docker.exe'
)
$dockerExe = $dockerCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1

function Invoke-Docker {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments)

    & $dockerExe @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Docker command failed with exit code $LASTEXITCODE"
    }
}

function Wait-ForBackend {
    $deadline = (Get-Date).AddSeconds(90)
    do {
        try {
            $health = Invoke-RestMethod -Uri "$BackendUrl/actuator/health" -Headers $healthHeaders -TimeoutSec 3
            if ($health.status -eq 'UP') {
                return $health
            }
        } catch {
            Start-Sleep -Seconds 2
        }
    } while ((Get-Date) -lt $deadline)

    throw 'Backend did not become healthy within 90 seconds'
}

if (-not $dockerExe) {
    throw 'Docker CLI was not found in an approved Docker Desktop location'
}
if (-not (Test-Path -LiteralPath $backendJar)) {
    throw "Backend package is missing: $backendJar"
}
if (-not (Test-Path -LiteralPath $foundationSql)) {
    throw "P3 foundation SQL is missing: $foundationSql"
}
if ($databaseName -notmatch '^p3_verify_[0-9]{14}$') {
    throw 'Generated verification database name failed validation'
}

try {
    $adminResponse = Invoke-WebRequest -UseBasicParsing -Uri "$AdminUrl/" -TimeoutSec 5
    if ($adminResponse.StatusCode -ne 200) {
        throw "Admin UI returned HTTP $($adminResponse.StatusCode)"
    }
    Write-Output 'ADMIN_UI_HTTP=PASS'

    $containerStatus = & $dockerExe inspect --format '{{.State.Health.Status}}' $mysqlContainer $redisContainer
    if ($LASTEXITCODE -ne 0 -or @($containerStatus | Where-Object { $_ -eq 'healthy' }).Count -ne 2) {
        throw 'MySQL and Redis containers must both be healthy before P3 runtime verification'
    }
    Write-Output 'CONTAINERS_HEALTHY=PASS'

    $setupSql = @"
CREATE DATABASE ``$databaseName`` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER '$databaseUser'@'%' IDENTIFIED BY '$databasePassword';
GRANT ALL PRIVILEGES ON ``$databaseName``.* TO '$databaseUser'@'%';
FLUSH PRIVILEGES;
"@
    $setupSql | & $dockerExe exec -i $mysqlContainer sh -lc 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD"'
    if ($LASTEXITCODE -ne 0) {
        throw 'Unable to create the isolated P3 verification database'
    }
    $databaseCreated = $true

    Invoke-Docker -Arguments @('cp', $foundationSql, "${mysqlContainer}:/tmp/p3_foundation.sql")
    Invoke-Docker -Arguments @('exec', '-e', "P3_DB_NAME=$databaseName", $mysqlContainer, 'sh', '-lc', 'mysql --default-character-set=utf8mb4 -uroot -p"$MYSQL_ROOT_PASSWORD" "$P3_DB_NAME" < /tmp/p3_foundation.sql')
    Write-Output 'MYSQL_SCHEMA_INIT=PASS'

    $aclCommand = 'REDISCLI_AUTH="$REDIS_PASSWORD" redis-cli --no-auth-warning ACL SETUSER ' + $redisUser + ' on ">$P3_REDIS_PASSWORD" ~* +@all'
    Invoke-Docker -Arguments @('exec', '-e', "P3_REDIS_PASSWORD=$redisPassword", $redisContainer, 'sh', '-lc', $aclCommand) | Out-Null
    $redisUserCreated = $true
    $redisPing = & $dockerExe exec -e "REDISCLI_AUTH=$redisPassword" $redisContainer redis-cli --no-auth-warning --user $redisUser -n 15 PING
    if ($LASTEXITCODE -ne 0 -or $redisPing -ne 'PONG') {
        throw 'The isolated Redis ACL user could not establish a test connection'
    }
    Write-Output 'REDIS_ACL_PING=PASS'

    $env:BACKEND_PORT = ([uri]$BackendUrl).Port.ToString()
    $env:DB_HOST = '127.0.0.1'
    $env:DB_PORT = '3307'
    $env:DB_NAME = $databaseName
    $env:DB_USERNAME = $databaseUser
    $env:DB_PASSWORD = $databasePassword
    $env:REDIS_HOST = '127.0.0.1'
    $env:REDIS_PORT = '6379'
    $env:REDIS_DATABASE = '15'
    $env:REDIS_USERNAME = $redisUser
    $env:REDIS_PASSWORD = $redisPassword
    $env:REDIS_KEY_PREFIX = $redisKeyPrefix
    $env:SA_TOKEN_JWT_SECRET = $jwtSecret
    $env:ACTUATOR_USERNAME = $actuatorUsername
    $env:ACTUATOR_PASSWORD = $actuatorPassword
    $env:CAPTCHA_ENABLED = 'false'
    $env:API_ENCRYPT_ENABLED = 'false'
    $env:API_DOCS_ENABLED = 'false'
    $env:ADMIN_BOOTSTRAP_ENABLED = 'true'
    $env:ADMIN_USERNAME = $adminUsername
    $env:ADMIN_PASSWORD = $adminPassword
    $env:ADMIN_UI_URL = $AdminUrl
    $env:ADMIN_ALLOWED_ORIGINS = $AdminUrl
    $basicToken = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("${actuatorUsername}:${actuatorPassword}"))
    $healthHeaders = @{ Authorization = "Basic $basicToken" }

    $backendProcess = Start-Process -FilePath 'java' -ArgumentList @('-jar', $backendJar) -WorkingDirectory $backendRoot -RedirectStandardOutput $stdoutLog -RedirectStandardError $stderrLog -WindowStyle Hidden -PassThru
    $health = Wait-ForBackend
    Write-Output 'BACKEND_START=PASS'
    Write-Output ('HEALTH_STATUS=' + $health.status)

    $healthJson = $health | ConvertTo-Json -Depth 10 -Compress
    if ($healthJson -notmatch 'db' -or $healthJson -notmatch 'redis') {
        throw 'Health response did not include both database and Redis indicators'
    }
    Write-Output 'MYSQL_REDIS_HEALTH=PASS'

    $loginBody = @{
        username = $adminUsername
        password = $adminPassword
        clientId = 'yijiatong-p3-admin'
        grantType = 'password'
    } | ConvertTo-Json
    $loginResponse = Invoke-RestMethod -Method Post -Uri "$AdminUrl/dev-api/auth/login" -ContentType 'application/json' -Body $loginBody -TimeoutSec 15
    $accessToken = $loginResponse.data.access_token
    if ($loginResponse.code -ne 200 -or [string]::IsNullOrWhiteSpace($accessToken)) {
        throw 'Administrator login did not return a valid access token'
    }
    Write-Output 'ADMIN_LOGIN=PASS'

    $headers = @{
        Authorization = "Bearer $accessToken"
        clientid = 'yijiatong-p3-admin'
    }
    $userInfo = Invoke-RestMethod -Uri "$AdminUrl/dev-api/system/user/getInfo" -Headers $headers -TimeoutSec 15
    $routers = Invoke-RestMethod -Uri "$AdminUrl/dev-api/system/menu/getRouters" -Headers $headers -TimeoutSec 15
    $permissions = @($userInfo.data.permissions)
    $roles = @($userInfo.data.roles)
    $routerJson = $routers.data | ConvertTo-Json -Depth 20 -Compress
    if ($userInfo.code -ne 200 -or $permissions -notcontains '*:*:*' -or $roles -notcontains 'superadmin') {
        throw 'Administrator RBAC permissions were not established'
    }
    if ($routers.code -ne 200 -or @($routers.data).Count -lt 2 -or $routerJson -notmatch 'system' -or $routerJson -notmatch 'monitor') {
        throw 'System and monitoring menu routes were not returned'
    }
    Write-Output 'RBAC_PERMISSIONS=PASS'
    Write-Output 'MENU_ROUTES=PASS'

    $unlockResponse = Invoke-RestMethod -Uri "$AdminUrl/dev-api/monitor/loginInfo/unlock/$adminUsername" -Headers $headers -TimeoutSec 15
    if ($unlockResponse.code -ne 200) {
        throw 'Audited account-unlock endpoint did not complete successfully'
    }
    $auditSql = "SELECT IF((SELECT COUNT(*) FROM ``$databaseName``.sys_login_info WHERE user_name='$adminUsername' AND status='0') > 0, 'LOGIN_AUDIT=PASS', 'LOGIN_AUDIT=FAIL'); SELECT IF((SELECT COUNT(*) FROM ``$databaseName``.sys_oper_log WHERE business_type=0 AND status=0) > 0, 'OPERATION_AUDIT=PASS', 'OPERATION_AUDIT=FAIL');"
    $auditDeadline = (Get-Date).AddSeconds(15)
    do {
        Start-Sleep -Seconds 1
        $auditResult = @($auditSql | & $dockerExe exec -i $mysqlContainer sh -lc 'mysql -N -uroot -p"$MYSQL_ROOT_PASSWORD"' | ForEach-Object { $_.Trim() })
    } while (($auditResult -notcontains 'LOGIN_AUDIT=PASS' -or $auditResult -notcontains 'OPERATION_AUDIT=PASS') -and (Get-Date) -lt $auditDeadline)
    $auditResult | Write-Output
    if ($LASTEXITCODE -ne 0 -or $auditResult -notcontains 'LOGIN_AUDIT=PASS' -or $auditResult -notcontains 'OPERATION_AUDIT=PASS') {
        throw 'Runtime audit records were not persisted'
    }

    $mysqlVersion = & $dockerExe exec $mysqlContainer sh -lc 'mysql -N -uroot -p"$MYSQL_ROOT_PASSWORD" -e "select version();"'
    $redisVersion = & $dockerExe exec $redisContainer sh -lc 'REDISCLI_AUTH="$REDIS_PASSWORD" redis-cli --no-auth-warning INFO server | sed -n "s/^redis_version://p" | tr -d "\r"'
    Write-Output ('MYSQL_VERSION=' + $mysqlVersion)
    Write-Output ('REDIS_VERSION=' + $redisVersion)
    Write-Output 'P3_RUNTIME=PASS'
} catch {
    Write-Output ('P3_RUNTIME=FAIL: ' + $_.Exception.Message)
    if (Test-Path -LiteralPath $stdoutLog) {
        Write-Output 'BACKEND_STDOUT_TAIL_BEGIN'
        Get-Content -LiteralPath $stdoutLog -Tail 80
        Write-Output 'BACKEND_STDOUT_TAIL_END'
    }
    if (Test-Path -LiteralPath $stderrLog) {
        Write-Output 'BACKEND_STDERR_TAIL_BEGIN'
        Get-Content -LiteralPath $stderrLog -Tail 80
        Write-Output 'BACKEND_STDERR_TAIL_END'
    }
    throw
} finally {
    if ($backendProcess -and -not $backendProcess.HasExited) {
        Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue
        $backendProcess.WaitForExit(10000)
    }
    if ($redisUserCreated) {
        $verificationKeys = @(& $dockerExe exec -e "REDISCLI_AUTH=$redisPassword" $redisContainer redis-cli --no-auth-warning --user $redisUser -n 15 --scan --pattern "${redisKeyPrefix}*")
        foreach ($key in $verificationKeys) {
            if (-not [string]::IsNullOrWhiteSpace($key) -and $key.StartsWith($redisKeyPrefix, [StringComparison]::Ordinal)) {
                & $dockerExe exec -e "REDISCLI_AUTH=$redisPassword" $redisContainer redis-cli --no-auth-warning --user $redisUser -n 15 UNLINK $key | Out-Null
            }
        }
        $deleteAclCommand = 'REDISCLI_AUTH="$REDIS_PASSWORD" redis-cli --no-auth-warning ACL DELUSER ' + $redisUser
        & $dockerExe exec $redisContainer sh -lc $deleteAclCommand | Out-Null
    }
    if ($databaseCreated) {
        $cleanupSql = "DROP DATABASE ``$databaseName``; DROP USER '$databaseUser'@'%'; FLUSH PRIVILEGES;"
        $cleanupSql | & $dockerExe exec -i $mysqlContainer sh -lc 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' | Out-Null
    }
    Remove-Item -LiteralPath $stdoutLog, $stderrLog -Force -ErrorAction SilentlyContinue
    Write-Output 'P3_RUNTIME_CLEANUP=COMPLETE'
}

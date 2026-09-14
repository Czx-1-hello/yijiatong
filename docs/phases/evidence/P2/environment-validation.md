# P2 environment validation

- Date: 2026-09-14
- Result: **PASS**

## Existing user-confirmed evidence

Before this continuation, the user confirmed that WSL2 was operational, Docker Desktop was running, and the active Docker context was `desktop-linux`. This is retained as user-provided prior evidence and is not presented as a successful automatic validation from this run.

## Automatic validation in this continuation

| Check | Result | Evidence |
|---|---|---|
| Compose interpolation and schema | PASS | `docker compose --env-file .env.example -f deploy/docker/compose.yaml config --quiet` exited 0 |
| WSL2 kernel available to Docker distribution | PASS | `wsl -d docker-desktop -- uname -r` returned `6.18.33.2-microsoft-standard-WSL2` |
| Docker Linux Engine API | PASS | The recovered `desktop-linux` Engine accepted Compose and container commands |
| MySQL 8.4.9 container start and health | PASS | The pinned `mysql:8.4.9` container reached `running/healthy` |
| MySQL server version | PASS | An in-container TCP connection reported `8.4.9` |
| MySQL test connection | PASS | The configured application user connected to the configured development database and `SELECT 1` returned `1` |
| Redis 8.6.3 container start and health | PASS | The pinned `redis:8.6.3` container reached `running/healthy` |
| Redis command and version | PASS | An authenticated `PING` returned `PONG`; an unauthenticated request was correctly rejected, and server information reported `8.6.3` |
| Host-port reachability | PASS | `127.0.0.1:3307` and `127.0.0.1:6379` accepted TCP connections |
| Restart durability | PASS | Both services were restarted once, returned to `healthy`, and passed the MySQL connection/version and Redis `PING`/version checks again |

Host port `3306` was already occupied by an unrelated local `mysqld` process (PID 7488). The validation used the Compose file's existing `MYSQL_PORT` environment override with temporary host port `3307`; the unrelated process was not stopped. No `.env.example`, Compose definition, Docker/WSL setting, business code, or Mock Catalog file was changed.

No formal product table, P4 schema, or business data was created. The validated containers were left running and healthy.

## Runtime closure

The P2 Docker runtime gate is closed. For repeat local starts on this machine while host MySQL continues to use `3306`, set `MYSQL_PORT=3307` in the ignored local `.env` file. Do not place local credentials in tracked documentation.

P2 still requires a successful hosted GitHub Actions run; see `ci-validation.md`. P3 remains blocked by that separate criterion.

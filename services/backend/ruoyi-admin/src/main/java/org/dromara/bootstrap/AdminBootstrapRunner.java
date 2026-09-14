package org.dromara.bootstrap;

import cn.hutool.crypto.digest.BCrypt;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dromara.system.domain.SysUser;
import org.dromara.system.mapper.SysUserMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/**
 * Activates the disabled bootstrap administrator only when explicit local
 * credentials are supplied through environment variables.
 */
@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "yijiatong.bootstrap-admin.enabled", havingValue = "true")
public class AdminBootstrapRunner implements ApplicationRunner {

    static final long BOOTSTRAP_USER_ID = 1761100000000000001L;

    private final SysUserMapper userMapper;

    @Value("${ADMIN_USERNAME:}")
    private String username;

    @Value("${ADMIN_PASSWORD:}")
    private String password;

    @Override
    public void run(ApplicationArguments args) {
        validateCredentials(username, password);
        int updated = userMapper.lambda()
            .set(SysUser::getUserName, username)
            .set(SysUser::getNickName, "Yijiatong Administrator")
            .set(SysUser::getPassword, BCrypt.hashpw(password))
            .set(SysUser::getStatus, "0")
            .eq(SysUser::getUserId, BOOTSTRAP_USER_ID)
            .updateCount();
        if (updated != 1) {
            throw new IllegalStateException("Disabled bootstrap administrator record is missing");
        }
        log.info("Bootstrap administrator activated from environment-provided credentials");
    }

    static void validateCredentials(String username, String password) {
        if (username == null || username.isBlank() || username.length() > 30) {
            throw new IllegalStateException("ADMIN_USERNAME must contain between 1 and 30 characters");
        }
        if (password == null || password.length() < 12 || password.length() > 30) {
            throw new IllegalStateException("ADMIN_PASSWORD must contain between 12 and 30 characters");
        }
    }
}

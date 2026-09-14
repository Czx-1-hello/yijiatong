package org.dromara.bootstrap;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@Tag("dev")
class AdminBootstrapRunnerTest {

    @Test
    void rejectsMissingBootstrapCredentials() {
        assertThrows(IllegalStateException.class, () -> AdminBootstrapRunner.validateCredentials("", ""));
    }

    @Test
    void rejectsShortBootstrapPassword() {
        assertThrows(IllegalStateException.class, () -> AdminBootstrapRunner.validateCredentials("admin", "short"));
    }

    @Test
    void rejectsBootstrapPasswordLongerThanLoginContract() {
        assertThrows(IllegalStateException.class,
            () -> AdminBootstrapRunner.validateCredentials("admin", "1234567890123456789012345678901"));
    }

    @Test
    void acceptsExplicitStrongBootstrapCredentials() {
        assertDoesNotThrow(() -> AdminBootstrapRunner.validateCredentials("local-admin", "replace-this-password"));
    }
}

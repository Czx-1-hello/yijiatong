# License register

P0 records the current Mini Program dependency licenses and the repository metadata mismatch. P1 records the candidate backend, database, cache, and SDK license boundaries.

P2 adds the official WeChat `miniprogram-ci` development tool and must record its resolved license in the generated lockfile and P2 evidence. No runtime product dependency is upgraded in P2.

Redis 8.6.3 remains development-only in this phase. Its production deployment mode and applicable license terms require an explicit review before production adoption; P2 Docker availability is not that approval.

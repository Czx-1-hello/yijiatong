# Local Docker environment

The P2 environment contains MySQL 8.4.9 and Redis 8.6.3 only. Both ports bind to `127.0.0.1`; the services are not exposed to the LAN.

## Start

1. Copy `.env.example` to `.env` and replace every `change_me_for_local_development` value. Never commit `.env`.
2. Start and wait for health checks:

```powershell
docker compose --env-file .env -f deploy/docker/compose.yaml up -d --wait
```

For a disposable validation using the documented non-production examples:

```powershell
docker compose --env-file .env.example -f deploy/docker/compose.yaml up -d --wait
```

## Inspect and stop

```powershell
docker compose --env-file .env -f deploy/docker/compose.yaml ps
docker compose --env-file .env -f deploy/docker/compose.yaml down
```

Named volumes preserve data. Do not add `--volumes` unless permanent deletion is explicitly intended.

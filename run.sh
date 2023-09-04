docker compose -f compose.dev.yaml up -d expensedb
docker compose -f compose.dev.yaml up -d --force-recreate --build expense-dashboard

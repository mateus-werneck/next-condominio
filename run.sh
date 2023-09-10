docker compose -f compose.dev.yaml up -d expensedb
npx prisma migrate dev
docker compose -f compose.dev.yaml up -d --force-recreate --build expense-dashboard

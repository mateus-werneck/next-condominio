docker compose -f compose.dev.yaml up -d expensedb
npx prisma migrate dev
npx prisma db seed
docker compose -f compose.dev.yaml up -d --force-recreate --build condominium-dashboard

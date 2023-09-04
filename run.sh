docker stop expense-dashboard
docker rm expense-dashboard
docker image prune
docker network prune

docker compose -f compose.dev.yaml up -d expensedb
docker compose -f compose.dev.yaml up -d --force-recreate --build expense-dashboard

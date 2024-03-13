to run the app run the following commands:

  1- docker cp database/db_dump.sql db-cw-postgres-1:/db_dump.sql 

  2- docker exec -it db-cw-postgres-1 psql -U postgres -d coursework -f /db_dump.sql

  3- docker compose up --build

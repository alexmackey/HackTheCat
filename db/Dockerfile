FROM mysql 
EXPOSE 3306 
COPY ./setupDatabase.sql /docker-entrypoint-initdb.d/
COPY ./setupDatabaseDocker.sql /docker-entrypoint-initdb.d/
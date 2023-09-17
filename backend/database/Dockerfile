FROM mariadb:10.6

WORKDIR /docker-entrypoint-initdb.d

COPY init/init.sql .

CMD ["mysqld"]
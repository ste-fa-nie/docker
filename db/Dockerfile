FROM mariadb:10.6.12

ENV MYSQL_ROOT_PASSWORD=fatec
ENV MYSQL_DATABASE=agenda
COPY init.sql /docker-entrypoint-initdb.d/

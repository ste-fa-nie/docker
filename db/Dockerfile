FROM mariadb:10.6.12

ENV MYSQL_ROOT_PASSWORD=1234
ENV MYSQL_DATABASE=cadastro
COPY init.sql /docker-entrypoint-initdb.d/

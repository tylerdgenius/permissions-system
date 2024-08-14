CREATE USER admin WITH PASSWORD 'Password$';
CREATE DATABASE permissions;
GRANT ALL PRIVILEGES ON DATABASE permissions TO admin;
GRANT ALL PRIVILEGES ON SCHEMA public TO admin;
ALTER USER admin WITH SUPERUSER;

/**
Incase user doesn't get appropriate privileges, use command below. Remove if it does

ALTER USER admin WITH SUPERUSER;

**/

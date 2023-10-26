CREATE DATABASE IF NOT EXISTS linkgamein;
USE linkgamein;

CREATE TABLE IF NOT EXISTS users (
id_user INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
nickname VARCHAR(25) NOT NULL,
email VARCHAR (70) NOT NULL,
password VARCHAR(15) NOT NULL,
-- password_hash VARCHAR(15) NOT NULL,
-- password_salt VARCHAR(15) NOT NULL
confirm_pass VARCHAR(15) NOT NULL,
PRIMARY KEY (id_user)
);
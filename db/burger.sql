DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers
(
	id INT AUTO_INCREMENT PRIMARY KEY,
	burger_name VARCHAR(100) not null,
	devoured BOOLEAN default false,
	date TIMESTAMP
);
INSERT INTO burgers (burger_name) VALUES ("bacon");
INSERT INTO burgers (burger_name) VALUES ("cheeseburger");
INSERT INTO burgers (burger_name) VALUES ("philysteak");
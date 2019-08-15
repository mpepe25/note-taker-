/* Create and use the starwars db */
DROP DATABASE IF EXISTS `starwars`;
CREATE DATABASE `starwars`;
USE `starwars`;


/* Create a table for all your star wars characters */
CREATE TABLE `allcharacters` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`routeName` VARCHAR( 255) NOT NULL,
	`name` VARCHAR( 255 ) NOT NULL,
	`role` VARCHAR( 255 ) NOT NULL,
	`age` Int(11) NOT NULL,
	`forcePoints` Int(11) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( `id` )
);

insert into (routeName, name, role, age, forcepoint),
Values ("starwarsCharacter,darva  
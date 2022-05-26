CREATE DATABASE IF NOT EXISTS company;
USE company;

CREATE TABLE employees (
	emp_id INT(11) NOT NULL AUTO_INCREMENT,
	emp_firstname VARCHAR(45) DEFAULT NULL, 
    emp_lastname VARCHAR(45) DEFAULT NULL,
    emp_email VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY(emp_id)
);

INSERT INTO employees values
	(1, 'John', 'Scott', 'scottj@gmail.com'),
    (2, 'Tracy', 'McConnell', 'tmcnll@gmail.com'),
    (3, 'Mario', 'Smith', 'msmith@gmail.com');

DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)

);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("shirts", "clothes", 11.99, 25),
("water bottle", "outdoors", 18.99, 20),
("tent", "outdoors", 89.99, 12),
("hammocks", "outdoors", 68.99, 8),
("pants", "clothes", 14.99, 18),
("gloves", "clothes", 11.99, 25),
("eyeliner", "beauty", 7.99, 17),
("foundation", "beauty", 29.99, 15),
("frisbee", "sports", 9.99, 10),
("spikeball", "sports", 59.99, 8)


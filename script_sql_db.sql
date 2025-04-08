-- Tạo database FoodBooking
CREATE DATABASE IF NOT EXISTS `FoodBooking`;
USE `FoodBooking`;


-- Tạo các bảng
CREATE TABLE `user` (
    `user_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE `restaurant` (
    `res_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `res_name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `desc` VARCHAR(500) NOT NULL
);

CREATE TABLE `food_type` (
    `type_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `type_name` VARCHAR(255) NOT NULL
);

CREATE TABLE `food` (
    `food_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `food_name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `price` FLOAT NOT NULL,
    `desc` VARCHAR(500) NOT NULL,
    `type_id` INT NOT NULL,
    FOREIGN KEY (`type_id`) REFERENCES `food_type`(`type_id`)
);

CREATE TABLE `sub_food` (
    `sub_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `sub_name` VARCHAR(255) NOT NULL,
    `sub_price` FLOAT NOT NULL,
    `food_id` INT NOT NULL,
    FOREIGN KEY (`food_id`) REFERENCES `food`(`food_id`)
);

CREATE TABLE `order` (
	`order_id`INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `user_id` INT NOT NULL,
    `food_id` INT NOT NULL,
    `amount` INT NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `arr_sub_id` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`food_id`) REFERENCES `food`(`food_id`)
);

CREATE TABLE `rate_res` (
    `user_id` INT NOT NULL,
    `res_id` INT NOT NULL,
    `amount` INT NOT NULL,
    `date_rate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `is_active` Bool NOT NULL DEFAULT true,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`res_id`) REFERENCES `restaurant`(`res_id`)
);

CREATE TABLE `like_res` (
    `user_id` INT NOT NULL,
    `res_id` INT NOT NULL,
    `date_like` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `is_active` Bool NOT NULL DEFAULT true,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`res_id`) REFERENCES `restaurant`(`res_id`)
);
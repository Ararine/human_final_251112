CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL COMMENT '암호화된 문자열',
    `type` VARCHAR(50) NULL,
    `created_at` DATETIME NULL,
    `points` INT NULL,
    `is_public` TINYINT(1) NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `user_base_info` (
    `id2` INT NOT NULL AUTO_INCREMENT COMMENT 'auto increment 적용',
    `gender` VARCHAR(10) NULL,
    `age` INT NULL,
    `height` FLOAT NULL,
    `weight` FLOAT NULL,
    PRIMARY KEY (`id2`),
    FOREIGN KEY (`id2`) REFERENCES `user`(`id`)
);

CREATE TABLE `admin_user` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'auto increment 적용',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id`) REFERENCES `user`(`id`)
);

CREATE TABLE `unsubscribe_user` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'auto increment 적용',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id`) REFERENCES `user`(`id`)
);

CREATE TABLE `subscribe_user` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'auto increment 적용',
    `subscribed_at` DATE NULL,
    `expires_at` DATE NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id`) REFERENCES `user`(`id`)
);

CREATE TABLE `post` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `title` VARCHAR(255) NULL,
    `contents` TEXT NOT NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    `is_public` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '-1은 관리자가 비공개한 경우',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `comment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `post_id` INT NOT NULL,
    `comment_user_id` INT NOT NULL,
    `comment` TEXT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`post_id`) REFERENCES `post`(`id`),
    FOREIGN KEY (`comment_user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `ROM_history` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `measured_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `base_exercises` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `type` VARCHAR(50) NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `exercise_curriculum` (
    `exercise_id` INT NOT NULL,
    `curriculum_id` INT NULL,
    `sets` INT NULL,
    `times` INT NULL,
    PRIMARY KEY (`exercise_id`),
    FOREIGN KEY (`exercise_id`) REFERENCES `base_exercises`(`id`)
);

CREATE TABLE `base_meals` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `calories` INT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `user_detail_info` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `goal` VARCHAR(255) NULL,
    `job` VARCHAR(255) NULL,
    `activity_level` VARCHAR(50) NULL,
    `activity_duration` TIME NULL,
    `sleep_duration` TIME NULL,
    `chronotype` VARCHAR(50) NULL,
    `disease` VARCHAR(255) NULL,
    `equipment` VARCHAR(255) NULL,
    `food_restrictions` VARCHAR(255) NULL COMMENT '비건',
    `water_intake` INT NULL COMMENT 'ml 단위',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id`) REFERENCES `user`(`id`)
);

CREATE TABLE `qna` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `title` VARCHAR(255) NULL,
    `contents` TEXT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `reported_posts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `post_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `comments` TEXT NULL,
    `reported_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`post_id`) REFERENCES `post`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `post_reactions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `post_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `reaction_type` VARCHAR(50) NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`post_id`) REFERENCES `post`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

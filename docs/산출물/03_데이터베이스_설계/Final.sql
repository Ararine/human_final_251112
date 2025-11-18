-- ---------------------------
-- User 관련 테이블
-- ---------------------------
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL COMMENT '암호화된 문자열',
    `type` ENUM('admin', 'subscribe', 'normal') NOT NULL DEFAULT 'normal',
    CONSTRAINT chk_email_format CHECK (email LIKE '%_@_%._%'),
    PRIMARY KEY (`id`)
);
-- 유저 기본 정보
CREATE TABLE IF NOT EXISTS `user_base_info` (
    `user_id` INT NOT NULL COMMENT 'user 테이블 PK를 참조',
    `gender` VARCHAR(10) NULL,
    `age` INT NULL,
    `height` FLOAT NULL,
    `weight` FLOAT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `points` INT NOT NULL DEFAULT 0,
    `is_public` INT NOT NULL DEFAULT 1,
    PRIMARY KEY (`user_id`),
    CONSTRAINT `FK_user_base_info_user` 
        FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
        ON DELETE CASCADE -- 유저 삭제 시 정보 같이 삭제 
);

-- 유저 상세 정보
CREATE TABLE IF NOT EXISTS `user_detail_info` (
    `user_id` INT NOT NULL COMMENT 'user 테이블 PK 참조',
    `goal` VARCHAR(255) NULL,
    `job` VARCHAR(100) NULL,
    `activity_level` VARCHAR(50) NULL,
    `activity_duration` TIME NULL COMMENT '운동 시간',
    `sleep_duration` TIME NULL COMMENT '수면 시간',
    `chronotype` VARCHAR(50) NULL,
    `disease` VARCHAR(255) NULL,
    `equipment` VARCHAR(255) NULL,
    `food_restrictions` VARCHAR(50) NULL COMMENT '비건 등',
    `water_intake` INT NULL COMMENT 'ml 단위',
    PRIMARY KEY (`user_id`),
    CONSTRAINT `FK_user_detail_info_user` 
        FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);

-- 구독정보
CREATE TABLE IF NOT EXISTS `subscribe_info` (
    `user_id` INT NOT NULL COMMENT 'user 테이블 PK 참조',
    `subscribed_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `expires_at` DATETIME NOT NULL,
    PRIMARY KEY (`user_id`),
    CONSTRAINT `FK_subscribe_info_user` 
        FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
        ON DELETE CASCADE 
);

-- 게시글
CREATE TABLE IF NOT EXISTS `post` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `title` VARCHAR(255) NULL,
    `contents` TEXT NOT NULL,
    `create_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    `is_public` ENUM('1','0','-1') NOT NULL DEFAULT '1' COMMENT '1: 공개, 0: 비공개, -1: 관리자 비공개',
    PRIMARY KEY (`id`),
	--     유저 삭제 시 게시글 삭제되지 않음
    CONSTRAINT `FK_post_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
	--     유저 삭제시 게시글 삭제되게 하려면 활성화
	--     CONSTRAINT `FK_post_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);

-- 댓글
CREATE TABLE IF NOT EXISTS `comment` (
  	`id` INT NOT NULL AUTO_INCREMENT,
    `post_id` INT NOT NULL COMMENT '댓글이 달린 게시글 참조',
    `comment_user_id` INT NOT NULL COMMENT '댓글 작성자(user) 참조',
    `comment` TEXT NULL,
    PRIMARY KEY (`id`),
	--     게시글 삭제 시 댓글 삭제
    CONSTRAINT `FK_comment_post` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_comment_user` FOREIGN KEY (`comment_user_id`) REFERENCES `user`(`id`)
);

-- 좋아요/싫어요
CREATE TABLE IF NOT EXISTS `post_reactions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `post_id` INT NOT NULL COMMENT '게시글 참조',
    `user_id` INT NOT NULL COMMENT '반응한 유저 참조',
    `reaction_type` ENUM('like','dislike') NOT NULL,
    PRIMARY KEY (`post_id`, `user_id`),
	--     게시글 삭제 시 좋아요/싫어요 삭제
    CONSTRAINT `FK_post_reactions_post` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_post_reactions_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

-- 신고된 게시글 정보 
CREATE TABLE IF NOT EXISTS `reported_posts` (
    `post_id` INT NOT NULL COMMENT '신고된 게시글 참조',
    `user_id` INT NOT NULL COMMENT '신고자(user) 참조',
    `comments` TEXT NOT NULL,
    `reported_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`post_id`, `user_id`),
    CONSTRAINT `FK_reported_posts_post` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`),
    CONSTRAINT `FK_reported_posts_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);


-- 관절 가동 범위 정보
CREATE TABLE IF NOT EXISTS `ROM_history` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL COMMENT '측정한 유저 참조',
    `measured_at` DATE NOT NULL DEFAULT CURRENT_DATE COMMENT '측정일',
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_ROM_history_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
        -- ON DELETE CASCADE 옵션 추가하면 유저 삭제 시 기록도 삭제 가능
);
-- 기본 운동 정보
CREATE TABLE IF NOT EXISTS `base_exercises` (
    `id` INT NOT NULL,
    `name` VARCHAR(100) NULL,
    `type` VARCHAR(50) NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `curriculum` (
    `exercise_id` INT NOT NULL,
    `curriculum_id` INT NULL,
    `sets` INT NULL,
    `times` INT NULL,
    PRIMARY KEY (`exercise_id`)
);

CREATE TABLE IF NOT EXISTS `base_meals` (
    `id` INT NOT NULL,
    `name` VARCHAR(255) NULL,
    `calories` INT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `attendance` (
    `id` INT NULL COMMENT 'auto increment 적용',
    `Field` DATE NULL,
    PRIMARY KEY (`id`)
);


CREATE TABLE IF NOT EXISTS `qna` (
    `id` INT NOT NULL,
    `user_id` INT NULL COMMENT 'auto increment 적용',
    `title` VARCHAR(255) NULL,
    `contants` TEXT NULL,
    PRIMARY KEY (`id`, `user_id`)
);

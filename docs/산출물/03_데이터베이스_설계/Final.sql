-- ---------------------------
-- User 관련 테이블
-- ---------------------------
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL COMMENT '암호화된 문자열',
    `type` ENUM('admin', 'subscribe', 'normal') NOT NULL DEFAULT 'normal',
    `points` INT NOT NULL DEFAULT 0 COMMENT '유저 포인트',
    `is_active` ENUM('1','0','-1') NOT NULL DEFAULT '1' COMMENT '1: 활성, 0: 비활성, -1: 관리자 비활성',
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

-- 유저 몸변화 이력 관리
CREATE TABLE IF NOT EXISTS `body_history` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL COMMENT 'user 테이블 PK를 참조',
    `height` FLOAT NULL,
    `weight` FLOAT NULL,
    `bmi` FLOAT NULL,
    `bmr` FLOAT NULL,
    `recorded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,COMMENT '수정일시',
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_body_history_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
)

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
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '구독번호',
    `user_id` INT NOT NULL COMMENT 'user 테이블 PK 참조',
    `subscribed_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `expires_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`user_id`),  -- 유저 1명당 1개의 구독만 가능
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
    `comment` TEXT NOT NULL,
    PRIMARY KEY (`id`),
	--     게시글 삭제 시 댓글 삭제
    CONSTRAINT `FK_comment_post` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_comment_user` FOREIGN KEY (`comment_user_id`) REFERENCES `user`(`id`)
);

-- 좋아요/싫어요
CREATE TABLE IF NOT EXISTS `post_reactions` (
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
    `measured_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '측정일시',
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_ROM_history_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);

-- 기본 운동 정보
CREATE TABLE IF NOT EXISTS `base_exercises` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL COMMENT '운동 이름',
    `type` VARCHAR(50) NOT NULL COMMENT '운동 종류 (예: 상체, 하체, 코어 등)',
    `link` VARCHAR(255) DEFAULT NULL COMMENT '운동 설명이나 영상 링크',
    PRIMARY KEY (`id`),
    UNIQUE (`name`)
);

-- 기본 운동 정보 결합
CREATE TABLE IF NOT EXISTS `curriculum` (
    `exercise_id` INT NOT NULL COMMENT 'base_exercises.id 참조',
    `curriculum_id` INT NOT NULL COMMENT '커리큘럼 그룹 또는 루틴 ID',
    `sets` INT NULL COMMENT '세트 수',
    `times` INT NULL COMMENT '시간',
    PRIMARY KEY (`exercise_id`, `curriculum_id`),
    CONSTRAINT `FK_curriculum_exercise`
        FOREIGN KEY (`exercise_id`) REFERENCES `base_exercises`(`id`) 
        ON DELETE CASCADE
);

-- 기본 식단
CREATE TABLE IF NOT EXISTS `base_meals` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL COMMENT '식사 이름',
    `weight` VARCHAR(255) NOT NULL COMMENT '1회 제공량 기준 중량(g)',
    `calories` INT NOT NULL COMMENT '1회 제공량 기준 kcal',
    `link` TEXT DEFAULT NULL COMMENT '음식 정보 링크',
    PRIMARY KEY (`id`)
);

-- 출석 테이블
CREATE TABLE IF NOT EXISTS `attendance` (
    `user_id` INT NOT NULL COMMENT '출석한 유저 참조',
    `attended_at` DATE NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (user_id, attended_at),
    CONSTRAINT `FK_attendance_user` 
        FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) 
        ON DELETE CASCADE
);

-- 문의 테이블
CREATE TABLE IF NOT EXISTS `qna` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL COMMENT '질문 작성자',
    `title` VARCHAR(255) NOT NULL,
    `contents` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_qna_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE IF NOT EXISTS `food_nutrition` (
  `id` BIGINT NOT NULL COMMENT 'base_meals.id와 동일한 값 사용',
  `food_name` VARCHAR(255) NOT NULL COMMENT '음식 이름',
  `weight_g` DOUBLE DEFAULT NULL COMMENT '1회 제공량 중량(g)',
  `energy_kcal` DOUBLE DEFAULT NULL COMMENT '에너지(kcal)',
  `carbs_g` DOUBLE DEFAULT NULL COMMENT '탄수화물(g)',
  `sugars_g` DOUBLE DEFAULT NULL COMMENT '당류(g)',
  `fat_g` DOUBLE DEFAULT NULL COMMENT '지방(g)',
  `protein_g` DOUBLE DEFAULT NULL COMMENT '단백질(g)',
  `calcium_mg` DOUBLE DEFAULT NULL COMMENT '칼슘(mg)',
  `phosphorus_mg` DOUBLE DEFAULT NULL COMMENT '인(mg)',
  `sodium_mg` DOUBLE DEFAULT NULL COMMENT '나트륨(mg)',
  `potassium_mg` DOUBLE DEFAULT NULL COMMENT '칼륨(mg)',
  `magnesium_mg` DOUBLE DEFAULT NULL COMMENT '마그네슘(mg)',
  `iron_mg` DOUBLE DEFAULT NULL COMMENT '철(mg)',
  `zinc_mg` DOUBLE DEFAULT NULL COMMENT '아연(mg)',
  `cholesterol_mg` DOUBLE DEFAULT NULL COMMENT '콜레스테롤(mg)',
  `trans_fat_g` DOUBLE DEFAULT NULL COMMENT '트랜스지방(g)',
  PRIMARY KEY (`id`)
);



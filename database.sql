-- Adminer 4.8.1 MySQL 8.0.29 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `adr_booking`;
CREATE TABLE `adr_booking` (
  `id_ab` int NOT NULL AUTO_INCREMENT,
  `latilongti` text,
  `adr1` varchar(255) DEFAULT NULL,
  `adr2` varchar(255) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `pincode` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id_ab`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `adr_booking` (`id_ab`, `latilongti`, `adr1`, `adr2`, `city`, `pincode`) VALUES
(2,	'164987897987',	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480'),
(3,	'164987897987',	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480'),
(4,	'164987897987',	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480'),
(5,	'164987897987',	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480'),
(6,	'164987897987',	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480'),
(7,	'164987897987',	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480');

DROP TABLE IF EXISTS `adr_mentor`;
CREATE TABLE `adr_mentor` (
  `id_am` int NOT NULL AUTO_INCREMENT,
  `adr1` varchar(255) DEFAULT NULL,
  `adr2` varchar(255) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `pincode` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id_am`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `adr_mentor` (`id_am`, `adr1`, `adr2`, `city`, `pincode`) VALUES
(2,	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480'),
(3,	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480'),
(4,	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480'),
(5,	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480'),
(6,	'16a4asddwq',	'498qweqwe',	'naratiwat',	'96480');

DROP TABLE IF EXISTS `booking`;
CREATE TABLE `booking` (
  `idb` int NOT NULL AUTO_INCREMENT,
  `start_time` date DEFAULT NULL,
  `end_time` date DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `bstatus` int DEFAULT NULL,
  `cust_id` int DEFAULT NULL,
  `adrm_id` int DEFAULT NULL,
  `adrb_id` int DEFAULT NULL,
  `men_id` int DEFAULT NULL,
  PRIMARY KEY (`idb`),
  KEY `bstatus` (`bstatus`),
  KEY `cust_id` (`cust_id`),
  KEY `adrb_id` (`adrb_id`),
  KEY `men_id` (`men_id`),
  KEY `booking_ibfk_6` (`adrm_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`bstatus`) REFERENCES `booking_status` (`id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`idc`),
  CONSTRAINT `booking_ibfk_4` FOREIGN KEY (`adrb_id`) REFERENCES `adr_booking` (`id_ab`),
  CONSTRAINT `booking_ibfk_5` FOREIGN KEY (`men_id`) REFERENCES `mentor` (`idm`),
  CONSTRAINT `booking_ibfk_6` FOREIGN KEY (`adrm_id`) REFERENCES `adr_mentor` (`id_am`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `booking` (`idb`, `start_time`, `end_time`, `rate`, `bstatus`, `cust_id`, `adrm_id`, `adrb_id`, `men_id`) VALUES
(2,	'2022-04-10',	'2022-02-24',	600,	71,	11,	2,	2,	30),
(3,	'2022-04-03',	'2022-04-29',	2000,	72,	11,	2,	3,	31),
(5,	'0000-00-00',	'0000-00-00',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(6,	'2000-02-20',	'2022-05-10',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(7,	'2000-02-20',	'2022-05-10',	7000,	NULL,	11,	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `booking_status`;
CREATE TABLE `booking_status` (
  `id` int NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `booking_status` (`id`, `name`) VALUES
(71,	'รอยืนยัน'),
(72,	'ยืนยันแล้ว'),
(73,	'สำเร็จแล้ว'),
(74,	'ยกเลิกแล้ว');

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `idc` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `title` varchar(15) DEFAULT NULL,
  `fname` varchar(30) DEFAULT NULL,
  `lname` varchar(30) DEFAULT NULL,
  `idcard` varchar(13) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `birtday` date DEFAULT NULL,
  `address` text,
  `image` text,
  PRIMARY KEY (`idc`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `customer` (`idc`, `username`, `password`, `title`, `fname`, `lname`, `idcard`, `phone`, `birtday`, `address`, `image`) VALUES
(6,	'aabbcc',	'1234',	'นาย',	'อาซาน',	'มรรคาเขต',	'123456789112',	'0897897979',	'0000-00-00',	NULL,	'eqweqweqwf'),
(8,	'aabbcc1',	'1234',	'นาย',	'อาซาน',	'มรรคาเขต',	'123456789112',	'0897897979',	'0000-00-00',	NULL,	'eqweqweqwf'),
(9,	'aabbcc2',	'1234',	'นาย',	'อาซาน',	'มรรคาเขต',	'123456789112',	'0897897979',	'0000-00-00',	NULL,	'eqweqweqwf'),
(10,	'aabbcc3',	'$2b$10$J1Rf9C.2FpXsglmJGvSJCe/5G/irsHy9QRGX2AqnTOrxqHwOn9IpG',	'นาย',	'อาซาน',	'มรรคาเขต',	'123456789112',	'0897897979',	'0000-00-00',	NULL,	'eqweqweqwf'),
(11,	'nut',	'$2b$10$QTXFPnQD7Pk/wsyXtr75yufid0dP1S.RPrS5kM1Cbjtn6SLl1bMIm',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(12,	'nut1',	'$2b$10$tA71sSSv4Z3VPkrNSwfJr.x17I/whWkhFl9D5X6fGuKIrzqAsDXHu',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(13,	'nut2',	'$2b$10$Ap/gC11jQ6kjhx/8b1De.ehgJp2QYebvpdABFK11H1DnSE0C3O6AK',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(15,	'nut3',	'$2b$10$JMVuSC4sr3bHvy62AYXgSuUoZnu86natmFLMy0595s/YEnSgc2rjC',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(16,	'nas',	'$2b$10$XL.KeXRgiuXlmgRP9lZ16uAy4cn142xGqlqoSNP8Xuhci8m1U1RD.',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(17,	'asd',	'$2b$10$zDkLQc8jh83JqChM8nopd.j.SvY5ZzVPaK6Blgj0V6RFhxdQBRvni',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(18,	'nut12',	'$2b$10$x0icO2Zap5ZwZUI8LJu37uHDtL2g6JTt31OrpEy4PI0Ka99AspinW',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(20,	'nut13',	'$2b$10$/HBbQ4lyK2lN2/13ZoviTOikd/iHJkNzDmMLNKvlU5qtEEljgMGCK',	NULL,	'naz',	'awaekechi',	NULL,	NULL,	NULL,	NULL,	NULL),
(23,	'nut14',	'$2b$10$K3t3M0Q7192Iz6imqSxUFuIZJ5gbzIb32ggrs6GGKnesarXn6dDPq',	NULL,	'naz',	'awaekechi',	NULL,	NULL,	NULL,	NULL,	NULL),
(25,	'nut15',	'$2b$10$lrknpwamcpxJ5Vt2MyHti.wnjf7y3kxtWuVosAfe33GgaGcDTufra',	NULL,	'naz',	'awaekechi',	NULL,	NULL,	NULL,	NULL,	NULL),
(27,	'nut16',	'$2b$10$7u7ahuubGYpTtcBc643VGeptGglBHg480Q91Xm/iiP/PPlJCC9jiS',	NULL,	'naz',	'awaekechi',	NULL,	NULL,	NULL,	NULL,	NULL),
(31,	'nut21',	'$2b$10$T.cGrGfjmx/mfdVeWR4LHehQdbOiv5wj6WNnD/13FxZ8nCcvXeyl6',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(32,	'nut32',	'123444',	'นาย',	'ยุสรี',	'อาแวกือ',	'1234444444',	'0923323',	'2000-05-02',	NULL,	NULL);

DROP TABLE IF EXISTS `mentor`;
CREATE TABLE `mentor` (
  `idm` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rate` float DEFAULT NULL,
  `title` varchar(15) DEFAULT NULL,
  `fname` varchar(30) DEFAULT NULL,
  `lname` varchar(30) DEFAULT NULL,
  `idcard` varchar(13) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `birtday` date DEFAULT NULL,
  `image` text,
  `adrm_id` int DEFAULT NULL,
  PRIMARY KEY (`idm`),
  UNIQUE KEY `username` (`username`),
  KEY `adrm_id` (`adrm_id`),
  CONSTRAINT `mentor_ibfk_10` FOREIGN KEY (`adrm_id`) REFERENCES `adr_mentor` (`id_am`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `mentor` (`idm`, `username`, `password`, `type`, `rate`, `title`, `fname`, `lname`, `idcard`, `phone`, `birtday`, `image`, `adrm_id`) VALUES
(24,	'asdascc',	'123486',	'1',	500,	'นาย',	'ของขวัญ',	'ของแถม',	'113456789112',	'0897897111',	'2012-01-06',	'',	2),
(28,	'aasdasdwe',	'$2b$10$qDzKSuLUvtoGL7bIJMH7We1z3kaE1iS4DM9uIdT0bq9FrDJkKlnK2',	'2',	500,	'นาย',	'อาซาน',	'มรรคาเขต',	'113456789112',	'0897897111',	'0000-00-00',	'',	4),
(30,	'nazree',	'$2b$10$RFt6onBN8r1jgxTI1c2plOI3u8d2LfFTihXtooRpt2g1oWuqMHBqW',	'4',	500,	'นาย',	'นัสรีย์',	'อาแวกือจิ',	'113456789112',	'0897897111',	'0000-00-00',	'',	NULL),
(31,	'asan',	'$2b$10$UfBTuho2pBCfLJSD.uBpr.gbQkyccJoKeD.vd4mIJvFTvvk2rV3pC',	'3',	500,	'นาย',	'asan',	'makaket',	'113456789112',	'0897897111',	'0000-00-00',	'',	NULL);

-- 2022-05-16 13:30:01
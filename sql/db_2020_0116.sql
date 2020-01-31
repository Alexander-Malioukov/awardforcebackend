/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 10.1.37-MariaDB : Database - awardforce
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `entries` int(11) DEFAULT NULL,
  `season_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `chapters` varchar(255) DEFAULT NULL,
  `short_code` varchar(255) DEFAULT NULL,
  `divisions` int(11) DEFAULT NULL,
  `created_at` varchar(32) NOT NULL,
  `updated_at` varchar(32) NOT NULL,
  `status` enum('Active','Inactive') DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `categories` */

insert  into `categories`(`id`,`parent_id`,`category`,`entries`,`season_id`,`description`,`chapters`,`short_code`,`divisions`,`created_at`,`updated_at`,`status`,`is_deleted`) values 
(1,0,'test category',1,2,'This is testing category','1','This is short code',1,'01/09/2020','01/12/2020','Active',1),
(2,1,'test category1',1,5,'This is testing category1','1','This is short code',1,'12/12/2019','12/22/2019','Active',0),
(3,2,'test category2',1,5,'This is testing category1','1','This is short code',1,'12/12/2019','12/28/2019','Inactive',0),
(4,2,'test category3',1,5,'This is testing category1','1','This is short code',1,'11/12/2019','11/22/2019','Active',1),
(5,3,'test category4',1,5,'This is testing category1','1','This is short code',1,'12/22/2019','12/29/2019','Active',0);

/*Table structure for table `fields` */

DROP TABLE IF EXISTS `fields`;

CREATE TABLE `fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `resource` varchar(255) DEFAULT NULL,
  `tab_id` int(11) DEFAULT NULL,
  `cate_num` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `registration` varchar(255) DEFAULT NULL,
  `entrant_read_access` int(11) DEFAULT NULL,
  `entrant_write_access` int(11) DEFAULT NULL,
  `file_types` int(11) DEFAULT NULL,
  `required` tinyint(1) DEFAULT NULL,
  `searchable` tinyint(1) DEFAULT NULL,
  `season_id` int(11) DEFAULT NULL,
  `field_type_id` int(11) DEFAULT NULL,
  `conditional` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `updated_at` varchar(32) NOT NULL,
  `created_at` varchar(32) NOT NULL,
  `data_protection` int(11) DEFAULT NULL,
  `help_text` varchar(255) DEFAULT NULL,
  `hint_text` varchar(255) DEFAULT NULL,
  `label` text,
  `max_charactors` int(11) DEFAULT NULL,
  `max_file_size` int(11) DEFAULT NULL,
  `max_words` int(11) DEFAULT NULL,
  `min_charactors` int(11) DEFAULT NULL,
  `min_words` int(11) DEFAULT NULL,
  `options` tinyint(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `fields` */

insert  into `fields`(`id`,`title`,`resource`,`tab_id`,`cate_num`,`category_id`,`registration`,`entrant_read_access`,`entrant_write_access`,`file_types`,`required`,`searchable`,`season_id`,`field_type_id`,`conditional`,`order`,`slug`,`updated_at`,`created_at`,`data_protection`,`help_text`,`hint_text`,`label`,`max_charactors`,`max_file_size`,`max_words`,`min_charactors`,`min_words`,`options`,`user_id`,`is_deleted`) values 
(1,'test field1','resource1',1,1,1,'registration1',1,1,1,1,1,5,1,1,1,NULL,'01/11/2020','01/10/2020',1,'help text1','hint text1','<b>Lavel1</b>',120,100,30,1,1,1,1,0),
(2,'test field2','resource2',1,1,1,'registration2',1,1,1,1,1,5,1,1,1,NULL,'01/11/2020','01/10/2020',1,'help text2','hint text2','<i>Lavel2</i>',120,100,30,1,1,1,1,0);

/*Table structure for table `seasons` */

DROP TABLE IF EXISTS `seasons`;

CREATE TABLE `seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `season` varchar(255) DEFAULT NULL,
  `status` enum('Draft','Active','Archieved') DEFAULT NULL,
  `created_at` varchar(32) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `seasons` */

insert  into `seasons`(`id`,`season`,`status`,`created_at`,`user_id`) values 
(2,'2020 season','Archieved','01/11/2020',1),
(5,'2021 season','Active','12/30/2019',1),
(6,'2021 season1','Draft','11/20/2019',1),
(7,'2021 season2','Archieved','11/30/2019',1),
(8,'2021 season3','Archieved','12/20/2019',1);

/*Table structure for table `tabs` */

DROP TABLE IF EXISTS `tabs`;

CREATE TABLE `tabs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `type` enum('Detail','Fields','Contributors','Attachments') DEFAULT NULL,
  `content_block_id` int(11) DEFAULT NULL,
  `fields` int(11) DEFAULT NULL,
  `season_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` varchar(32) NOT NULL,
  `updated_at` varchar(32) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `tabs` */

insert  into `tabs`(`id`,`name`,`category_id`,`order`,`type`,`content_block_id`,`fields`,`season_id`,`user_id`,`created_at`,`updated_at`,`is_deleted`) values 
(1,'test tab1',1,1,'Detail',1,1,5,1,'01/01/2020','01/11/2020',0),
(2,'test tab2',1,1,'Detail',1,1,5,1,'01/02/2020','01/15/2020',0),
(3,'test tab3',2,1,'Contributors',1,1,6,1,'12/02/2019','01/10/2020',0);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `users` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

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
  `season_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `short_code` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT NULL,
  `entries` int(11) DEFAULT NULL,
  `entry_name` varchar(255) DEFAULT NULL,
  `is_prefilled` tinyint(1) DEFAULT '0',
  `chapters` varchar(255) DEFAULT NULL,
  `divisions` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `is_reassigned` tinyint(1) DEFAULT '0',
  `is_pdfpacking` tinyint(1) DEFAULT '0',
  `instructions` varchar(255) DEFAULT NULL,
  `created_at` varchar(32) DEFAULT NULL,
  `updated_at` varchar(32) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `categories` */

LOCK TABLES `categories` WRITE;

insert  into `categories`(`id`,`season_id`,`parent_id`,`category`,`description`,`short_code`,`status`,`entries`,`entry_name`,`is_prefilled`,`chapters`,`divisions`,`is_deleted`,`is_reassigned`,`is_pdfpacking`,`instructions`,`created_at`,`updated_at`,`user_id`) values 
(1,2,0,'test category','This is testing category','This is short code','Active',1,NULL,0,'1',1,1,0,0,NULL,'01/09/2020','01/12/2020',NULL),
(2,5,1,'test category1','This is testing category1','This is short code','Active',1,NULL,0,'1',1,0,0,0,NULL,'12/12/2019','12/22/2019',NULL),
(3,6,2,'test category7','This is testing category1','This is short code','Inactive',1,'',0,'1',1,0,0,0,'','12/12/2019','01/18/2020',NULL),
(4,5,2,'test category3','This is testing category1','This is short code','Active',1,NULL,0,'1',1,1,0,0,NULL,'11/12/2019','11/22/2019',NULL),
(5,6,4,'test category8','This is testing category1','This is short code','Inactive',1,'',0,'1',1,0,0,0,'','12/22/2019','01/19/2020',NULL),
(6,6,4,'test category8','This is testing category1','This is short code','Inactive',1,'',0,'1',1,0,0,0,'','01/19/2020','01/19/2020',1),
(7,6,4,'test category8','This is testing category1','This is short code','Inactive',1,'',0,'1',1,0,0,0,'','01/19/2020','01/19/2020',1);

UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `fields` */

LOCK TABLES `fields` WRITE;

insert  into `fields`(`id`,`title`,`resource`,`tab_id`,`cate_num`,`category_id`,`registration`,`entrant_read_access`,`entrant_write_access`,`file_types`,`required`,`searchable`,`season_id`,`field_type_id`,`conditional`,`order`,`slug`,`updated_at`,`created_at`,`data_protection`,`help_text`,`hint_text`,`label`,`max_charactors`,`max_file_size`,`max_words`,`min_charactors`,`min_words`,`options`,`user_id`,`is_deleted`) values 
(1,'test field1','resource1',1,1,1,'registration1',1,1,1,1,1,5,1,1,1,NULL,'01/11/2020','01/10/2020',1,'help text1','hint text1','<b>Lavel1</b>',120,100,30,1,1,1,1,1),
(2,'test field2','resource2',1,1,1,'registration2',1,1,1,1,1,5,1,1,1,NULL,'01/11/2020','01/10/2020',1,'help text2','hint text2','<i>Lavel2</i>',120,100,30,1,1,1,1,0),
(3,'test field3','resource1',1,1,1,'registration1',1,1,1,1,1,5,1,1,1,NULL,'01/19/2020','01/19/2020',1,'help text1','hint text1','<b>Lavel1</b>',120,100,30,1,1,1,1,0),
(4,'test field3','resource1',1,1,1,'registration1',1,1,1,1,1,5,1,1,1,NULL,'01/19/2020','01/19/2020',1,'help text1','hint text1','<b>Lavel1</b>',120,100,30,1,1,1,1,0);

UNLOCK TABLES;

/*Table structure for table `seasons` */

DROP TABLE IF EXISTS `seasons`;

CREATE TABLE `seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `season` varchar(255) DEFAULT NULL,
  `status` enum('Draft','Active','Archieved') DEFAULT NULL,
  `created_at` varchar(32) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `seasons` */

LOCK TABLES `seasons` WRITE;

insert  into `seasons`(`id`,`season`,`status`,`created_at`,`user_id`) values 
(2,'2020 season','Archieved','01/11/2020',1),
(5,'2021 season','Active','12/30/2019',1),
(6,'2021 season1','Draft','11/20/2019',1),
(7,'2021 season2','Archieved','11/30/2019',1),
(8,'2021 season3','Archieved','12/20/2019',1),
(9,'2017 season','Draft','01/17/2020',1),
(10,'2017 season','Draft','01/18/2020',1),
(11,'2017 season','Draft','',NULL),
(12,'2022 season','Draft','01/18/2020',NULL),
(13,'2022 season','Draft','01/18/2020',NULL),
(14,'2022 season','Draft','01/18/2020',NULL);

UNLOCK TABLES;

/*Table structure for table `tabs` */

DROP TABLE IF EXISTS `tabs`;

CREATE TABLE `tabs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `type` enum('Fields','Contributors','Attachments') DEFAULT NULL,
  `content_block_id` int(11) DEFAULT NULL,
  `fields` int(11) DEFAULT NULL,
  `season_id` int(11) DEFAULT NULL,
  `is_divider` tinyint(1) DEFAULT '0',
  `category_id` int(11) DEFAULT NULL,
  `is_allcategories` tinyint(1) DEFAULT '0',
  `user_id` int(11) DEFAULT NULL,
  `created_at` varchar(32) DEFAULT NULL,
  `updated_at` varchar(32) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `tabs` */

LOCK TABLES `tabs` WRITE;

insert  into `tabs`(`id`,`name`,`order`,`type`,`content_block_id`,`fields`,`season_id`,`is_divider`,`category_id`,`is_allcategories`,`user_id`,`created_at`,`updated_at`,`is_deleted`) values 
(1,'test tab1',1,'Fields',1,1,5,1,1,0,1,'01/01/2020','01/19/2020',1),
(2,'test tab2',1,'Attachments',1,1,5,0,1,0,1,'01/02/2020','01/15/2020',0),
(3,'test tab3',1,'Contributors',1,1,6,0,2,0,1,'12/02/2019','01/10/2020',0),
(4,'test tab5',1,'Fields',1,1,5,1,1,0,1,'01/19/2020','01/19/2020',0);

UNLOCK TABLES;

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

LOCK TABLES `users` WRITE;

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

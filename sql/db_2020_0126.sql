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
/*Table structure for table `field_roles` */

DROP TABLE IF EXISTS `field_roles`;

CREATE TABLE `field_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `read` tinyint(4) DEFAULT NULL,
  `write` tinyint(4) DEFAULT NULL,
  `require` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `field_roles` */

LOCK TABLES `field_roles` WRITE;

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
  `field_type` int(11) DEFAULT NULL,
  `conditional` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `updated_at` varchar(32) DEFAULT NULL,
  `created_at` varchar(32) DEFAULT NULL,
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
  `is_deleted` tinyint(4) DEFAULT '0',
  `is_allcategories` tinyint(1) DEFAULT '0',
  `is_season_persist` tinyint(4) DEFAULT '0',
  `is_allroles` tinyint(4) DEFAULT '0',
  `is_allroles_require` tinyint(4) DEFAULT '0',
  `homepage_reg` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `fields` */

LOCK TABLES `fields` WRITE;

insert  into `fields`(`id`,`title`,`resource`,`tab_id`,`cate_num`,`category_id`,`registration`,`entrant_read_access`,`entrant_write_access`,`file_types`,`required`,`searchable`,`season_id`,`field_type`,`conditional`,`order`,`slug`,`updated_at`,`created_at`,`data_protection`,`help_text`,`hint_text`,`label`,`max_charactors`,`max_file_size`,`max_words`,`min_charactors`,`min_words`,`options`,`user_id`,`is_deleted`,`is_allcategories`,`is_season_persist`,`is_allroles`,`is_allroles_require`,`homepage_reg`) values 
(1,'test field1','resource1',1,1,1,'registration1',1,1,1,1,1,5,1,1,1,NULL,'01/11/2020','01/10/2020',1,'help text1','hint text1','<b>Lavel1</b>',120,100,30,1,1,1,1,1,0,0,0,0,NULL),
(2,'test field2','resource2',1,1,1,'registration2',1,1,1,1,1,5,1,1,1,NULL,'01/11/2020','01/10/2020',1,'help text2','hint text2','<i>Lavel2</i>',120,100,30,1,1,1,1,1,0,0,0,0,NULL),
(3,'test field3','resource1',1,1,1,'registration1',1,1,1,1,1,5,1,1,1,NULL,'01/19/2020','01/19/2020',1,'help text1','hint text1','<b>Lavel1</b>',120,100,30,1,1,1,1,1,0,0,0,0,NULL),
(4,'test field3','resource1',1,1,1,'registration1',1,1,1,1,1,5,1,1,1,NULL,'01/19/2020','01/19/2020',1,'help text1','hint text1','<b>Lavel1</b>',120,100,30,1,1,1,1,0,0,0,0,0,NULL),
(5,'test field1 (copy)','resource1',1,1,1,'registration1',1,1,1,1,1,5,1,1,1,NULL,'01/25/2020','01/25/2020',1,'help text1','hint text1','<b>Lavel1</b>',120,100,30,1,1,1,1,1,0,0,0,0,NULL),
(6,'test field2 (copy)','resource2',1,1,1,'registration2',1,1,1,1,1,5,1,1,1,NULL,'01/25/2020','01/25/2020',1,'help text2','hint text2','<i>Lavel2</i>',120,100,30,1,1,1,1,1,0,0,0,0,NULL);

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

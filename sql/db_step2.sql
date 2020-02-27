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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `categories` */

LOCK TABLES `categories` WRITE;

insert  into `categories`(`id`,`season_id`,`parent_id`,`category`,`description`,`short_code`,`status`,`entries`,`entry_name`,`is_prefilled`,`chapters`,`divisions`,`is_deleted`,`is_reassigned`,`is_pdfpacking`,`instructions`,`created_at`,`updated_at`,`user_id`) values 
(2,1,2,'Category123','<p>Category123 Description</p>','cate-123','Active',0,'',0,'0',0,1,0,0,'','01/30/2020','01/31/2020',1),
(3,1,2,'Mohammed Foad Omer','<p>Name</p>','Name','Active',0,'',0,'0',0,0,0,0,'','01/31/2020','01/31/2020',1),
(4,1,3,'Mohammed Foad Omer','<p>Jdjbb</p>','Joey co','Active',0,'',0,'0',0,0,0,0,'','01/31/2020','01/31/2020',1),
(5,1,2,'Abc','<p>Abc</p>','Abc','Active',0,'',0,'0',0,0,0,0,'','01/31/2020','01/31/2020',1),
(6,1,5,'Sub abcs','<p>Hi&nbsp;</p>','Hi ','Active',0,'',0,'0',0,0,0,0,'','01/31/2020','01/31/2020',1),
(7,1,2,'Category A','<p>CATEGORY A MAIN</p>','CATEGORY A MAIN','Active',0,'',0,'0',0,1,0,0,'','02/03/2020','02/03/2020',1),
(8,1,2,'The excellence customer service award','<p>The&nbsp;</p>','The ','Active',0,'',0,'0',0,0,0,0,'','02/07/2020','02/07/2020',1),
(9,1,8,'Excellence taxi','<p>Taxi</p>','Taxi',NULL,0,'',0,'0',0,0,0,0,'','02/07/2020','02/07/2020',1),
(10,1,2,'The excellence customer service award (copy)','<p>The&nbsp;</p>','The ','Active',0,'',0,'0',0,0,0,0,'','02/13/2020','02/13/2020',1);

UNLOCK TABLES;

/*Table structure for table `content_blocks` */

DROP TABLE IF EXISTS `content_blocks`;

CREATE TABLE `content_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cb_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `content_blocks` */

LOCK TABLES `content_blocks` WRITE;

insert  into `content_blocks`(`id`,`cb_title`) values 
(1,'Test content Block1'),
(2,'Test content Block2'),
(3,'Test content Block3'),
(4,'Test content Block4');

UNLOCK TABLES;

/*Table structure for table `entries` */

DROP TABLE IF EXISTS `entries`;

CREATE TABLE `entries` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `entry_name` varchar(255) DEFAULT NULL,
  `season_id` int(11) DEFAULT NULL,
  `entrant_id` varchar(255) DEFAULT NULL,
  `category_id` varchar(255) DEFAULT NULL,
  `status` enum('In Progress','Submitted','Resubmission') DEFAULT 'In Progress',
  `moderation` enum('Approved','Undecided','Rejected') DEFAULT 'Undecided',
  `tags` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `is_archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `entries` */

LOCK TABLES `entries` WRITE;

insert  into `entries`(`id`,`entry_name`,`season_id`,`entrant_id`,`category_id`,`status`,`moderation`,`tags`,`updated_at`,`created_at`,`is_deleted`,`is_archived`) values 
(3,'Entry Wenrong1',1,'1','5','In Progress','Approved','','02/25/2020','02/23/2020',0,0),
(4,'Entry Name Wenrong3',1,'3','4','In Progress','Approved',NULL,'02/26/2020','02/23/2020',0,0),
(5,'Entry Wenrong1',1,'6','3','In Progress','Undecided',NULL,'02/24/2020','02/24/2020',0,0),
(6,'Entry Wenrong1',1,'3','3','In Progress','Undecided','','02/24/2020','02/24/2020',0,0),
(7,'Entry Wenrong1',1,'7','3','In Progress','Undecided','','02/24/2020','02/24/2020',0,0),
(8,'Entry Wenrong1',1,'2','3','In Progress','Undecided','','02/24/2020','02/24/2020',0,0),
(9,'Entry Wenrong1',1,'5','3','In Progress','Undecided',NULL,'02/24/2020','02/24/2020',0,0),
(10,'Entry Wenrong1',1,'7','3','In Progress','Rejected',NULL,'02/24/2020','02/24/2020',0,0),
(11,'Entry Wenrong1',1,'2','3','In Progress','Undecided','Tag1,Tag2','02/24/2020','02/24/2020',0,0),
(12,'Entry Wenrong1',1,'1','3','In Progress','Approved','','02/24/2020','02/24/2020',0,0),
(13,'Entry Wenrong1',1,'5','3','In Progress','Rejected',NULL,'02/27/2020','02/24/2020',1,0),
(14,'Entry Wenrong1',1,'1','3','In Progress','Approved',NULL,'02/27/2020','02/24/2020',1,0),
(15,'Entry Wenrong1',1,'1','3','In Progress','Approved',NULL,'02/24/2020','02/24/2020',1,0),
(16,'Test Entry Wenrong 16',1,'6','6','In Progress','Approved','Tag3,Tag2','02/26/2020','02/26/2020',0,0),
(17,'My Entry Wenrong2',1,'1','5','In Progress','Approved','Tag1,Tag2,Tag22','02/27/2020','02/27/2020',0,0),
(19,'Entry Wenrong1 (copy)',1,'1','3','In Progress','Approved',NULL,'02/27/2020','02/27/2020',1,0),
(20,'Test Entry123',1,'1','6','In Progress','Approved','Tag2,Tag3,Tag22','02/27/2020','02/27/2020',0,0);

UNLOCK TABLES;

/*Table structure for table `entry_comment` */

DROP TABLE IF EXISTS `entry_comment`;

CREATE TABLE `entry_comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `entry_comment` */

LOCK TABLES `entry_comment` WRITE;

UNLOCK TABLES;

/*Table structure for table `entry_tab_field` */

DROP TABLE IF EXISTS `entry_tab_field`;

CREATE TABLE `entry_tab_field` (
  `entry_id` int(10) unsigned DEFAULT NULL,
  `tab_id` int(10) unsigned DEFAULT NULL,
  `field_id` int(10) unsigned DEFAULT NULL,
  `value` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `entry_tab_field` */

LOCK TABLES `entry_tab_field` WRITE;

insert  into `entry_tab_field`(`entry_id`,`tab_id`,`field_id`,`value`) values 
(1,2,2,NULL),
(1,2,5,'111'),
(2,2,2,NULL),
(2,2,5,'111'),
(5,4,6,NULL),
(5,2,2,NULL),
(5,2,9,NULL),
(6,4,6,NULL),
(6,2,2,NULL),
(6,2,9,NULL),
(7,4,6,NULL),
(8,4,6,NULL),
(9,4,6,NULL),
(10,4,6,NULL),
(11,4,6,NULL),
(12,4,6,NULL),
(15,4,6,NULL),
(15,2,2,NULL),
(15,2,9,'http://localhost:3000/uploads/9e6fe440-ead9-4f07-8f05-44f216acd665.jpg'),
(3,4,6,NULL),
(3,2,2,NULL),
(3,2,9,'http://localhost:3000/uploads/d3820d8f-47ce-4f32-8731-812918aed5c9.jpg'),
(3,6,8,'a,b,c'),
(16,4,6,NULL),
(4,4,6,NULL),
(4,2,9,'http://localhost:3000/uploads/0259d59b-eb63-4702-8bc7-687228cede96.png'),
(4,5,7,NULL),
(17,4,6,NULL),
(13,4,6,NULL),
(14,4,6,NULL),
(20,4,10,'xxx address');

UNLOCK TABLES;

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

/*Table structure for table `field_table_columns` */

DROP TABLE IF EXISTS `field_table_columns`;

CREATE TABLE `field_table_columns` (
  `field_id` int(11) DEFAULT NULL,
  `col` varchar(32) DEFAULT NULL,
  `title` varchar(32) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `is_editable` tinyint(1) DEFAULT '1',
  KEY `field_id` (`field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `field_table_columns` */

LOCK TABLES `field_table_columns` WRITE;

insert  into `field_table_columns`(`field_id`,`col`,`title`,`type`,`is_editable`) values 
(5,'col1','Name','label',1),
(5,'col2','Title','label',0),
(5,'col3','Content','label',0),
(5,'h1580968530280','Address','integer',1),
(5,'h1580969001298','','',1),
(2,'col1','Name','label',1),
(2,'col2','Title','label',0),
(2,'col3','Content','label',0),
(2,'h1580967439655','','',1),
(7,'col1','Key result ults','text',1),
(7,'col2','Titl2677','text',0),
(7,'col3','Content','integer',0),
(7,'h1581098869050','','',1),
(6,'col1','Measurement. Name','label',1),
(6,'col2','Title','decimal-precise',0),
(6,'col3','Content','label',0),
(6,'h1581098516522','','',1);

UNLOCK TABLES;

/*Table structure for table `field_table_data` */

DROP TABLE IF EXISTS `field_table_data`;

CREATE TABLE `field_table_data` (
  `field_id` int(11) DEFAULT NULL,
  `row` int(11) DEFAULT NULL,
  `col` varchar(32) DEFAULT NULL,
  `val` varchar(255) DEFAULT NULL,
  KEY `row` (`field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `field_table_data` */

LOCK TABLES `field_table_data` WRITE;

insert  into `field_table_data`(`field_id`,`row`,`col`,`val`) values 
(5,0,'col1','val1'),
(5,0,'col2','val2'),
(5,0,'col3','val3'),
(5,0,'h1580968530280','val'),
(5,0,'h1580969001298','val'),
(5,1,'h1580969001298','val'),
(5,1,'col1','val1'),
(5,1,'col2','val2'),
(5,1,'col3','val3'),
(5,1,'h1580968530280','val'),
(5,2,'col1','val1'),
(5,2,'col2','val2'),
(5,2,'col3','val3'),
(5,2,'h1580968530280','val'),
(5,2,'h1580969001298','val'),
(5,3,'h1580969001298','val'),
(5,3,'col1','val1'),
(5,3,'col2','val2'),
(5,3,'col3','val3'),
(5,3,'h1580968530280','val'),
(5,4,'col1','val1'),
(5,4,'col2','val2'),
(5,4,'col3','val3'),
(5,4,'h1580968530280','val'),
(5,4,'h1580969001298','val'),
(5,5,'h1580969001298','val'),
(5,5,'col1','val1'),
(5,5,'col2','val2'),
(5,5,'col3','val3'),
(5,5,'h1580968530280','val'),
(5,6,'col1','val1'),
(5,6,'col2','val2'),
(5,6,'col3','val3'),
(5,6,'h1580968530280','val'),
(5,6,'h1580969001298','val'),
(7,0,'col1','val111'),
(7,0,'col2','val2'),
(7,0,'col3','val3'),
(7,0,'h1581098869050','val'),
(7,1,'h1581098869050','val'),
(7,1,'col3','val3'),
(7,1,'col2','val2'),
(7,1,'col1','val198'),
(7,2,'h1581098869050','val'),
(7,2,'col3','val3'),
(7,2,'col2','val2'),
(7,2,'col1','val1777'),
(7,3,'col1','val1777'),
(7,3,'col2','val2'),
(7,3,'col3','val3'),
(7,3,'h1581098869050','val'),
(6,0,'col1','Customer '),
(6,0,'col2','val2'),
(6,0,'col3','val333'),
(6,0,'h1581098516522','val444'),
(6,1,'col1','Community'),
(6,1,'col2','val2'),
(6,1,'col3','val333'),
(6,1,'h1581098516522','val444'),
(2,0,'col1','val1'),
(2,0,'h1580967439655','val123456'),
(2,0,'col3','val3'),
(2,0,'col2','val2'),
(2,1,'h1580967439655','val44444'),
(2,1,'col3','val33333'),
(2,1,'col2','val2'),
(2,1,'col1','val1'),
(2,2,'h1580967439655','val'),
(2,2,'col3','val3'),
(2,2,'col2','val2'),
(2,2,'col1','val1');

UNLOCK TABLES;

/*Table structure for table `fields` */

DROP TABLE IF EXISTS `fields`;

CREATE TABLE `fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `resource` varchar(255) DEFAULT NULL,
  `tab_id` int(11) DEFAULT NULL,
  `cate_num` int(11) DEFAULT NULL,
  `category_id` varchar(255) DEFAULT NULL,
  `registration` varchar(255) DEFAULT NULL,
  `entrant_read_access` tinyint(1) DEFAULT '0',
  `entrant_write_access` tinyint(1) DEFAULT '0',
  `file_types` int(11) DEFAULT NULL,
  `required` tinyint(1) DEFAULT '0',
  `searchable` tinyint(1) DEFAULT '0',
  `season_id` int(11) DEFAULT '5',
  `field_type` varchar(32) DEFAULT NULL,
  `is_conditional` tinyint(1) DEFAULT '0',
  `order` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `updated_at` varchar(32) DEFAULT NULL,
  `created_at` varchar(32) DEFAULT NULL,
  `data_protection` varchar(32) DEFAULT NULL,
  `help_text` text,
  `hint_text` text,
  `label` text,
  `max_charactors` int(11) DEFAULT NULL,
  `max_file_size` int(11) DEFAULT NULL,
  `max_words` int(11) DEFAULT NULL,
  `min_charactors` int(11) DEFAULT NULL,
  `min_words` int(11) DEFAULT NULL,
  `option_values` text,
  `option_text` text,
  `user_id` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0',
  `is_allcategories` tinyint(1) NOT NULL DEFAULT '0',
  `is_season_persist` tinyint(4) NOT NULL DEFAULT '0',
  `is_allroles` tinyint(4) NOT NULL DEFAULT '0',
  `is_allroles_require` tinyint(4) NOT NULL DEFAULT '0',
  `homepage_reg` varchar(32) DEFAULT NULL,
  `display_columns` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `fields` */

LOCK TABLES `fields` WRITE;

insert  into `fields`(`id`,`title`,`resource`,`tab_id`,`cate_num`,`category_id`,`registration`,`entrant_read_access`,`entrant_write_access`,`file_types`,`required`,`searchable`,`season_id`,`field_type`,`is_conditional`,`order`,`slug`,`updated_at`,`created_at`,`data_protection`,`help_text`,`hint_text`,`label`,`max_charactors`,`max_file_size`,`max_words`,`min_charactors`,`min_words`,`option_values`,`option_text`,`user_id`,`is_deleted`,`is_allcategories`,`is_season_persist`,`is_allroles`,`is_allroles_require`,`homepage_reg`,`display_columns`) values 
(2,'Feileeteer','entry',7,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,1,'table',1,5,NULL,'02/06/2020','01/30/2020','Standard','Field123','Field123','<p>Field123</p>',NULL,NULL,NULL,NULL,NULL,'1\n2\n3','a\nc\nbc',1,1,0,0,0,0,NULL,'no,col1,col2,col3,h1580967439655,del'),
(5,'Test123','entry',3,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,1,'table',1,4,NULL,'02/06/2020','02/06/2020','Standard','Test123','Test123','<p>Test123</p>',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,0,0,0,0,NULL,'no,col1,col2,col3,h1580968530280,h1580969001298,del'),
(6,'Result 1','entry',3,NULL,'9',NULL,NULL,NULL,NULL,NULL,NULL,1,'table',NULL,10,NULL,'02/07/2020','02/07/2020','Standard',NULL,NULL,'<p>Result</p>',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,1,0,0,0,NULL,'no,col1,col2,col3,h1581098516522,del'),
(7,'Result','entry',5,NULL,'9',NULL,1,1,NULL,1,NULL,1,'table',1,10,NULL,'02/07/2020','02/07/2020','Maximum','Result','Tlrwsult','<p>Please check</p>',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,1,0,0,0,NULL,'no,col1,col2,col3,h1581098869050,del'),
(8,'Checkbox','entry',6,NULL,'0',NULL,1,NULL,NULL,NULL,NULL,1,'checkboxlist',1,6,NULL,'02/18/2020','02/18/2020','Standard',NULL,NULL,'<p>Test Field_Checkbox</p>',NULL,NULL,NULL,NULL,NULL,'a\nb\nc\nd','a\nb\nc\nd',1,0,0,0,0,0,NULL,NULL),
(9,'attchement field4','entry',2,NULL,'0',NULL,1,1,NULL,NULL,NULL,1,'file',1,10,NULL,'02/24/2020','02/24/2020','Standard','attchement','attchement','<p>Test Wenrong 4</p>',NULL,100,NULL,NULL,NULL,NULL,NULL,1,0,0,0,0,0,NULL,NULL),
(10,'User Address','entry',4,NULL,'0',NULL,1,NULL,NULL,NULL,NULL,1,'text',1,10,NULL,'02/27/2020','02/27/2020','Standard','User Name','User Name','<p>Wenrong Field1</p>',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0,0,0,0,NULL,NULL),
(11,'Entry Test2','entry',2,NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL,1,'checkbox',1,2,NULL,'02/27/2020','02/27/2020','Standard','Entry Test2','Entry Test2','<p>Entry Test2</p>',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0,0,0,0,NULL,NULL);

UNLOCK TABLES;

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `roles` */

LOCK TABLES `roles` WRITE;

insert  into `roles`(`id`,`title`) values 
(1,'extrarole'),
(2,'	Chapter manager'),
(3,'Guest'),
(4,'Entrant'),
(5,'Judge'),
(6,'Program manager');

UNLOCK TABLES;

/*Table structure for table `seasons` */

DROP TABLE IF EXISTS `seasons`;

CREATE TABLE `seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `season` varchar(255) DEFAULT NULL,
  `status` enum('Active','Draft','Archived') DEFAULT NULL,
  `created_at` varchar(32) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `seasons` */

LOCK TABLES `seasons` WRITE;

insert  into `seasons`(`id`,`season`,`status`,`created_at`,`user_id`) values 
(1,'2019-2020','Active','11/11/2019',1),
(2,'2018-2019','Draft','02/07/2020',1),
(3,'2020-2021','Draft','02/07/2020',1);

UNLOCK TABLES;

/*Table structure for table `tabs` */

DROP TABLE IF EXISTS `tabs`;

CREATE TABLE `tabs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `type` enum('Fields','Contributors','Attachments','Details') DEFAULT NULL,
  `content_block_id` int(11) DEFAULT NULL,
  `season_id` int(11) DEFAULT NULL,
  `is_divider` tinyint(1) DEFAULT '0',
  `category_id` varchar(255) DEFAULT NULL,
  `is_allcategories` tinyint(1) DEFAULT '0',
  `user_id` int(11) DEFAULT NULL,
  `created_at` varchar(32) DEFAULT NULL,
  `updated_at` varchar(32) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `tabs` */

LOCK TABLES `tabs` WRITE;

insert  into `tabs`(`id`,`name`,`order`,`type`,`content_block_id`,`season_id`,`is_divider`,`category_id`,`is_allcategories`,`user_id`,`created_at`,`updated_at`,`is_deleted`) values 
(2,'Wenrong Tab1',5,'Contributors',1,1,0,'0',1,1,'01/30/2020','01/31/2020',0),
(3,'Tab 2',10,'Fields',1,1,1,'2',1,1,'02/01/2020','02/01/2020',0),
(4,'Details',10,'Details',1,1,1,'3',1,1,'02/07/2020','02/07/2020',0),
(5,'Governance1',10,'Fields',1,1,1,'4',0,1,'02/07/2020','02/07/2020',0),
(6,'Governance2',10,'Fields',1,1,1,'5',0,1,'02/07/2020','02/07/2020',0),
(7,'Governance Test Tag',10,'Contributors',1,1,1,'6',0,1,'02/07/2020','02/07/2020',0);

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

LOCK TABLES `users` WRITE;

insert  into `users`(`id`,`full_name`,`email`,`password`,`created_at`) values 
(1,'Mohamed Omar',NULL,NULL,'2020-02-24 22:21:24'),
(2,'Ali Mohamed',NULL,NULL,'2020-02-24 22:21:32'),
(3,'Wenrong zhang',NULL,NULL,'2020-02-24 22:21:40'),
(4,'Mohamed Fumd',NULL,NULL,'2020-02-24 22:21:49'),
(5,'Alenxandar Makelr',NULL,NULL,'2020-02-24 22:22:01'),
(6,'Daniel Evans',NULL,NULL,'2020-02-24 22:22:09'),
(7,'Ali Jonaoipa',NULL,NULL,'2020-02-24 22:22:16'),
(8,'Drusyna Kanean',NULL,NULL,'2020-02-24 22:22:24'),
(9,'Jinnerey Kershina',NULL,NULL,'2020-02-24 22:22:35'),
(10,'Muhamed Mesha',NULL,NULL,'2020-02-24 22:22:43'),
(11,'Moohashah Graigere',NULL,NULL,'2020-02-24 22:22:52');

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `categories` */

LOCK TABLES `categories` WRITE;

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
  `is_deleted` tinyint(4) DEFAULT '0',
  `is_allcategories` tinyint(1) DEFAULT '0',
  `is_season_persist` tinyint(4) DEFAULT '0',
  `is_allroles` tinyint(4) DEFAULT '0',
  `is_allroles_require` tinyint(4) DEFAULT '0',
  `homepage_reg` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `fields` */

LOCK TABLES `fields` WRITE;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `seasons` */

LOCK TABLES `seasons` WRITE;

UNLOCK TABLES;

/*Table structure for table `tabs` */

DROP TABLE IF EXISTS `tabs`;

CREATE TABLE `tabs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `type` enum('Fields','Contributors','Attachments') DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tabs` */

LOCK TABLES `tabs` WRITE;

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

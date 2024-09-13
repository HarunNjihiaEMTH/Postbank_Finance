-- MariaDB dump 10.19  Distrib 10.6.7-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: eims_db
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB-2ubuntu1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access_mapping`
--

DROP TABLE IF EXISTS `access_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_mapping` (
  `sn` bigint(20) NOT NULL AUTO_INCREMENT,
  `module` varchar(30) NOT NULL,
  `privilege_sn` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`sn`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_mapping`
--

LOCK TABLES `access_mapping` WRITE;
/*!40000 ALTER TABLE `access_mapping` DISABLE KEYS */;
INSERT INTO `access_mapping` VALUES (1,'USER',2,1);
/*!40000 ALTER TABLE `access_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airline_goods_details`
--

DROP TABLE IF EXISTS `airline_goods_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `airline_goods_details` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `deemed_flag` varchar(255) DEFAULT NULL,
  `discount_flag` varchar(255) DEFAULT NULL,
  `discount_tax_rate` varchar(255) DEFAULT NULL,
  `discount_total` varchar(255) DEFAULT NULL,
  `excise_currency` varchar(255) DEFAULT NULL,
  `excise_flag` varchar(255) DEFAULT NULL,
  `excise_rate` varchar(255) DEFAULT NULL,
  `excise_rate_name` varchar(255) DEFAULT NULL,
  `excise_rule` varchar(255) DEFAULT NULL,
  `excise_tax` varchar(255) DEFAULT NULL,
  `excise_unit` varchar(255) DEFAULT NULL,
  `goods_category_id` varchar(255) DEFAULT NULL,
  `goods_category_name` varchar(255) DEFAULT NULL,
  `invoiceid` varchar(255) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `item_code` varchar(255) DEFAULT NULL,
  `order_number` varchar(255) DEFAULT NULL,
  `pack` varchar(255) DEFAULT NULL,
  `qty` varchar(255) DEFAULT NULL,
  `stick` varchar(255) DEFAULT NULL,
  `tax` varchar(255) DEFAULT NULL,
  `tax_rate` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `unit_of_measure` varchar(255) DEFAULT NULL,
  `unit_price` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airline_goods_details`
--

LOCK TABLES `airline_goods_details` WRITE;
/*!40000 ALTER TABLE `airline_goods_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `airline_goods_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_trail`
--

DROP TABLE IF EXISTS `audit_trail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_trail` (
  `sn` bigint(20) NOT NULL AUTO_INCREMENT,
  `active_duration` bigint(20) DEFAULT NULL,
  `ip_address` varchar(15) NOT NULL,
  `login_attempts` int(11) NOT NULL,
  `login_time` datetime NOT NULL,
  `logout_time` datetime DEFAULT NULL,
  `user_sn` bigint(20) NOT NULL,
  PRIMARY KEY (`sn`),
  KEY `FKhe2ljdgb3qk1ky1okmnt16cw7` (`user_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_trail`
--

LOCK TABLES `audit_trail` WRITE;
/*!40000 ALTER TABLE `audit_trail` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_trail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_description` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) NOT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (11,'ds','NEW ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-25 14:14:07','-','pending',NULL,NULL,NULL,'soaadmin'),(10,'For all ICT devices to be procured in the bank','ICT Equuipments',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','Approved','soaadmin',NULL,'2022-06-25 00:00:00',NULL),(4,'CEO desc','CEO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-20 08:21:24','-','pending',NULL,NULL,NULL,NULL),(5,'Category type','CatType',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-20 08:38:17','-','pending',NULL,NULL,NULL,'soaadmin'),(6,'Marketing various products','Marketing',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-23 06:49:35','-','Approved','soaadmin',NULL,'2022-06-23 00:00:00','soaadmin'),(9,'This is a test category','Test Category',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-23 13:15:32','-','pending',NULL,NULL,NULL,'soaadmin'),(8,'Administration issues','Administrative',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-23 06:53:55','-','pending',NULL,NULL,NULL,'soaadmin');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `costcenters`
--

DROP TABLE IF EXISTS `costcenters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `costcenters` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cost_center_code` varchar(255) NOT NULL,
  `cost_center_description` varchar(255) DEFAULT NULL,
  `cost_center_name` varchar(255) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `income_withholding_account` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `vat_account` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_pcngvs1t955tmm087mb8qgu76` (`cost_center_code`) USING HASH
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `costcenters`
--

LOCK TABLES `costcenters` WRITE;
/*!40000 ALTER TABLE `costcenters` DISABLE KEYS */;
INSERT INTO `costcenters` VALUES (7,'4444','Mombasa cost center','Mombasa',NULL,'N',NULL,'77777MC',NULL,'N',NULL,'soaadmin','Y','2022-06-21 14:13:49','-','Approved','6666MB','soaadmin','N','2022-06-21 00:00:00'),(8,'5454','Nairobi cost center','Nairobi',NULL,'N',NULL,'44323NR',NULL,'N',NULL,'soaadmin','Y','2022-06-21 14:14:48','N/A','Pending','67433NB',NULL,'N',NULL),(9,'3243','Thika cost center','Thika',NULL,'N',NULL,'654534THC',NULL,'N',NULL,'soaadmin','Y','2022-06-21 15:11:05','-','Approved','45345THv','soaadmin','N','2022-06-21 00:00:00'),(10,'Quia','Est ut quod dolore ','Marcia Medina',NULL,'N',NULL,'984',NULL,'N',NULL,'soaadmin','Y','2022-06-22 06:19:21','N/A','Pending','Est obcaecati id in ',NULL,'N',NULL),(11,'2343','Kigali center','Kigali',NULL,'N',NULL,'534243HTE',NULL,'N',NULL,'soaadmin','Y','2022-06-22 06:20:01','N/A','Pending','32423GSD',NULL,'N',NULL),(12,'Mini','Quibusdam aliquip si','Bruce Battle',NULL,'N',NULL,'761',NULL,'N',NULL,'soaadmin','Y','2022-06-22 07:31:28','N/A','Pending','Qui at iusto et sunt',NULL,'N',NULL),(13,'4533','Kampala branch','Kampala',NULL,'N',NULL,'45342MPK',NULL,'N',NULL,'soaadmin','Y','2022-06-23 07:23:05','-','Approved','4543KMP','soaadmin','N','2022-06-23 00:00:00'),(14,'3432','Dodoma center','Dodoma',NULL,'N',NULL,'32423DT',NULL,'N',NULL,'soaadmin','Y','2022-06-23 12:30:46','N/A','Pending','3243DD',NULL,'N',NULL),(15,'4324','Finance cost center','Finance',NULL,'N',NULL,'53242FG',NULL,'N',NULL,'soaadmin','Y','2022-06-23 13:17:20','-','Approved','34343FN','soaadmin','N','2022-06-23 00:00:00'),(16,'1123','For covering all expenses incurred in Kambala east region','KAMBALA EAST',NULL,'N',NULL,'11111232322',NULL,'N',NULL,'soaadmin','Y','2022-06-25 14:23:51','-','Approved','1213212131','soaadmin','N','2022-06-25 00:00:00');
/*!40000 ALTER TABLE `costcenters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `buyer_address` varchar(255) DEFAULT NULL,
  `buyer_business_name` varchar(255) DEFAULT NULL,
  `buyer_citizenship` varchar(255) DEFAULT NULL,
  `buyer_email` varchar(255) DEFAULT NULL,
  `buyer_legal_name` varchar(255) DEFAULT NULL,
  `buyer_line_phone` varchar(255) DEFAULT NULL,
  `buyer_mobile_phone` varchar(255) DEFAULT NULL,
  `buyer_nin_brn` varchar(255) DEFAULT NULL,
  `buyer_passport_num` varchar(255) DEFAULT NULL,
  `buyer_place_of_busi` varchar(255) DEFAULT NULL,
  `buyer_reference_no` varchar(255) DEFAULT NULL,
  `buyer_sector` varchar(255) DEFAULT NULL,
  `buyer_tin` varchar(255) DEFAULT NULL,
  `buyer_type` varchar(255) DEFAULT NULL,
  `cell_village` varchar(255) DEFAULT NULL,
  `customer_account` varchar(255) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `division_subcounty` varchar(255) DEFAULT NULL,
  `effective_registration_date` varchar(255) DEFAULT NULL,
  `meter_status` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `municipality_county` varchar(255) DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `property_type` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `town` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Ut commodo et laboru','Guinevere Barber','Incidunt laboriosam','qoryb@mailinator.com','Kyle Hawkins','+1 (384) 114-7851','+1 (384) 114-7851','201905081705','Est ratione perspic','Nihil in corporis si','287','Labore magnam dolor ','201905081705','Laborum temporibus d','Eum maiores atque ev','567890979567849',NULL,NULL,NULL,'Sed fugit ut expedi','Fuga Dolorem labore','2020-10-19','101','user','Y','2022-06-23 09:27:39','Voluptatem et eiusmo','user',NULL,'2022-06-23 09:11:47','abc','-','Approved','Possimus nulla quo ','soaadmin',NULL,'2022-06-23 00:00:00'),(2,'Sunt soluta sequi te','Solomon Dixon','Voluptas dolorum ame','qizosugin@mailinator.com','Raymond Walker','+1 (244) 899-5608','+1 (244) 899-5608','201905081705','Quasi nesciunt et s','Delectus labore rec','815','Delectus obcaecati ','201905081705','Officia id dolorem m','Eos veritatis illum','446773838',NULL,NULL,NULL,'Et voluptate volupta','Corrupti in iste cu','2020-10-19','101','user','Y','2022-06-23 09:27:16','Proident iure cupid','user',NULL,'2022-06-23 09:11:57','abc','-','Approved','Fugiat et dolore nih','soaadmin',NULL,'2022-06-23 00:00:00'),(3,'Sunt vel ut tenetur','Lewis Bowen','Nulla quidem qui tem','piripuba@mailinator.com','Tallulah Duncan','+1 (841) 502-1492','+1 (841) 502-1492 ','201905081705','Dolor mollit delectu','Sint nihil corrupti','924','Aperiam id lorem ad','201905081705','Doloremque velit seq','Officiis ab officia ','46775673939 ',NULL,NULL,NULL,'Et ut ducimus in di','Aliqua Corrupti en','2020-10-19','101','user','Y','2022-06-23 09:27:52','Dolore qui sint est','user',NULL,'2022-06-23 09:12:07','abc','-','pending','Ad magnam reiciendis',NULL,NULL,NULL),(4,'Dolorem rem error qu','Karyn Kline','Facilis et voluptate','sudulapi@mailinator.com','Vanna Burks','+1 (481) 696-9897','+1 (481) 696-9897','201905081705','Voluptatum et qui sa','Voluptates incidunt','618','Molestiae culpa aut','201905081705','Et eveniet ipsum r','Aut ullamco nobis la','65789303984765',NULL,NULL,NULL,'Ut consequatur Ad f','Voluptatem eum aliqu','2020-10-19','101','user','Y','2022-06-23 09:28:13','Laudantium qui eum ','user',NULL,'2022-06-23 09:12:13','abc','-','pending','Voluptas animi est ',NULL,NULL,NULL),(5,'Ut aut magnam incidu','Wanda Osborne','Qui unde est quidem ','hewekibob@mailinator.com','Cassandra Holland','+1 (213) 934-6777','+1 (213) 934-6777','201905081705','Assumenda alias iure','Commodi impedit arc','558','Qui adipisicing recu','201905081705','Ea dolorem doloremqu','Nihil alias voluptat','56567398094750',NULL,NULL,NULL,'Cumque nulla ipsa q','Inventore culpa ist','2020-10-19','101','user','Y','2022-06-23 09:28:28','Est aut velit omnis ','user',NULL,'2022-06-23 09:12:19','abc','-','pending','Consectetur ex dolo',NULL,NULL,NULL),(6,'Ad consectetur volup','Magee Mosley','Aspernatur aute dolo','cifateg@mailinator.com','Stephanie Mullins','+1 (466) 227-7917','+1 (466) 227-7917','201905081705','Dolorum nemo eius ni','Eum culpa mollitia o','291','In aut quibusdam sim','201905081705','Culpa fugiat non mo','Eu commodi vitae cil','5668856890',NULL,NULL,NULL,'Irure possimus laud','Accusamus quidem pra','2020-10-19','101','user','Y','2022-06-23 09:28:38','Nostrum cum deleniti','user',NULL,'2022-06-23 09:12:27','abc','-','pending','Aliqua Debitis qui ',NULL,NULL,NULL),(7,'Velit est at labore ','Rebekah Sheppard','Ad quo dolor laudant','rifawowiti@mailinator.com','Pandora Rasmussen','+1 (721) 998-8853','+1 (466) 227-7917','201905081705','Lorem mollit sit no','In sit qui fuga Ni','732','Neque officia accusa','201905081705','Fugiat ut aperiam i','Tempora dolorum moll','6575894948',NULL,NULL,NULL,'Aut veniam consequu','Natus culpa voluptat','2020-10-19','101','user','Y','2022-06-23 09:28:55','Optio architecto eu','user',NULL,'2022-06-23 09:13:24','abc','-','pending','Eius Nam duis odit o',NULL,NULL,NULL),(9,'Qui in minus ea qui ','Chester Hammond','Voluptate mollitia s','wofehog@mailinator.com','Cassidy Saunders','+1 (716) 936-4182','Quod facilis ratione','201905081705','Tempor et aut molest','Doloremque in volupt','381','Irure autem voluptat','201905081705','Qui architecto inven','Assumenda reprehende','Voluptas sequi error',NULL,NULL,NULL,'Accusamus laboris co','Tenetur adipisicing ','2020-10-19','101',NULL,NULL,NULL,'Commodo eaque qui si','user',NULL,'2022-06-23 13:53:04','abc','-','pending','Aut voluptates quis ',NULL,NULL,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount_balance` double DEFAULT NULL,
  `amount_tobepaid` double DEFAULT NULL,
  `delivery_status` varchar(255) DEFAULT NULL,
  `expense_id` varchar(255) DEFAULT NULL,
  `income_withholdingamount` double DEFAULT NULL,
  `invoice_no` varchar(255) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `item_quantity` varchar(255) DEFAULT NULL,
  `item_total_value` double DEFAULT NULL,
  `item_unit_price` double DEFAULT NULL,
  `order_item_type` varchar(255) DEFAULT NULL,
  `po_number` varchar(255) DEFAULT NULL,
  `po_particulars_id` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `service_price` varchar(255) DEFAULT NULL,
  `vat_amount` double DEFAULT NULL,
  `vat_witholding` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery`
--

LOCK TABLES `delivery` WRITE;
/*!40000 ALTER TABLE `delivery` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `file_extension` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `filenameref` varchar(255) DEFAULT NULL,
  `is_approved` bit(1) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `reference_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (1,'pdf','User_Report (22).pdf','2022-06-20T07:14:26.270160User_Report (22).pdf','\0','\0','1'),(2,'pdf','Department_Report (32).pdf','2022-06-20T10:25:07.897344Department_Report (32).pdf','\0','\0','4'),(3,'pdf','Department_Report (33).pdf','2022-06-21T07:19:50.932219Department_Report (33).pdf','\0','\0','6'),(4,'pdf','Department_Report (33).pdf','2022-06-21T07:21:04.177396Department_Report (33).pdf','\0','\0','6'),(5,'pdf','Department_Report (34).pdf','2022-06-21T10:31:50.669864Department_Report (34).pdf','\0','\0','7'),(6,'pdf','Department_Report (34).pdf','2022-06-21T15:16:25.686677Department_Report (34).pdf','\0','\0','2'),(7,'pdf','report_9.pdf','2022-06-22T09:43:44.359534report_9.pdf','\0','\0','5'),(8,'pdf','Department_Report (47).pdf','2022-06-23T13:42:21.442839Department_Report (47).pdf','\0','\0','14'),(9,'pdf','Department_Report (45).pdf','2022-06-23T13:56:03.645408Department_Report (45).pdf','\0','\0','5'),(10,'pdf','report_16.pdf','2022-06-24T13:48:21.786844report_16.pdf','\0','\0','18'),(11,'pdf','Employee_P9_Form (4).pdf','2022-06-25T11:45:41.372479Employee_P9_Form (4).pdf','\0','\0','19');
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expense` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `expense_account` varchar(255) NOT NULL,
  `expense_code` varchar(255) NOT NULL,
  `expense_description` varchar(255) NOT NULL,
  `expense_major_category` varchar(255) NOT NULL,
  `expense_sub_category` varchar(255) NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  `expense_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (1,'N','N','2022-06-20 08:29:23','28041013KES','2324','IT Products Expenses','IT Support','Finacle Support','N','N','2022-06-20 08:29:23','system','Y','2022-06-20 08:29:23','N/A','Pending','N','N','2022-06-20 08:29:23',NULL),(2,'N','N','2022-06-20 08:29:23','13505001EUR','2201','Services Expenses','IT Support','Consult-Support','N','N','2022-06-20 08:29:23','system','Y','2022-06-20 08:29:23','N/A','Pending','N','N','2022-06-20 08:29:23',NULL),(3,'string','N','2022-06-22 14:59:15','string','string','string','string','string','string','Y','2022-06-22 14:59:15','string','Y','2022-06-22 14:59:15','string','string','string','N','2022-06-22 14:59:15',NULL),(4,'string','N','2022-06-22 14:59:15','-','string','string','string','string','string','Y','2022-06-22 14:59:15','string','Y','2022-06-22 14:59:15','string','string','string','N','2022-06-22 14:59:15',NULL),(5,'string','Y','2022-06-23 12:14:51','string','string','string','string','string','string','N','2022-06-23 12:14:51','string','N','2022-06-23 12:14:51','string','string','string','N','2022-06-23 12:14:51',NULL),(6,'string','N','2022-06-23 12:14:51','string','string','Marketing','Marketing','Social media advertisement','string','N','2022-06-23 12:14:51','soaadmin','N','2022-06-23 09:42:58','-','Approved','soaadmin','N','2022-06-23 00:00:00',NULL),(7,'string','N','2022-06-23 12:14:51','string','string','Marketing','Marketing','Radio ads','string','N','2022-06-23 12:14:51','soaadmin','N','2022-06-24 08:33:03','string','pending','string','N','2022-06-23 12:14:51','Goods'),(8,'string','N','2022-06-23 12:14:51','string','string','Health','Health','Treatment','string','N','2022-06-23 12:14:51','soaadmin','N','2022-06-24 08:42:55','string','pending','string','N','2022-06-23 12:14:51',''),(9,'string','N','2022-06-23 12:14:51','string','string','Marketing','Marketing','TV Advertisement','string','N','2022-06-23 12:14:51','soaadmin','N','2022-06-24 10:17:18','-','Approved','soaadmin','N','2022-06-24 00:00:00','Goods'),(10,'string','N','2022-06-23 12:14:51','string','string','Covid Treatment kits','Health','Treatment','string','N','2022-06-23 12:14:51','soaadmin','N','2022-06-24 12:27:04','string','pending','string','N','2022-06-23 12:14:51','Goods'),(11,'string','N','2022-06-23 12:14:51','string','string','Laptop Expenses','ICT Equuipments','LAPTOPS','string','N','2022-06-23 12:14:51','soaadmin','N','2022-06-25 14:22:29','-','Approved','soaadmin','N','2022-06-25 00:00:00','Goods');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expenses` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `expense` varchar(255) NOT NULL,
  `expense_account` varchar(255) NOT NULL,
  `expense_id` varchar(255) NOT NULL,
  `costcenter_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6iqx4dlrc5gil2ea2ciwxk4dx` (`costcenter_id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (1,'IT Products Expenses','13505001EUR','1',1),(2,'Services Expenses','28041013KES','2',1),(6,'IT Products Expenses','0188020001BDBDCO','1',7),(7,'Services Expenses','28041013KES','2',7),(8,'IT Products Expenses','0188020001BDBDCO','1',8),(9,'Services Expenses','28041013EUR','2',8),(10,'IT Products Expenses','13505001EUR','1',9),(11,'Services Expenses','28041013KES','2',9),(12,'IT Products Expenses','13505001KES','1',10),(13,'Services Expenses','9999OTH000000012','2',10),(14,'IT Products Expenses','28041013KES','1',11),(15,'Services Expenses','13505001EUR','2',11),(16,'','','',12),(17,'IT Products Expenses','1234567890','1',13),(18,'Marketing','28041013KES','6',14),(19,'IT Products Expenses','13505001KES','1',15),(20,'Services Expenses','13505001KES','2',15),(21,'IT Products Expenses','','1',16);
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extend`
--

DROP TABLE IF EXISTS `extend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `extend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoiceid` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `reason_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extend`
--

LOCK TABLES `extend` WRITE;
/*!40000 ALTER TABLE `extend` DISABLE KEYS */;
/*!40000 ALTER TABLE `extend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_services_seller`
--

DROP TABLE IF EXISTS `import_services_seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `import_services_seller` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `import_address` varchar(255) DEFAULT NULL,
  `import_attachment_content` varchar(255) DEFAULT NULL,
  `import_attachment_name` varchar(255) DEFAULT NULL,
  `import_business_name` varchar(255) DEFAULT NULL,
  `import_contact_number` varchar(255) DEFAULT NULL,
  `import_email_address` varchar(255) DEFAULT NULL,
  `import_invoice_date` varchar(255) DEFAULT NULL,
  `invoiceid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_services_seller`
--

LOCK TABLES `import_services_seller` WRITE;
/*!40000 ALTER TABLE `import_services_seller` DISABLE KEYS */;
/*!40000 ALTER TABLE `import_services_seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `antifake_code` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `custome_id` varchar(255) DEFAULT NULL,
  `data_source` varchar(255) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `device_no` varchar(255) DEFAULT NULL,
  `invoice_industry_code` varchar(255) DEFAULT NULL,
  `invoice_kind` varchar(255) DEFAULT NULL,
  `invoice_no` varchar(255) DEFAULT NULL,
  `invoice_status` varchar(255) DEFAULT NULL,
  `invoice_type` varchar(255) DEFAULT NULL,
  `is_batch` varchar(255) DEFAULT NULL,
  `issued_date` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `operator` varchar(255) DEFAULT NULL,
  `ori_invoice_id` varchar(255) DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  `customer_id` varchar(255) DEFAULT NULL,
  `balance` double DEFAULT NULL,
  `tax_amount` double DEFAULT NULL,
  `total_after_tax` double DEFAULT NULL,
  `payment_amount` double DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `vat_received` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (55,'Dolore ducimus lore','JPY',NULL,'101',NULL,NULL,NULL,'201905081234','Occaecat velit asper','Credit Invoice','829','Pending','1','Yes','1973-03-26T21:00:00.000Z',NULL,'Y','2022-06-24 10:29:17','aisino','Quod praesentium non','user',NULL,'2022-06-23 08:54:07','-',NULL,'N',NULL,'6',NULL,177935,1290037,NULL,'UnPaid',NULL),(52,'Culpa aliqua Quidem','Rem neque est ea do',NULL,'101',NULL,NULL,NULL,'201905081234','Consequatur laborio','Standard Invoice','135','Pending','1','Yes','1979-02-03T21:00:00.000Z',NULL,'Y','2022-06-24 10:29:32','aisino','Nulla id in ullamco ','user',NULL,'2022-06-23 06:24:37','-',NULL,'N',NULL,'2',NULL,69555,504278,NULL,'UnPaid',NULL),(54,'Nisi pariatur Solut','INR',NULL,'101',NULL,NULL,NULL,'201905081234','Consequatur Harum a','Mixed Invoice','425','Pending','1','Yes','1981-04-28T21:00:00.000Z',NULL,'Y','2022-06-24 10:29:52','aisino','Id reprehenderit hi','soaadmin',NULL,'2022-06-23 07:32:53','-',NULL,'N',NULL,'',NULL,1760,12760,NULL,'UnPaid',NULL),(51,'Sapiente nostrum dol','Laborum similique do',NULL,'101',NULL,NULL,NULL,'201905081234','Beatae aut non nulla','Credit Invoice','496','Approved','1','Yes','1972-01-22T21:00:00.000Z',NULL,'Y','2022-06-24 10:30:03','aisino','Officiis reprehender','user',NULL,'2022-06-23 02:44:17','-','soaadmin','N','2022-06-24 00:00:00','3',0,5600,40439,NULL,'Fully Paid',NULL),(45,'Consequatur aut amet','EUR',NULL,'101',NULL,NULL,NULL,'201905081234','Vel laboris ipsa el','Standard Invoice','404','Approved','1','Yes','1994-09-17T21:00:00.000Z',NULL,'Y','2022-06-23 07:14:24','aisino','Laboriosam sint ea ','soaadmin',NULL,'2022-06-21 13:53:06','-','soaadmin','N','2022-06-24 00:00:00','3',16000,16000,116000,NULL,'Partially Paid',NULL),(53,'Non hic sunt nulla s','USD',NULL,'101',NULL,NULL,NULL,'201905081234','Eligendi eligendi pa','Credit Invoice','233','Approved','1','Yes','1992-01-08T21:00:00.000Z',NULL,'N',NULL,'aisino','Sit cillum fuga Mi','soaadmin','Y','2022-06-23 07:29:14','-','soaadmin','N','2022-06-24 00:00:00','3',1600,1600,11600,NULL,'Partially Paid',NULL),(47,'Quo eum sit ipsam a','Unde officiis autem ',NULL,'101',NULL,NULL,NULL,'201905081234','Amet culpa nihil ve','Commercial Invoice','513','Pending','1','Yes','1989-08-05T21:00:00.000Z',NULL,'Y','2022-06-23 07:14:36','aisino','Voluptatibus cupidat','user',NULL,'2022-06-22 14:20:52','-',NULL,'N',NULL,'',NULL,57070,413679,NULL,NULL,NULL),(48,'Voluptatum irure fac','Tempor eiusmod nisi ',NULL,'101',NULL,NULL,NULL,'201905081234','Sit possimus verita','Credit Invoice','53','Pending','1','Yes','2017-05-08T21:00:00.000Z',NULL,'Y','2022-06-23 07:14:58','aisino','A dolor fugiat volu','user',NULL,'2022-06-22 15:32:24','-',NULL,'N',NULL,'2',NULL,151,946,NULL,NULL,NULL),(49,'Soluta quia at nihil','KES',NULL,'101',NULL,NULL,NULL,'201905081234','Facere eu est nisi ','Credit Invoice','110','Approved','1','Yes','1989-06-08T21:00:00.000Z',NULL,'Y','2022-06-23 07:15:06','aisino','Dolor explicabo Adi','user',NULL,'2022-06-22 15:39:25','-','soaadmin','N','2022-06-24 00:00:00','5',493,158,993,NULL,'Partially Paid',NULL),(50,'Officia magna except','UGX',NULL,'101',NULL,NULL,NULL,'201905081234','Pariatur Nemo exerc','Credit Invoice','711','Pending','1','Yes','1999-09-16T21:00:00.000Z',NULL,'Y','2022-06-23 07:15:11','aisino','Ea minim anim dolore','user',NULL,'2022-06-22 16:00:11','-',NULL,'N',NULL,'6',NULL,26,165,NULL,NULL,NULL),(56,'Illo minim facilis e','Iure et nisi laudant',NULL,'101',NULL,NULL,NULL,'201905081234','Magni aliqua Incidi','Standard Invoice','209','Pending','1','Yes','1973-02-27T21:00:00.000Z',NULL,'N',NULL,'aisino','Unde ad reprehenderi','user','Y','2022-06-23 10:44:46','-',NULL,'N',NULL,'2',NULL,156067,1131489,NULL,'UnPaid',NULL),(57,'55377746','KES',NULL,'101',NULL,NULL,NULL,'201905081234','45738','Credit Invoice','34567','Pending','1','Yes','2022-06-22T21:00:00.000Z',NULL,'N',NULL,'aisino','4537783','soaadmin','Y','2022-06-24 08:51:50','-',NULL,'N',NULL,'',NULL,58000,858000,NULL,'UnPaid',NULL);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_particulars`
--

DROP TABLE IF EXISTS `invoice_particulars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_particulars` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `deemed_flag` varchar(255) DEFAULT NULL,
  `discount_flag` varchar(255) DEFAULT NULL,
  `discount_tax_rate` varchar(255) DEFAULT NULL,
  `discount_total` varchar(255) DEFAULT NULL,
  `excise_currency` varchar(255) DEFAULT NULL,
  `excise_flag` varchar(255) DEFAULT NULL,
  `excise_rate` varchar(255) DEFAULT NULL,
  `excise_rate_name` varchar(255) DEFAULT NULL,
  `excise_rule` varchar(255) DEFAULT NULL,
  `excise_tax` varchar(255) DEFAULT NULL,
  `excise_unit` varchar(255) DEFAULT NULL,
  `goods_category_id` varchar(255) DEFAULT NULL,
  `goods_category_name` varchar(255) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `item_code` varchar(255) DEFAULT NULL,
  `order_number` varchar(255) DEFAULT NULL,
  `pack` varchar(255) DEFAULT NULL,
  `qty` varchar(255) DEFAULT NULL,
  `stick` varchar(255) DEFAULT NULL,
  `tax` varchar(255) DEFAULT NULL,
  `tax_rate` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `unit_of_measure` varchar(255) DEFAULT NULL,
  `unit_price` varchar(255) DEFAULT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6t8s0yyl1fxv5u3t87rejt31v` (`invoice_id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_particulars`
--

LOCK TABLES `invoice_particulars` WRITE;
/*!40000 ALTER TABLE `invoice_particulars` DISABLE KEYS */;
INSERT INTO `invoice_particulars` VALUES (17,'','','','','','','','','','','','','','','42','Brenda West','Sapiente ullam qui u','Et elit tempora ali','','438','','','16','247908','Excepteur veritatis ','566',NULL),(14,'','','','','','','','','','','','','','','64','Ivana Oneill','Ut deleniti labore q','Similique sit labor','','500','','','16','120500','Molestiae consequatu','241',NULL),(13,'','','','','','','','','','','','','','','26','Ila Burris','Neque hic ex occaeca','Voluptate et aliqua','','471','','','16','442269','Quia ea sed temporib','939',NULL),(10,'','','','','','','','','','','','','','','','Cleaning','','4567890','','','','1600','16','10000','','10000',NULL),(11,'','','','','','','','','','','','','','','','Fumigation','','456789','','','','1600','16','10000','','10000',NULL),(12,'','','','','','','','','','','','','','','54','Kai Dyer','Et architecto ea lab','Inventore voluptas u','','720','','','','470880','Ut voluptatum volupt','654',NULL),(15,'','','','','','','','','','','','','','','70','Wendy Ramsey','Proident officia de','Et suscipit reprehen','','923','','','16','193830','Libero temporibus co','210',NULL),(16,'','','','','','','','','','','','','','','','Zelda Reyes','','Ipsum ullam autem m','','','','49.76','16','311','','311',NULL),(18,'','','','','','','','','','','','','','','40','Autumn Hawkins','In laborum Sint lab','Culpa accusantium s','','467','','','16','266657','Velit quibusdam ut i','571',NULL),(37,'','','','','',NULL,'','','','','','','','','27','Cecilia Kennedy','Quasi laborum recusa','Molestias laudantium','','70','','1411.2','16','10231.2','Eum voluptate neque ','126.0',51),(36,'','','','','',NULL,'','','','','','','','','','Sydnee Oneal','','Nostrum anim aute ve','','','','115.68','16','838.6800000000001','','723.0',52),(35,'','','','','',NULL,'','','','','','','','','77','Nigel Hanson','Aut pariatur Rerum ','Dolores adipisicing ','','434','','69440.0','16','503440.0','Voluptas quisquam eu','1000.0',52),(22,'','','','','','','','','','','','','','','','Keiko Stone','','Officia nulla volupt','','','','146.72','16','917','','917',NULL),(23,'','','','','','','','','','','','','','','','ewrew','','2343','','','','51.68','16','323','','323',NULL),(31,'','','','','',NULL,'','','','','','','','','','Kibo Craig','','Sed consectetur Nam ','','','','103.68','16','648.0','','648.0',51),(25,'','','','','',NULL,'','','','','','','','','61','Nita Roach','Ea eum labore quis v','Commodi tenetur in q','','355','',NULL,'16','313110.0','Ipsum dolorum unde p','882.0',NULL),(26,'','','','','',NULL,'','','','','','','','','','Alexander Lindsey','','Quas id sapiente mai','','','','87.68','16','548.0','','548.0',47),(27,'','','','','',NULL,'','','','','','','','','58','Chadwick Mcclure','Laborum veniam sunt','Commodi aliqua Temp','','54','',NULL,'16','43038.0','In consequatur est b','797.0',NULL),(28,'','','','','',NULL,'','','','','','','','','','Ahmed Rodriquez','','Exercitationem paria','','','','151.36','16','946.0','','946.0',48),(29,'','','','','',NULL,'','','','','','','','','','Meredith Flowers','','Fugiat quis non rec','','','','158.88','16','993.0','','993.0',49),(30,'','','','','',NULL,'','','','','','','','','','Trevor Wynn','','Rerum itaque et a ac','','','','26.400000000000002','16','165.0','','165.0',50),(32,'','','','','',NULL,'','','','','','','','','27','Cecilia Kennedy','Quasi laborum recusa','Molestias laudantium','','70','',NULL,'16','8820.0','Eum voluptate neque ','126.0',NULL),(33,'','','','','',NULL,'','','','','','','','','','Fiona Juarez','','Iure qui nisi offici','','','','68.16','16','426.0','','426.0',51),(34,'','','','','',NULL,'','','','','','','','','18','Jessamine Leach','Porro repellendus I','Molestias exercitati','','897','',NULL,'16','25116.0','Dolorem asperiores q','28.0',NULL),(39,'','','','','',NULL,'','','','','','','','','','ewrew','','2343','','','','16000.0','16','116000.0','','100000.0',45),(38,'','','','','',NULL,'','','','','','','','','18','Jessamine Leach','Porro repellendus I','Molestias exercitati','','897','','4018.56','16','29134.56','Dolorem asperiores q','28.0',51),(40,'','','','','',NULL,'','','','','','','','','61','Nita Roach','Ea eum labore quis v','Commodi tenetur in q','','355','','50097.6','16','363207.6','Ipsum dolorum unde p','882.0',47),(41,'','','','','',NULL,'','','','','','','','','58','Chadwick Mcclure','Laborum veniam sunt','Commodi aliqua Temp','','54','','6886.08','16','49924.08','In consequatur est b','797.0',47),(42,'','','','','',NULL,'','','','','','','','','234','item1','21321','21331','','10','','1600.0','16','11600.0','10','1000.0',53),(43,'','','','','',NULL,'','','','','','','','','','item2','','3532','','','','160.0','16','1160.0','','1000.0',54),(44,'','','','','',NULL,'','','','','','','','','344','item3','32432','324234','','5','','1600.0','16','11600.0','20','2000.0',54),(45,'','','','','',NULL,'','','','','','','','','98','Kyla Acosta','Consequuntur nostrud','Sunt aliquid qui ad ','','605','','79860.0','16','578985.0','Duis sunt libero de','825.0',55),(46,'','','','','',NULL,'','','','','','','','','61','Carl Moss','Eum rerum praesentiu','Omnis magna officia ','','643','','76439.84','16','554188.84','Accusantium nulla na','743.0',55),(47,'','','','','',NULL,'','','','','','','','','60','Mechelle Solomon','Voluptas aliquip aut','Natus vel et non et ','','354','','21636.48','16','156864.48','Omnis fugit consequ','382.0',55),(48,'','','','','',NULL,'','','','','','','','','','Melvin Wilkinson','','Fuga Eveniet in ap','','','','63.2','16','458.2','','395.0',56),(49,'','','','','',NULL,'','','','','','','','','74','Camille William','Magnam laborum volup','Anim numquam corpori','','908','','54480.0','16','394980.0','Qui fuga Et quidem ','375.0',56),(50,'','','','','',NULL,'','','','','','','','','95','Gavin White','Aut quam recusandae','Ex odit et fuga Obc','','639','','101524.32','16','736051.3200000001','Laborum Commodo omn','993.0',56),(51,'','','','','',NULL,'','','','','','','','','45383','Server','437737','53777','','10','','10000.0','2','510000.0','count','50000.0',57),(52,'','','','','',NULL,'','','','','','','','','45366','Monitors','453673','453677','','15','','48000.0','16','348000.0','count','20000.0',57);
/*!40000 ALTER TABLE `invoice_particulars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modifiable_po_particulars`
--

DROP TABLE IF EXISTS `modifiable_po_particulars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modifiable_po_particulars` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount_balance` double DEFAULT NULL,
  `amount_tobepaid` double DEFAULT NULL,
  `delivery_status` varchar(255) DEFAULT NULL,
  `expense_id` varchar(255) DEFAULT NULL,
  `income_withholdingamount` double DEFAULT NULL,
  `income_w_id` varchar(255) DEFAULT NULL,
  `invoice_no` varchar(255) DEFAULT NULL,
  `is_paid` bit(1) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `item_quantity` varchar(255) DEFAULT NULL,
  `item_total_value` double DEFAULT NULL,
  `item_unit_price` double DEFAULT NULL,
  `order_item_type` varchar(255) DEFAULT NULL,
  `purchase_order_id` varchar(255) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `service_price` varchar(255) DEFAULT NULL,
  `vat_amount` double DEFAULT NULL,
  `vat_witholding` double DEFAULT NULL,
  `vat_id` varchar(255) DEFAULT NULL,
  `vat_w_id` varchar(255) DEFAULT NULL,
  `income_tax_rate` varchar(255) DEFAULT NULL,
  `vat_rate` varchar(255) DEFAULT NULL,
  `vat_witholding_rate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKriutn7xtjpard468o4l3rhpg0` (`purchase_order_id`(250))
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modifiable_po_particulars`
--

LOCK TABLES `modifiable_po_particulars` WRITE;
/*!40000 ALTER TABLE `modifiable_po_particulars` DISABLE KEYS */;
INSERT INTO `modifiable_po_particulars` VALUES (1,NULL,11600,'pending','1',NULL,'','','\0','Laptop','10',10000,1000,'Goods','1','','','',1600,200,'1','2',NULL,NULL,NULL),(2,NULL,348000,'pending','1',21000,'3','','\0','','',300000,NULL,'Service','2','','Finacle Consultation','300000',48000,NULL,'1','2',NULL,NULL,NULL),(3,NULL,580000,'pending','1',35000,'3','','\0','','',500000,NULL,'Service','2','','Internet Security','500000',80000,NULL,'1','2',NULL,NULL,NULL),(4,NULL,360000,'pending','1',NULL,'','','\0','Laptops','18',360000,20000,'Goods','3','','','',0,7200,'1','2',NULL,NULL,NULL),(5,NULL,116000,'pending','2',7000,'3','','\0','','',100000,NULL,'Service','4','','Cleaning offices ','100000',16000,NULL,'1','2',NULL,NULL,NULL),(6,NULL,23200,'pending','1',1400,'3','','\0','','',20000,NULL,'Service','5','','Test Service','20000',3200,NULL,'1','2',NULL,NULL,NULL),(7,NULL,11600,'pending','1',NULL,'','','\0','item','10',10000,1000,'Goods','6','','','',1600,200,'1','2',NULL,NULL,NULL),(8,NULL,39440,'pending','1',NULL,'','','\0','rtrw','34',34000,1000,'Goods','7','','','',5440,680,'1','2',NULL,NULL,NULL),(9,NULL,100000,'pending','1',NULL,'','','\0','Water Dispenser','5',100000,20000,'Goods','8','','','',0,2000,'1','2',NULL,NULL,NULL),(10,NULL,116000,'pending','1',NULL,'','','\0','Coffee maker','10',100000,10000,'Goods','8','','','',16000,2000,'1','2',NULL,NULL,NULL),(11,NULL,348000,'pending','2',21000,'3','','\0','','',300000,NULL,'Service','9','','Finacle Support','300000',48000,NULL,'1','2',NULL,NULL,NULL),(12,NULL,116000,'pending','1',7000,'3','','\0','','',100000,NULL,'Service','9','','Penetration Testing','100000',16000,NULL,'1','2',NULL,NULL,NULL),(13,NULL,232000,'pending','1',14000,'3','','\0','','',200000,NULL,'Service','9','','Networks maintainance','200000',32000,NULL,'1','2',NULL,NULL,NULL),(14,NULL,406000,'pending','1',24500,'3','','\0','','',350000,NULL,'Service','9','','Cloud Services','350000',56000,NULL,'1','2',NULL,NULL,NULL),(15,NULL,464000,'pending','1',28000,'3','','\0','','',400000,NULL,'Service','10','','Painting','400000',64000,NULL,'1','2',NULL,NULL,NULL),(16,NULL,23200,'pending','1',1400,'3','','\0','','',20000,NULL,'Service','10','','Loovers Replacement','20000',3200,NULL,'1','2',NULL,NULL,NULL),(17,NULL,46400,'pending','1',2800,'3','','\0','','',40000,NULL,'Service','10','','Surface scrubbing','40000',6400,NULL,'1','2',NULL,NULL,NULL),(18,NULL,928000,'pending','1',NULL,'','','\0','Server','10',800000,80000,'Goods','11','','','',128000,16000,'1','2',NULL,NULL,NULL),(19,NULL,928000,'pending','1',NULL,'','','\0','Swith','20',800000,40000,'Goods','11','','','',128000,16000,'1','2',NULL,NULL,NULL),(20,NULL,174000,'pending','1',NULL,'','','\0','OLT','3',150000,50000,'Goods','11','','','',24000,3000,'1','2',NULL,NULL,NULL),(21,NULL,40600,'pending','1',NULL,'','','\0','Power UPS','5',35000,7000,'Goods','11','','','',5600,700,'1','2',NULL,NULL,NULL),(22,NULL,1160,'pending','1',70,'3','','\0','','',1000,NULL,'Service','12','','service','1000',160,NULL,'1','2',NULL,NULL,NULL),(23,NULL,2320,'pending','2',140,'3','','\0','','',2000,NULL,'Service','12','','service 2','2000',320,NULL,'1','2',NULL,NULL,NULL),(24,NULL,1160,'pending','1',NULL,'','','\0','item','10',1000,100,'Goods','13','','','',160,20,'1','2',NULL,NULL,NULL),(25,NULL,2320,'pending','1',140,'3','','\0','','',2000,NULL,'Service','14','','Cleaning hard drives','2000',320,NULL,'1','2','5','16',NULL),(26,NULL,3480,'pending','2',210,'3','','\0','','',3000,NULL,'Service','14','','Cleaning','3000',480,NULL,'1','2','5','16',NULL),(27,NULL,58000,'pending','2',3500,'3','','\0','','',50000,NULL,'Service','15','','Cleaning','50000',8000,NULL,'1','2','5','16',NULL),(28,NULL,58000,'pending','2',3500,'3','','\0','','',50000,NULL,'Service','15','','Cooking','50000',8000,NULL,'1','2','5','16',NULL),(29,NULL,58000,'pending','2',3500,'3','','\0','','',50000,NULL,'Service','15','','Washing Dishes','50000',8000,NULL,'1','2','5','16',NULL),(30,NULL,58000,'pending','2',3500,'3','','\0','Cleaning the banking hall','0',50000,50000,'Service','16','','Cleaning the banking hall','50000',8000,NULL,'1','2','5','16',NULL),(31,NULL,19140,'pending','6',1155,'3','','\0','','',16500,NULL,'Service','17','','Laptop marketing','16500',2640,NULL,'1','2','5','16',NULL),(32,NULL,37000,'pending','',2590,'3','','\0','','',37000,NULL,'Service','17','','HP folio corei7','37000',0,NULL,'1','2','5','',NULL),(33,NULL,80000,'pending','',5600,'3','','\0','','',80000,NULL,'Service','17','','Ubuntu 22.04','80000',0,NULL,'1','2','5','',NULL),(34,NULL,48000300000,'pending','1',15000,'','','\0','Finacle Support','0',300000,48000300000,'Service','','','Finacle Support','300000',48000,NULL,'','','','',NULL),(35,NULL,16000100000,'pending','1',5000,'','','\0','Penetration Testing','0',100000,16000100000,'Service','','','Penetration Testing','100000',16000,NULL,'','','','',NULL),(36,NULL,32000200000,'pending','1',10000,'','','\0','Networks maintainance','0',200000,32000200000,'Service','','','Networks maintainance','200000',32000,NULL,'','','','',NULL),(37,NULL,56000350000,'pending','1',17500,'','','\0','Cloud Services','0',350000,56000350000,'Service','','','Cloud Services','350000',56000,NULL,'','','','',NULL),(38,NULL,174000,'pending','10',NULL,'','','\0','Thermometer','3',150000,50000,'Goods','18','','','',24000,3000,'1','2','','16',NULL),(39,NULL,4,'pending','10',NULL,'','','\0','PressureMeasure','2',4,2,'Goods','18','','','',0,0.08,'1','2','','',NULL),(40,NULL,10000,'pending','1',NULL,'','','\0','Network cables','4',10000,2500,'Goods','18','','','',0,200,'1','2','','',NULL),(41,NULL,11600,'pending','1',NULL,'','','\0','LAN','100',10000,100,'Goods','19','','','',1600,200,'1','2','','16',NULL),(42,NULL,1160,'pending','1',NULL,'','','\0','RJ45','200',1000,5,'Goods','19','','','',160,20,'1','2','','16',NULL),(43,NULL,10500,'pending','2',500,'','','\0','','',10000,NULL,'Service','19','','Network design','10000',500,NULL,'','','','',NULL);
/*!40000 ALTER TABLE `modifiable_po_particulars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisation`
--

DROP TABLE IF EXISTS `organisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `organisation_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisation`
--

LOCK TABLES `organisation` WRITE;
/*!40000 ALTER TABLE `organisation` DISABLE KEYS */;
INSERT INTO `organisation` VALUES (1,'61409-00100','Kampala','Uganda',NULL,NULL,NULL,'postbank@gmail.com',NULL,NULL,NULL,'PostBank','0702270029',NULL,NULL,'-','pending',NULL,NULL,NULL);
/*!40000 ALTER TABLE `organisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `otp` (
  `sn` int(11) NOT NULL AUTO_INCREMENT,
  `otp` int(11) NOT NULL,
  `req_time` datetime NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parttrans`
--

DROP TABLE IF EXISTS `parttrans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parttrans` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `credit_account` varchar(255) NOT NULL,
  `debit_account` varchar(255) NOT NULL,
  `narration` varchar(255) NOT NULL,
  `posted_on` datetime NOT NULL,
  `transaction_code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_70x0hnna37r2buluq4xbbwc1w` (`transaction_code`) USING HASH
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parttrans`
--

LOCK TABLES `parttrans` WRITE;
/*!40000 ALTER TABLE `parttrans` DISABLE KEYS */;
/*!40000 ALTER TABLE `parttrans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payway`
--

DROP TABLE IF EXISTS `payway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payway` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoiceid` varchar(255) DEFAULT NULL,
  `order_number` varchar(255) DEFAULT NULL,
  `payment_amount` varchar(255) DEFAULT NULL,
  `payment_mode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payway`
--

LOCK TABLES `payway` WRITE;
/*!40000 ALTER TABLE `payway` DISABLE KEYS */;
/*!40000 ALTER TABLE `payway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `po_particulars`
--

DROP TABLE IF EXISTS `po_particulars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `po_particulars` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount_balance` double DEFAULT NULL,
  `amount_tobepaid` double DEFAULT NULL,
  `delivery_status` varchar(255) DEFAULT NULL,
  `expense_id` varchar(255) NOT NULL,
  `income_withholdingamount` double DEFAULT NULL,
  `income_w_id` varchar(255) NOT NULL,
  `invoice_no` varchar(255) DEFAULT NULL,
  `is_paid` bit(1) DEFAULT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_quantity` varchar(255) DEFAULT NULL,
  `item_total_value` double DEFAULT NULL,
  `item_unit_price` double DEFAULT NULL,
  `order_item_type` varchar(255) DEFAULT NULL,
  `purchase_order_id` varchar(255) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `service_price` varchar(255) DEFAULT NULL,
  `vat_amount` double DEFAULT NULL,
  `vat_witholding` double DEFAULT NULL,
  `vat_id` varchar(255) NOT NULL,
  `vat_w_id` varchar(255) NOT NULL,
  `po_particulars_id` bigint(20) DEFAULT NULL,
  `income_tax_rate` varchar(255) DEFAULT NULL,
  `vat_rate` varchar(255) DEFAULT NULL,
  `vat_witholding_rate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK69qvn2thgbvqbtcng7vjmk7id` (`purchase_order_id`(250)),
  KEY `FK3gbo0x46t459wh9rspwyif7bb` (`po_particulars_id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `po_particulars`
--

LOCK TABLES `po_particulars` WRITE;
/*!40000 ALTER TABLE `po_particulars` DISABLE KEYS */;
INSERT INTO `po_particulars` VALUES (1,NULL,11600,'pending','1',NULL,'','','\0','Laptop','10',10000,1000,'Goods','1','','','',1600,200,'1','2',NULL,NULL,NULL,NULL),(2,NULL,348000,'pending','1',21000,'3','','\0','','',300000,NULL,'Service','2','','Finacle Consultation','300000',48000,NULL,'1','2',NULL,NULL,NULL,NULL),(3,NULL,580000,'pending','1',35000,'3','','\0','','',500000,NULL,'Service','2','','Internet Security','500000',80000,NULL,'1','2',NULL,NULL,NULL,NULL),(4,NULL,360000,'pending','1',NULL,'','','\0','Laptops','18',360000,20000,'Goods','3','','','',0,7200,'1','2',NULL,NULL,NULL,NULL),(5,NULL,116000,'pending','2',7000,'3','','\0','','',100000,NULL,'Service','4','','Cleaning offices ','100000',16000,NULL,'1','2',NULL,NULL,NULL,NULL),(6,NULL,23200,'pending','1',1400,'3','','\0','','',20000,NULL,'Service','5','','Test Service','20000',3200,NULL,'1','2',NULL,NULL,NULL,NULL),(7,NULL,11600,'pending','1',NULL,'','','\0','item','10',10000,1000,'Goods','6','','','',1600,200,'1','2',NULL,NULL,NULL,NULL),(8,NULL,39440,'pending','1',NULL,'','','\0','rtrw','34',34000,1000,'Goods','7','','','',5440,680,'1','2',NULL,NULL,NULL,NULL),(9,NULL,100000,'pending','1',NULL,'','','\0','Water Dispenser','5',100000,20000,'Goods','8','','','',0,2000,'1','2',NULL,NULL,NULL,NULL),(10,NULL,116000,'pending','1',NULL,'','','\0','Coffee maker','10',100000,10000,'Goods','8','','','',16000,2000,'1','2',NULL,NULL,NULL,NULL),(11,NULL,348000,'pending','2',21000,'3','','\0','','',300000,NULL,'Service','9','','Finacle Support','300000',48000,NULL,'1','2',NULL,NULL,NULL,NULL),(12,NULL,116000,'pending','1',7000,'3','','\0','','',100000,NULL,'Service','9','','Penetration Testing','100000',16000,NULL,'1','2',NULL,NULL,NULL,NULL),(13,NULL,232000,'pending','1',14000,'3','','\0','','',200000,NULL,'Service','9','','Networks maintainance','200000',32000,NULL,'1','2',NULL,NULL,NULL,NULL),(14,NULL,406000,'pending','1',24500,'3','','\0','','',350000,NULL,'Service','9','','Cloud Services','350000',56000,NULL,'1','2',NULL,NULL,NULL,NULL),(15,NULL,464000,'pending','1',28000,'3','','\0','','',400000,NULL,'Service','10','','Painting','400000',64000,NULL,'1','2',NULL,NULL,NULL,NULL),(16,NULL,23200,'pending','1',1400,'3','','\0','','',20000,NULL,'Service','10','','Loovers Replacement','20000',3200,NULL,'1','2',NULL,NULL,NULL,NULL),(17,NULL,46400,'pending','1',2800,'3','','\0','','',40000,NULL,'Service','10','','Surface scrubbing','40000',6400,NULL,'1','2',NULL,NULL,NULL,NULL),(18,NULL,928000,'pending','1',NULL,'','','\0','Server','10',800000,80000,'Goods','11','','','',128000,16000,'1','2',NULL,NULL,NULL,NULL),(19,NULL,928000,'pending','1',NULL,'','','\0','Swith','20',800000,40000,'Goods','11','','','',128000,16000,'1','2',NULL,NULL,NULL,NULL),(20,NULL,174000,'pending','1',NULL,'','','\0','OLT','3',150000,50000,'Goods','11','','','',24000,3000,'1','2',NULL,NULL,NULL,NULL),(21,NULL,40600,'pending','1',NULL,'','','\0','Power UPS','5',35000,7000,'Goods','11','','','',5600,700,'1','2',NULL,NULL,NULL,NULL),(22,NULL,1160,'pending','1',70,'3','','\0','','',1000,NULL,'Service','12','','service','1000',160,NULL,'1','2',NULL,NULL,NULL,NULL),(23,NULL,2320,'pending','2',140,'3','','\0','','',2000,NULL,'Service','12','','service 2','2000',320,NULL,'1','2',NULL,NULL,NULL,NULL),(24,NULL,1160,'pending','1',NULL,'','','\0','item','10',1000,100,'Goods','13','','','',160,20,'1','2',NULL,NULL,NULL,NULL),(25,NULL,2320,'pending','1',140,'3','','\0','','',2000,NULL,'Service','14','','Cleaning hard drives','2000',320,NULL,'1','2',NULL,'5','16',NULL),(26,NULL,3480,'pending','2',210,'3','','\0','','',3000,NULL,'Service','14','','Cleaning','3000',480,NULL,'1','2',NULL,'5','16',NULL),(27,NULL,58000,'pending','2',3500,'3','','\0','','',50000,NULL,'Service','15','','Cleaning','50000',8000,NULL,'1','2',NULL,'5','16',NULL),(28,NULL,58000,'pending','2',3500,'3','','\0','','',50000,NULL,'Service','15','','Cooking','50000',8000,NULL,'1','2',NULL,'5','16',NULL),(29,NULL,58000,'pending','2',3500,'3','','\0','','',50000,NULL,'Service','15','','Washing Dishes','50000',8000,NULL,'1','2',NULL,'5','16',NULL),(30,NULL,58000,'pending','2',3500,'3','','\0','Cleaning the banking hall','0',50000,50000,'Service','16','','Cleaning the banking hall','50000',8000,NULL,'1','2',NULL,'5','16',NULL),(31,NULL,19140,'pending','6',1155,'3','','\0','','',16500,NULL,'Service','17','','Laptop marketing','16500',2640,NULL,'1','2',NULL,'5','16',NULL),(32,NULL,37000,'pending','',2590,'3','','\0','','',37000,NULL,'Service','17','','HP folio corei7','37000',0,NULL,'1','2',NULL,'5','',NULL),(33,NULL,80000,'pending','',5600,'3','','\0','','',80000,NULL,'Service','17','','Ubuntu 22.04','80000',0,NULL,'1','2',NULL,'5','',NULL),(34,NULL,48000300000,'pending','1',15000,'','','\0','Finacle Support','0',300000,48000300000,'Service','','','Finacle Support','300000',48000,NULL,'','',NULL,'','',NULL),(35,NULL,16000100000,'pending','1',5000,'','','\0','Penetration Testing','0',100000,16000100000,'Service','','','Penetration Testing','100000',16000,NULL,'','',NULL,'','',NULL),(36,NULL,32000200000,'pending','1',10000,'','','\0','Networks maintainance','0',200000,32000200000,'Service','','','Networks maintainance','200000',32000,NULL,'','',NULL,'','',NULL),(37,NULL,56000350000,'pending','1',17500,'','','\0','Cloud Services','0',350000,56000350000,'Service','','','Cloud Services','350000',56000,NULL,'','',NULL,'','',NULL),(38,NULL,174000,'pending','10',NULL,'','','\0','Thermometer','3',150000,50000,'Goods','18','','','',24000,3000,'1','2',NULL,'','16',NULL),(39,NULL,4,'pending','10',NULL,'','','\0','PressureMeasure','2',4,2,'Goods','18','','','',0,0.08,'1','2',NULL,'','',NULL),(40,NULL,10000,'pending','1',NULL,'','','\0','Network cables','4',10000,2500,'Goods','18','','','',0,200,'1','2',NULL,'','',NULL),(41,NULL,11600,'pending','1',NULL,'','','\0','LAN','100',10000,100,'Goods','19','','','',1600,200,'1','2',NULL,'','16',NULL),(42,NULL,1160,'pending','1',NULL,'','','\0','RJ45','200',1000,5,'Goods','19','','','',160,20,'1','2',NULL,'','16',NULL),(43,NULL,10500,'pending','2',500,'','','\0','','',10000,NULL,'Service','19','','Network design','10000',500,NULL,'','',NULL,'','',NULL);
/*!40000 ALTER TABLE `po_particulars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privileges`
--

DROP TABLE IF EXISTS `privileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privileges` (
  `sn` bigint(20) NOT NULL AUTO_INCREMENT,
  `privilege` varchar(40) NOT NULL,
  PRIMARY KEY (`sn`),
  UNIQUE KEY `UK_7oxalg3ny8glx13trbld0mllg` (`privilege`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privileges`
--

LOCK TABLES `privileges` WRITE;
/*!40000 ALTER TABLE `privileges` DISABLE KEYS */;
INSERT INTO `privileges` VALUES (1,'DELETE'),(2,'ADD'),(3,'INQUIRE'),(4,'VERIFY'),(5,'MODIFY');
/*!40000 ALTER TABLE `privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_description` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) NOT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  `categoryid` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,NULL,'Furnitures',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-21 13:21:15','-','pending',NULL,NULL,NULL,'2','Ad praesentium aut v','Guy Lott',283,598),(4,NULL,'Utensils',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-21 13:27:51','-','pending',NULL,NULL,NULL,'3','Voluptas cum esse ci','Winter Warren',528,260),(5,NULL,'Automotives',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-21 13:27:51','-','pending',NULL,NULL,NULL,'4','Molestias eu fugiat','Susan Aguilar',275,997),(6,NULL,'Automotives',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-21 13:27:51','-','pending',NULL,NULL,NULL,'4','Nisi atque aut optio','Ria Floyd',5,524),(7,NULL,'Land',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-21 13:27:51','-','pending',NULL,NULL,NULL,'5','Harum eaque qui qui ','Mira Graham',498,85);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order`
--

DROP TABLE IF EXISTS `purchase_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchase_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `corresponded_invoice_number` bigint(20) DEFAULT NULL,
  `curent_vat_amount` double DEFAULT NULL,
  `curent_vat_witholding` double DEFAULT NULL,
  `current_income_withholdingamount` double DEFAULT NULL,
  `current_po_total_amount` double DEFAULT NULL,
  `current_total_after_tax` double DEFAULT NULL,
  `current_total_before_tax` double DEFAULT NULL,
  `current_vat_amount` double DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `expense_id` bigint(20) DEFAULT NULL,
  `in_progress` bit(1) DEFAULT NULL,
  `invoice_no` varchar(255) DEFAULT NULL,
  `is_paid` bit(1) DEFAULT NULL,
  `is_sent` bit(1) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `move_to_bill` bit(1) DEFAULT NULL,
  `original_income_withholdingamount` double NOT NULL,
  `original_total_after_tax` double NOT NULL,
  `original_total_before_tax` double NOT NULL,
  `original_vat_amount` double NOT NULL,
  `original_vat_witholding` double NOT NULL,
  `payment_status` bit(1) DEFAULT NULL,
  `po_name` varchar(255) NOT NULL,
  `po_number` varchar(255) NOT NULL,
  `po_status` varchar(255) DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `supplier_address` varchar(255) DEFAULT NULL,
  `supplier_contact` varchar(255) DEFAULT NULL,
  `supplier_id` bigint(20) NOT NULL,
  `supplier_mobile` varchar(255) DEFAULT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_lwrq427j2idkadsjddbb16mr9` (`po_number`) USING HASH
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order`
--

LOCK TABLES `purchase_order` WRITE;
/*!40000 ALTER TABLE `purchase_order` DISABLE KEYS */;
INSERT INTO `purchase_order` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0','234123','','',NULL,NULL,NULL,'',0,21600,20000,1600,200,NULL,'Test PO','aksdNaApeHMBBlf','Approved','soaadmin','Y','2022-06-20 07:13:27','-','Veniam duis dolorem','Anim voluptas aute c',1,'820','Cameron Sandoval','soaadmin',NULL,'2022-06-20 00:00:00'),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0','45364','\0','',NULL,NULL,NULL,'',56000,1380000,1300000,128000,0,NULL,'Purchase Order One','5viI51UU@ak!b$Q','Approved','user','Y','2022-06-20 09:24:31','-','Dolor esse rerum min','Ipsum earum tempore',2,'569','Marny Willis','soaadmin',NULL,'2022-06-21 00:00:00'),(3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','',NULL,NULL,NULL,'\0',0,720000,720000,0,7200,NULL,'Purchase Order Two','ja6n&nZkFukAbzQ','Approved','user','Y','2022-06-20 09:28:20','-','Veniam duis dolorem','Anim voluptas aute c',1,'820','Cameron Sandoval','soaadmin',NULL,'2022-06-22 00:00:00'),(4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0','3245','\0','',NULL,NULL,NULL,'',7000,216000,200000,16000,0,NULL,'Cleeaning Purchase Order','IRxF8H$XlbCOb0a','Approved','user','Y','2022-06-20 09:33:36','-','00100','443243223',4,'286','Aileen Ferguson','soaadmin',NULL,'2022-06-20 00:00:00'),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','',NULL,NULL,NULL,'\0',1400,43200,40000,3200,0,NULL,'Test PO','8#0fgjj4QvHXL!R','Approved','user','Y','2022-06-20 13:12:02','-','Dolor esse rerum min','Ipsum earum tempore',2,'569','Marny Willis','soaadmin',NULL,'2022-06-22 00:00:00'),(6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0','3432','','',NULL,NULL,NULL,'',0,21600,20000,1600,200,NULL,'Test Purchase order','RUto9%IETNk1ugr','Approved','soaadmin','Y','2022-06-21 07:17:14','-','Eos quae consequatu','Facere quos officiis',3,'206','Astra Travis','soaadmin',NULL,'2022-06-21 00:00:00'),(7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0','93423','','',NULL,NULL,NULL,'',0,73440,68000,5440,680,NULL,'Test Purchase order','FLC0efy3J9LfEzG','Approved','soaadmin','Y','2022-06-21 10:30:34','-','Eos quae consequatu','Facere quos officiis',3,'206','Astra Travis','soaadmin',NULL,'2022-06-21 00:00:00'),(8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','\0',NULL,NULL,NULL,'\0',0,316000,300000,16000,4000,NULL,'Electronics PO','LTD081RPfJN81vb','pending','user','Y','2022-06-22 02:33:59','-','Veniam duis dolorem','Anim voluptas aute c',1,'820','Cameron Sandoval',NULL,NULL,NULL),(9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','\0',NULL,NULL,NULL,'\0',47500,3.000001000002e34,3.000001000002e29,152000,0,NULL,'IT Consultant PO','B8p&d@sKb2uoAyY','pending','soaadmin','Y','2022-06-24 12:21:35','-','Dolor esse rerum min','Ipsum earum tempore',2,'Dolor esse rerum min','Dolor esse rerum min',NULL,NULL,NULL),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','\0',NULL,NULL,NULL,'\0',32200,506400,500000,73600,0,NULL,'Head Office Renovation','tVz3rjzL9BboE5H','pending','user','Y','2022-06-22 10:08:13','-','00100','443243223',4,'00100','00100',NULL,NULL,NULL),(11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','\0',NULL,NULL,NULL,'\0',0,1825600,1820000,285600,35700,NULL,'IT Equipments PO','4znfrCdHZAt%q4M','pending','user','Y','2022-06-22 10:52:52','-','Eos quae consequatu','Facere quos officiis',3,'Eos quae consequatu','Eos quae consequatu',NULL,NULL,NULL),(12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','\0',NULL,NULL,NULL,'\0',210,5320,5000,480,0,NULL,'Test PO','!2M02YneKFJZThP','pending','soaadmin','Y','2022-06-23 08:21:21','-','Dolor esse rerum min','Ipsum earum tempore',2,'569','Marny Willis',NULL,NULL,NULL),(13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','\0',NULL,NULL,NULL,'\0',0,2160,2000,160,20,NULL,'Test PO','ddAReRddjgOgoog','pending','soaadmin','Y','2022-06-23 08:56:16','-','Eos quae consequatu','Facere quos officiis',3,'206','Astra Travis',NULL,NULL,NULL),(14,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0','34234','','',NULL,NULL,NULL,'',350,8480,8000,800,0,NULL,'Purchase order','tFmXd%eUGbBG1v7','Approved','soaadmin','Y','2022-06-23 13:40:24','-','Dolor esse rerum min','Ipsum earum tempore',2,'569','Marny Willis','soaadmin',NULL,'2022-06-23 00:00:00'),(15,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','\0',NULL,NULL,NULL,'\0',10500,208000,200000,24000,0,NULL,'Service PO','5ItUiAuc3UpJjRX','pending','soaadmin','Y','2022-06-24 09:02:42','-','Dolor esse rerum min','Ipsum earum tempore',2,'569','Marny Willis',NULL,NULL,NULL),(16,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','\0',NULL,NULL,NULL,'\0',3500,108000,100000,8000,0,NULL,'Cleaning Services','#oNRXGnQV3rLV&#','pending','user','Y','2022-06-24 09:20:15','-','Dolor esse rerum min','Ipsum earum tempore',2,'569','Marny Willis',NULL,NULL,NULL),(17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,'\0','\0',NULL,NULL,NULL,'\0',9345,213500,213500,2640,0,NULL,'Ibrahim Test','rcpmQ2HO0#14M0w','pending','soaadmin','Y','2022-06-24 10:40:39','-','1232-342','0793422144',6,'3432324','Kelvin',NULL,NULL,NULL),(18,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0','54678','\0','',NULL,NULL,NULL,'',0,170004,170004,24000,3200.08,NULL,'Treatment Kits','zf@sUDCPmbdIED0','Approved','soaadmin','Y','2022-06-24 13:40:46','-','Veniam duis dolorem','Anim voluptas aute c',1,'820','Cameron Sandoval','soaadmin',NULL,'2022-06-24 00:00:00'),(19,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0','112323','\0','',NULL,NULL,NULL,'',500,31500,31000,2260,220,NULL,'PROCUREMENT OF LAN CABLES','6k1d6SP57cYrDgE','Approved','soaadmin','Y','2022-06-25 14:42:06','-','NAKURU','07266234786',7,'07266234786','Collins Kibet','soaadmin',NULL,'2022-06-25 00:00:00');
/*!40000 ALTER TABLE `purchase_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_privilege`
--

DROP TABLE IF EXISTS `role_privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_privilege` (
  `role_id` bigint(20) NOT NULL,
  `privilege_sn` bigint(20) NOT NULL,
  PRIMARY KEY (`role_id`,`privilege_sn`),
  KEY `FK97g3mnpbfnpofk6rpeg6sggvm` (`privilege_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_privilege`
--

LOCK TABLES `role_privilege` WRITE;
/*!40000 ALTER TABLE `role_privilege` DISABLE KEYS */;
INSERT INTO `role_privilege` VALUES (1,2);
/*!40000 ALTER TABLE `role_privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ofx66keruapi6vyqpv6f2or37` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'SUPER_ADMIN'),(2,'ROLE_ADMIN'),(3,'ROLE_USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockcategories`
--

DROP TABLE IF EXISTS `stockcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stockcategories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_description` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) NOT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockcategories`
--

LOCK TABLES `stockcategories` WRITE;
/*!40000 ALTER TABLE `stockcategories` DISABLE KEYS */;
INSERT INTO `stockcategories` VALUES (1,'TVs, Washing Machines, Cookers, Fridges, Air Conditioners, Electronics and more','Electronics',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending',NULL,NULL,NULL),(2,'Chairs, tables, booard room tbales, cabinets, wall units','Furnitures',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending',NULL,NULL,NULL),(3,'Dishes, cooking pots, cups, glasses','Utensils',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending',NULL,NULL,NULL),(4,'vehicles,  motorbikes, sallon cars','Automotives',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending',NULL,NULL,NULL),(5,'Designated geographical location','Land',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending',NULL,NULL,NULL),(6,'Desktops, keyboards, monitors, ALU\'s','Computer Accessories',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending',NULL,NULL,NULL);
/*!40000 ALTER TABLE `stockcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `subcategory_description` varchar(255) DEFAULT NULL,
  `subcategory_name` varchar(255) NOT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl65dyy5me2ypoyj8ou1hnt64e` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_category`
--

LOCK TABLES `sub_category` WRITE;
/*!40000 ALTER TABLE `sub_category` DISABLE KEYS */;
INSERT INTO `sub_category` VALUES (5,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending','Advertisement on tv','TV Advertisement',NULL,NULL,NULL,NULL),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending','Finacle service is important','Finacle',NULL,NULL,NULL,NULL),(9,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-25 14:18:52','-','pending','For all ','LAPTOPS',NULL,NULL,NULL,'soaadmin'),(4,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending','CEO needs electronics','Electronics',NULL,NULL,NULL,NULL),(6,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-23 07:11:45','-','pending','Facebook and twitter ads','Social media advertisement',NULL,NULL,NULL,'soaadmin'),(7,9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-23 13:16:48','-','pending','It is a tesy category','Test sub category',NULL,NULL,NULL,'soaadmin'),(8,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-24 08:32:35','-','pending','Radio ads are important','Radio ads',NULL,NULL,NULL,'soaadmin');
/*!40000 ALTER TABLE `sub_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `summary`
--

DROP TABLE IF EXISTS `summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `summary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gross_amount` varchar(255) DEFAULT NULL,
  `invoiceid` varchar(255) DEFAULT NULL,
  `item_count` varchar(255) DEFAULT NULL,
  `mode_code` varchar(255) DEFAULT NULL,
  `net_amount` varchar(255) DEFAULT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `tax_amount` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `summary`
--

LOCK TABLES `summary` WRITE;
/*!40000 ALTER TABLE `summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `partner_zip_postal_code` varchar(255) DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `supplier_account` varchar(255) DEFAULT NULL,
  `supplier_address` varchar(255) DEFAULT NULL,
  `supplier_bank` varchar(255) DEFAULT NULL,
  `supplier_contact` varchar(255) DEFAULT NULL,
  `supplier_email` varchar(255) DEFAULT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `supplier_number` varchar(255) DEFAULT NULL,
  `supplier_services` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'soaadmin',NULL,'2022-06-20 04:37:12','-','Approved','Ex cum elit quo har','Veniam duis dolorem','Cillum sint consequa','Anim voluptas aute c','gipicoso@mailinator.com','Cameron Sandoval','820','Goods','soaadmin',NULL,'2022-06-20 00:00:00'),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'soaadmin',NULL,'2022-06-20 08:16:57','-','Approved','Dolorem amet id ani','Dolor esse rerum min','Dolores necessitatib','Ipsum earum tempore','zazo@mailinator.com','Marny Willis','569','Services','soaadmin',NULL,'2022-06-21 00:00:00'),(3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'soaadmin',NULL,'2022-06-20 08:17:52','-','pending','Repudiandae sunt in ','Eos quae consequatu','Excepteur fugit bla','Facere quos officiis','wikawaweso@mailinator.com','Astra Travis','206','Goods',NULL,NULL,NULL),(4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'soaadmin',NULL,'2022-06-20 08:18:16','-','pending','At possimus quod pa','00100','Officiis suscipit di','443243223','zijuseriju@mailinator.com','Aileen Ferguson','286','Services',NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'user',NULL,'2022-06-22 02:56:23','-','pending','4748595944949','462 Mfangano Street','Equity','jillsupplie@gmail,com','jillrobbinson@gmail.com','Jilll Robbinson','0734562746','Goods/Services',NULL,NULL,NULL),(6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'soaadmin',NULL,'2022-06-23 07:12:10','-','Approved','32434KCB','1232-342','KCB','0793422144','kelvin@gmail.com','Kelvin','3432324','Services','soaadmin',NULL,'2022-06-23 00:00:00'),(7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending','777772329320232','NAKURU','KCB','07266234786','coullence@gmail.com','Collins Kibet','07266234786','SERVICES',NULL,NULL,NULL);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tax_details`
--

DROP TABLE IF EXISTS `tax_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tax_details` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `excise_currency` varchar(255) DEFAULT NULL,
  `excise_unit` varchar(255) DEFAULT NULL,
  `gross_amount` varchar(255) DEFAULT NULL,
  `invoiceid` varchar(255) DEFAULT NULL,
  `net_amount` varchar(255) DEFAULT NULL,
  `tax_amount` varchar(255) DEFAULT NULL,
  `tax_category_code` varchar(255) DEFAULT NULL,
  `tax_rate` varchar(255) DEFAULT NULL,
  `tax_rate_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tax_details`
--

LOCK TABLES `tax_details` WRITE;
/*!40000 ALTER TABLE `tax_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `tax_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taxes`
--

DROP TABLE IF EXISTS `taxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taxes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted_by` varchar(255) DEFAULT NULL,
  `deleted_flag` char(1) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_flag` char(1) DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `posted_flag` char(1) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `tax_account` varchar(255) NOT NULL,
  `tax_name` varchar(255) NOT NULL,
  `tax_type` varchar(255) DEFAULT NULL,
  `tax_value` double NOT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` char(1) DEFAULT NULL,
  `verified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxes`
--

LOCK TABLES `taxes` WRITE;
/*!40000 ALTER TABLE `taxes` DISABLE KEYS */;
INSERT INTO `taxes` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending','44322','VAT','Goods and Services',16,NULL,NULL,NULL),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending','45534332','VAT withholding','Goods and Services',2,NULL,NULL,NULL),(3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'-','pending','564343','Income withholding','Services',5,NULL,NULL,NULL);
/*!40000 ALTER TABLE `taxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `expense_account` varchar(255) DEFAULT NULL,
  `expense_name` varchar(255) DEFAULT NULL,
  `expense_type` varchar(255) DEFAULT NULL,
  `invoice_no` varchar(255) DEFAULT NULL,
  `iwt_account` varchar(255) DEFAULT NULL,
  `iwt_amount` double DEFAULT NULL,
  `po_id` varchar(255) DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  `posted_time` datetime DEFAULT NULL,
  `purchase_ordername` varchar(255) DEFAULT NULL,
  `supplier_account` varchar(255) DEFAULT NULL,
  `supplier_amount` double DEFAULT NULL,
  `supplier_id` varchar(255) DEFAULT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `total_beforetax` double DEFAULT NULL,
  `transaction_code` varchar(255) NOT NULL,
  `vat_account` varchar(255) DEFAULT NULL,
  `vat_amount` double DEFAULT NULL,
  `vat_paid` double DEFAULT NULL,
  `vat_recieved` double DEFAULT NULL,
  `income_wth_paid` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_gyh6k86an5b56kbl0e7qngoxg` (`transaction_code`) USING HASH
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (2);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `sn` bigint(20) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `delete_flag` varchar(255) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `first_login` char(1) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `locked` bit(1) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `sol_code` varchar(5) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `verified_flag` varchar(255) DEFAULT NULL,
  `verified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`sn`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2022-06-20 04:29:36','N','no-reply@emtechhouse.co.ke','Y','N/A','','\0','N/A','N/A','2022-06-20 04:29:36','$2a$10$GRa3hWWjOkxcEa3.mfh6H.Yv407k6tOYXkaIak3JwMrbShHBzbRIy','N/A','SYS','SUADMIN',NULL,'Y',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-25 12:04:54

-- Progettazione Web 
DROP DATABASE if exists zombies; 
CREATE DATABASE zombies; 
USE zombies; 
-- MySQL dump 10.13  Distrib 5.6.20, for Win32 (x86)
--
-- Host: localhost    Database: zombies
-- ------------------------------------------------------
-- Server version	5.6.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(10) NOT NULL,
  `score` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_user` (`user`),
  CONSTRAINT `FK_user` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES 
(11,'Tommaso',1000,'2019-08-10 11:46:19'),
(12,'Tommaso',750,'2019-08-10 11:48:06'),
(13,'Tommaso',500,'2019-08-10 11:48:41'),
(14,'Alessandro',750,'2019-08-10 14:43:41'),
(15,'Alessandro',620,'2019-08-10 14:45:01'),
(16,'Alessandro',490,'2019-08-10 14:46:04'),
(17,'Filippo',800,'2019-08-10 14:47:18'),
(18,'Filippo',650,'2019-08-10 14:58:42'),
(19,'Filippo',400,'2019-08-10 14:59:22'),
(20,'Iacopo',830,'2019-08-10 14:59:41'),
(21,'Iacopo',830,'2019-08-10 15:00:07'),
(22,'Iacopo',830,'2019-08-10 15:00:33'),
(116,'ayoub',1590,'2019-09-21 12:29:19'),
(117,'ayoub',5,'2019-09-21 14:06:13'),
(118,'iacopo',905,'2019-09-21 14:21:47'),
(119,'alessandro',820,'2019-09-21 14:32:03');
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_scores` AFTER INSERT ON `scores` FOR EACH ROW BEGIN
DECLARE old_highscore INT;

SELECT highscore
INTO old_highscore
FROM users
WHERE username = new.user;

IF new.score > old_highscore THEN
	UPDATE users
	SET highscore = new.score
	WHERE username = new.user;
END IF;

UPDATE users
SET avgscore = (
	SELECT FLOOR(AVG(score))
    FROM scores
    WHERE user = new.user)
WHERE username = new.user;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` char(60) NOT NULL,
  `highscore` int(11) NOT NULL DEFAULT '0',
  `avgscore` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Alessandro','prova1@gmail.com','$2y$10$SkSep3nMkht4SZepAJwph.DWTsW5mm2eXp.GKOC83yDYRoPfzmRCW',820,670),('ayoub','ayoub@gmail.com','$2y$10$RHnLXm8tdnl7zxoXUPOf7eKrio9//zCsBTGWOdS1nOHM0uwb44xw2',1590,797),('Filippo','prova2@gmail.it','$2y$10$Xg1asmjBR2U00Ay10ifPN./.Ux7cM7S23Y9hIdoxnhVHBgeYNKOb6',800,650),('Iacopo','prova3@gmail.com','$2y$10$OgvheGrm/29XY39UEeqD1.7mKrRxywPjP9m96BxELbCHLGzLAWVTK',905,848),('Tommaso','prova@gmail.com','$2y$10$wlxubYDxeJWTuYeiCZc6zOjO0Wc17VVmdIn/134pxLbg6Lp4RI8EC',1000,750);
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

-- Dump completed on 2019-09-21 17:00:48

-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: odet
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

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
-- Table structure for table `ascents`
--

DROP TABLE IF EXISTS `ascents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ascents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ascents`
--

LOCK TABLES `ascents` WRITE;
/*!40000 ALTER TABLE `ascents` DISABLE KEYS */;
INSERT INTO `ascents` VALUES (1,'Puntos','2022-04-12 19:43:03','2022-04-12 19:43:03');
/*!40000 ALTER TABLE `ascents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avatars`
--

DROP TABLE IF EXISTS `avatars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avatars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatars`
--

LOCK TABLES `avatars` WRITE;
/*!40000 ALTER TABLE `avatars` DISABLE KEYS */;
INSERT INTO `avatars` VALUES (1,'default.png','2022-04-12 19:43:03','2022-04-12 19:43:03');
/*!40000 ALTER TABLE `avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `awardstatistics`
--

DROP TABLE IF EXISTS `awardstatistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `awardstatistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bestPlayer` int(11) DEFAULT NULL,
  `bestScorer` int(11) DEFAULT NULL,
  `bestGoalAssist` int(11) DEFAULT NULL,
  `bestGoalKeeper` int(11) DEFAULT NULL,
  `tournamentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bestPlayer` (`bestPlayer`),
  KEY `bestScorer` (`bestScorer`),
  CONSTRAINT `awardstatistics_ibfk_1` FOREIGN KEY (`bestPlayer`) REFERENCES `users` (`id`),
  CONSTRAINT `awardstatistics_ibfk_2` FOREIGN KEY (`bestScorer`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `awardstatistics`
--

LOCK TABLES `awardstatistics` WRITE;
/*!40000 ALTER TABLE `awardstatistics` DISABLE KEYS */;
INSERT INTO `awardstatistics` VALUES (1,2,1,1,NULL,NULL,'2022-04-16 03:33:49','2022-04-16 03:33:49');
/*!40000 ALTER TABLE `awardstatistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `controlteamcups`
--

DROP TABLE IF EXISTS `controlteamcups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `controlteamcups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team` varchar(255) DEFAULT NULL,
  `cupId` int(11) DEFAULT NULL,
  `eliminated` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `controlteamcups`
--

LOCK TABLES `controlteamcups` WRITE;
/*!40000 ALTER TABLE `controlteamcups` DISABLE KEYS */;
/*!40000 ALTER TABLE `controlteamcups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cups`
--

DROP TABLE IF EXISTS `cups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `initialFaseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cups`
--

LOCK TABLES `cups` WRITE;
/*!40000 ALTER TABLE `cups` DISABLE KEYS */;
/*!40000 ALTER TABLE `cups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `declines`
--

DROP TABLE IF EXISTS `declines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `declines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `declines`
--

LOCK TABLES `declines` WRITE;
/*!40000 ALTER TABLE `declines` DISABLE KEYS */;
INSERT INTO `declines` VALUES (1,'Puntos','2022-04-12 19:43:03','2022-04-12 19:43:03');
/*!40000 ALTER TABLE `declines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisioncontrols`
--

DROP TABLE IF EXISTS `divisioncontrols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `divisioncontrols` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tournamentDivisions` int(11) DEFAULT NULL,
  `divisionsCreated` int(11) DEFAULT NULL,
  `tournamentId` int(11) DEFAULT NULL,
  `tournamentCompleted` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tournamentId` (`tournamentId`),
  CONSTRAINT `divisioncontrols_ibfk_1` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisioncontrols`
--

LOCK TABLES `divisioncontrols` WRITE;
/*!40000 ALTER TABLE `divisioncontrols` DISABLE KEYS */;
INSERT INTO `divisioncontrols` VALUES (3,4,4,3,1,'2022-04-12 20:11:02','2022-04-15 01:32:24'),(4,2,2,4,1,'2022-04-13 19:50:08','2022-04-15 01:31:32');
/*!40000 ALTER TABLE `divisioncontrols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisions`
--

DROP TABLE IF EXISTS `divisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `divisions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `tournamentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tournamentId` (`tournamentId`),
  CONSTRAINT `divisions_ibfk_1` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisions`
--

LOCK TABLES `divisions` WRITE;
/*!40000 ALTER TABLE `divisions` DISABLE KEYS */;
INSERT INTO `divisions` VALUES (6,'div 4',3,'2022-04-12 20:12:23','2022-04-15 02:00:47'),(7,'Nueva division',4,'2022-04-13 19:51:15','2022-04-13 19:51:15'),(8,'otra div',4,'2022-04-13 19:51:21','2022-04-13 19:51:21'),(11,'Nuevo torneo div',4,'2022-04-15 01:31:32','2022-04-15 01:31:32'),(12,'div 1',3,'2022-04-15 01:31:42','2022-04-15 01:31:42'),(13,'div 4',3,'2022-04-15 01:32:12','2022-04-15 01:32:12'),(14,'1111',3,'2022-04-15 01:32:24','2022-04-15 01:32:24');
/*!40000 ALTER TABLE `divisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fasecups`
--

DROP TABLE IF EXISTS `fasecups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fasecups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fasecups`
--

LOCK TABLES `fasecups` WRITE;
/*!40000 ALTER TABLE `fasecups` DISABLE KEYS */;
/*!40000 ALTER TABLE `fasecups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `rivalTeamId` int(11) DEFAULT NULL,
  `goalsCount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `rivalTeamId` (`rivalTeamId`),
  CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `goals_ibfk_2` FOREIGN KEY (`rivalTeamId`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goals`
--

LOCK TABLES `goals` WRITE;
/*!40000 ALTER TABLE `goals` DISABLE KEYS */;
/*!40000 ALTER TABLE `goals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchweeks`
--

DROP TABLE IF EXISTS `matchweeks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matchweeks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `localTeamId` int(11) DEFAULT NULL,
  `visitedTeamId` int(11) DEFAULT NULL,
  `tournamentId` int(11) DEFAULT NULL,
  `divisionId` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `localTeamId` (`localTeamId`),
  KEY `visitedTeamId` (`visitedTeamId`),
  KEY `tournamentId` (`tournamentId`),
  KEY `divisionId` (`divisionId`),
  CONSTRAINT `matchweeks_ibfk_1` FOREIGN KEY (`localTeamId`) REFERENCES `teams` (`id`),
  CONSTRAINT `matchweeks_ibfk_2` FOREIGN KEY (`visitedTeamId`) REFERENCES `teams` (`id`),
  CONSTRAINT `matchweeks_ibfk_3` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments` (`id`),
  CONSTRAINT `matchweeks_ibfk_4` FOREIGN KEY (`divisionId`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchweeks`
--

LOCK TABLES `matchweeks` WRITE;
/*!40000 ALTER TABLE `matchweeks` DISABLE KEYS */;
/*!40000 ALTER TABLE `matchweeks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `authorId` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goals` int(11) DEFAULT NULL,
  `suspensionId` int(11) DEFAULT NULL,
  `teamId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `teamConfirm` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `suspensionId` (`suspensionId`),
  KEY `teamId` (`teamId`),
  KEY `userId` (`userId`),
  CONSTRAINT `players_ibfk_1` FOREIGN KEY (`suspensionId`) REFERENCES `suspensions` (`id`),
  CONSTRAINT `players_ibfk_2` FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`),
  CONSTRAINT `players_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,10,NULL,1,1,NULL,'2022-04-12 19:43:03','2022-04-12 19:43:03'),(2,10,NULL,1,2,NULL,'2022-04-12 19:43:03','2022-04-12 19:43:03');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rols` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'Admin','2022-04-12 19:43:03','2022-04-12 19:43:03'),(2,'Player','2022-04-12 19:43:03','2022-04-12 19:43:03'),(3,'Referee','2022-04-12 19:43:03','2022-04-12 19:43:03');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20220318184801-create-avatar.js'),('20220318184807-create-rol.js'),('20220318184814-create-user.js'),('20220318184825-create-ascent.js'),('20220318184832-create-decline.js'),('20220318184839-create-type-tournament.js'),('20220318184848-create-tournament.js'),('20220318184912-create-division.js'),('20220318184918-create-team.js'),('20220318184924-create-goal.js'),('20220318184931-create-matchweek.js'),('20220318184938-create-suspension.js'),('20220318185005-create-player.js'),('20220318185022-create-statistic.js'),('20220318185029-create-report.js'),('20220318185037-create-news.js'),('20220411024318-create-division-control.js'),('20220416010718-create-fase-cup.js'),('20220416010724-create-cup.js'),('20220416010730-create-control-team-cup.js'),('20220416010740-create-award-statistics.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teamId` int(11) DEFAULT NULL,
  `played` int(11) DEFAULT NULL,
  `win` int(11) DEFAULT NULL,
  `drawn` int(11) DEFAULT NULL,
  `lost` int(11) DEFAULT NULL,
  `gf` int(11) DEFAULT NULL,
  `ga` int(11) DEFAULT NULL,
  `gd` int(11) DEFAULT NULL,
  `pts` int(11) DEFAULT NULL,
  `tournamentId` int(11) DEFAULT NULL,
  `divisionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teamId` (`teamId`),
  KEY `tournamentId` (`tournamentId`),
  KEY `divisionId` (`divisionId`),
  CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`),
  CONSTRAINT `statistics_ibfk_2` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments` (`id`),
  CONSTRAINT `statistics_ibfk_3` FOREIGN KEY (`divisionId`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suspensions`
--

DROP TABLE IF EXISTS `suspensions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suspensions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `matchTime` datetime DEFAULT NULL,
  `matchId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `matchId` (`matchId`),
  CONSTRAINT `suspensions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `suspensions_ibfk_2` FOREIGN KEY (`matchId`) REFERENCES `matchweeks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suspensions`
--

LOCK TABLES `suspensions` WRITE;
/*!40000 ALTER TABLE `suspensions` DISABLE KEYS */;
/*!40000 ALTER TABLE `suspensions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `avatarId` int(11) DEFAULT NULL,
  `captainId` int(11) DEFAULT NULL,
  `tournamentId` int(11) DEFAULT NULL,
  `divisionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `avatarId` (`avatarId`),
  KEY `captainId` (`captainId`),
  KEY `tournamentId` (`tournamentId`),
  KEY `divisionId` (`divisionId`),
  CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`avatarId`) REFERENCES `avatars` (`id`),
  CONSTRAINT `teams_ibfk_2` FOREIGN KEY (`captainId`) REFERENCES `users` (`id`),
  CONSTRAINT `teams_ibfk_3` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments` (`id`),
  CONSTRAINT `teams_ibfk_4` FOREIGN KEY (`divisionId`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Team odet',1,1,NULL,NULL,'2022-04-12 19:43:03','2022-04-12 19:43:03'),(2,'Team rival',1,1,NULL,NULL,'2022-04-12 19:43:03','2022-04-12 19:43:03');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournaments`
--

DROP TABLE IF EXISTS `tournaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `divisions` int(11) DEFAULT NULL,
  `ascentId` int(11) DEFAULT NULL,
  `declineId` int(11) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ascentId` (`ascentId`),
  KEY `declineId` (`declineId`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `tournaments_ibfk_1` FOREIGN KEY (`ascentId`) REFERENCES `ascents` (`id`),
  CONSTRAINT `tournaments_ibfk_2` FOREIGN KEY (`declineId`) REFERENCES `declines` (`id`),
  CONSTRAINT `tournaments_ibfk_3` FOREIGN KEY (`typeId`) REFERENCES `typetournaments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournaments`
--

LOCK TABLES `tournaments` WRITE;
/*!40000 ALTER TABLE `tournaments` DISABLE KEYS */;
INSERT INTO `tournaments` VALUES (3,'torneo prueba3',4,1,1,'2018-11-20','2022-09-09',1,'2022-04-12 20:11:02','2022-04-12 20:37:10'),(4,'Nuevo torneo',2,1,1,'2022-04-13','2023-01-08',1,'2022-04-13 19:50:08','2022-04-13 19:50:08');
/*!40000 ALTER TABLE `tournaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typetournaments`
--

DROP TABLE IF EXISTS `typetournaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `typetournaments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typetournaments`
--

LOCK TABLES `typetournaments` WRITE;
/*!40000 ALTER TABLE `typetournaments` DISABLE KEYS */;
INSERT INTO `typetournaments` VALUES (1,'Liga','2022-04-12 19:43:03','2022-04-12 19:43:03'),(2,'Copa','2022-04-12 19:43:03','2022-04-12 19:43:03');
/*!40000 ALTER TABLE `typetournaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `avatarId` int(11) DEFAULT NULL,
  `rolId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `avatarId` (`avatarId`),
  KEY `rolId` (`rolId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`avatarId`) REFERENCES `avatars` (`id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','Admin','Odet','admin@odet.com','$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',1,1,'2022-04-12 19:43:03','2022-04-12 19:43:03'),(2,'player','Player','Odet','player@odet.com','$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',1,2,'2022-04-12 19:43:03','2022-04-12 19:43:03'),(3,'referee','Referee','Odet','referee@odet.com','$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',1,3,'2022-04-12 19:43:03','2022-04-12 19:43:03');
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

-- Dump completed on 2022-04-16 20:35:07

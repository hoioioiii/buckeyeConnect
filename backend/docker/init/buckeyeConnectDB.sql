-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: buckeyeconnect
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `ID` int NOT NULL,
  `ACTIVITY_TYPE` int DEFAULT NULL,
  `CLUB_ID` int DEFAULT NULL,
  `MAJOR_ID` int DEFAULT NULL,
  `LOCATION` text,
  `MAX_SPOTS` int DEFAULT NULL,
  `TITLE` text,
  `DESCRIPTION` text,
  `RECURRING` tinyint(1) DEFAULT NULL,
  `RECURRING_ID` int DEFAULT NULL,
  `START_TIME` timestamp NULL DEFAULT NULL,
  `END_TIME` timestamp NULL DEFAULT NULL,
  `CREATED_ON` datetime DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `CREATED_BY` int DEFAULT NULL,
  `FILLED_SPOTS` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ACTIVITY_TYPE` (`ACTIVITY_TYPE`),
  KEY `CLUB_ID` (`CLUB_ID`),
  KEY `MAJOR_ID` (`MAJOR_ID`),
  CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`ACTIVITY_TYPE`) REFERENCES `activity_type_keys` (`ID`),
  CONSTRAINT `activities_ibfk_2` FOREIGN KEY (`CLUB_ID`) REFERENCES `club_type_keys` (`ID`),
  CONSTRAINT `activities_ibfk_3` FOREIGN KEY (`MAJOR_ID`) REFERENCES `major` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activities_tags`
--

DROP TABLE IF EXISTS `activities_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities_tags` (
  `ID` int NOT NULL,
  `ACTIVITIES_ID` int DEFAULT NULL,
  `TAG_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities_tags`
--

LOCK TABLES `activities_tags` WRITE;
/*!40000 ALTER TABLE `activities_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `activities_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_type_keys`
--

DROP TABLE IF EXISTS `activity_type_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_type_keys` (
  `ID` int NOT NULL,
  `KEY` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_type_keys`
--

LOCK TABLES `activity_type_keys` WRITE;
/*!40000 ALTER TABLE `activity_type_keys` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity_type_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club_type_keys`
--

DROP TABLE IF EXISTS `club_type_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club_type_keys` (
  `ID` int NOT NULL,
  `KEY` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_type_keys`
--

LOCK TABLES `club_type_keys` WRITE;
/*!40000 ALTER TABLE `club_type_keys` DISABLE KEYS */;
/*!40000 ALTER TABLE `club_type_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dist_key`
--

DROP TABLE IF EXISTS `dist_key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dist_key` (
  `ID` int NOT NULL,
  `KEY` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dist_key`
--

LOCK TABLES `dist_key` WRITE;
/*!40000 ALTER TABLE `dist_key` DISABLE KEYS */;
/*!40000 ALTER TABLE `dist_key` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major`
--

DROP TABLE IF EXISTS `major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `major` (
  `ID` int NOT NULL,
  `KEY` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major`
--

LOCK TABLES `major` WRITE;
/*!40000 ALTER TABLE `major` DISABLE KEYS */;
/*!40000 ALTER TABLE `major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferences` (
  `ID` int NOT NULL,
  `PROFILE_ID` int DEFAULT NULL,
  `DIST_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preferences`
--

LOCK TABLES `preferences` WRITE;
/*!40000 ALTER TABLE `preferences` DISABLE KEYS */;
/*!40000 ALTER TABLE `preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_tags`
--

DROP TABLE IF EXISTS `profile_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_tags` (
  `ID` int NOT NULL,
  `PROFILE_ID` int DEFAULT NULL,
  `TAG_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_tags`
--

LOCK TABLES `profile_tags` WRITE;
/*!40000 ALTER TABLE `profile_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `ID` int NOT NULL,
  `NAME` text,
  `MAJOR` int DEFAULT NULL,
  `YEAR` int DEFAULT NULL,
  `BIO` text,
  `ENABLE_LOCATION` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recurring`
--

DROP TABLE IF EXISTS `recurring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recurring` (
  `ID` int NOT NULL,
  `PATTERN` int DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `SUNDAY` tinyint(1) DEFAULT NULL,
  `MONDAY` tinyint(1) DEFAULT NULL,
  `TUESDAY` tinyint(1) DEFAULT NULL,
  `WEDNSDAY` tinyint(1) DEFAULT NULL,
  `THURSDAY` tinyint(1) DEFAULT NULL,
  `FRIDAY` tinyint(1) DEFAULT NULL,
  `SATURDAY` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recurring`
--

LOCK TABLES `recurring` WRITE;
/*!40000 ALTER TABLE `recurring` DISABLE KEYS */;
/*!40000 ALTER TABLE `recurring` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reoccurance_keys`
--

DROP TABLE IF EXISTS `reoccurance_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reoccurance_keys` (
  `ID` int NOT NULL,
  `KEY` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reoccurance_keys`
--

LOCK TABLES `reoccurance_keys` WRITE;
/*!40000 ALTER TABLE `reoccurance_keys` DISABLE KEYS */;
/*!40000 ALTER TABLE `reoccurance_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_activities`
--

DROP TABLE IF EXISTS `student_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_activities` (
  `ID` int NOT NULL,
  `PROFILE_ID` int DEFAULT NULL,
  `ACTIVITIES_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_activities`
--

LOCK TABLES `student_activities` WRITE;
/*!40000 ALTER TABLE `student_activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_keys`
--

DROP TABLE IF EXISTS `tag_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_keys` (
  `ID` int NOT NULL,
  `KEY` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_keys`
--

LOCK TABLES `tag_keys` WRITE;
/*!40000 ALTER TABLE `tag_keys` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags_data`
--

DROP TABLE IF EXISTS `tags_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags_data` (
  `ID` int NOT NULL,
  `KEY_ID` int DEFAULT NULL,
  `KEY_VALUE` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags_data`
--

LOCK TABLES `tags_data` WRITE;
/*!40000 ALTER TABLE `tags_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `year`
--

DROP TABLE IF EXISTS `year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `year` (
  `ID` int NOT NULL,
  `KEY` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `year`
--

LOCK TABLES `year` WRITE;
/*!40000 ALTER TABLE `year` DISABLE KEYS */;
/*!40000 ALTER TABLE `year` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-12 23:03:42

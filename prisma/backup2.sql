-- MySQL dump 10.13  Distrib 9.0.1, for macos14.7 (arm64)
--
-- Host: localhost    Database: a_passion_db
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('7bff1ea5-0e03-40de-b3b9-7d4d6bf45f95','07aaf2348ce8a15ac60d10790b6fedad72aad3801cadf76f6ee042cc4262a024','2024-12-16 17:15:27.225','20241216171526_change_all_rewrite_db',NULL,NULL,'2024-12-16 17:15:26.851',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_TestParticipants`
--

DROP TABLE IF EXISTS `_TestParticipants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_TestParticipants` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_TestParticipants_AB_unique` (`A`,`B`),
  KEY `_TestParticipants_B_index` (`B`),
  CONSTRAINT `_TestParticipants_A_fkey` FOREIGN KEY (`A`) REFERENCES `Test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_TestParticipants_B_fkey` FOREIGN KEY (`B`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_TestParticipants`
--

LOCK TABLES `_TestParticipants` WRITE;
/*!40000 ALTER TABLE `_TestParticipants` DISABLE KEYS */;
/*!40000 ALTER TABLE `_TestParticipants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_UserConversations`
--

DROP TABLE IF EXISTS `_UserConversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_UserConversations` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_UserConversations_AB_unique` (`A`,`B`),
  KEY `_UserConversations_B_index` (`B`),
  CONSTRAINT `_UserConversations_A_fkey` FOREIGN KEY (`A`) REFERENCES `Conversation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_UserConversations_B_fkey` FOREIGN KEY (`B`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_UserConversations`
--

LOCK TABLES `_UserConversations` WRITE;
/*!40000 ALTER TABLE `_UserConversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `_UserConversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssistantLog`
--

DROP TABLE IF EXISTS `AssistantLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssistantLog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requestId` int NOT NULL,
  `logMessage` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `AssistantLog_requestId_fkey` (`requestId`),
  CONSTRAINT `AssistantLog_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `AssistantRequest` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssistantLog`
--

LOCK TABLES `AssistantLog` WRITE;
/*!40000 ALTER TABLE `AssistantLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `AssistantLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssistantRequest`
--

DROP TABLE IF EXISTS `AssistantRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssistantRequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `request` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `response` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `AssistantRequest_userId_fkey` (`userId`),
  CONSTRAINT `AssistantRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssistantRequest`
--

LOCK TABLES `AssistantRequest` WRITE;
/*!40000 ALTER TABLE `AssistantRequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `AssistantRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Blog`
--

DROP TABLE IF EXISTS `Blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorId` int NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Blog_authorId_fkey` (`authorId`),
  CONSTRAINT `Blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Blog`
--

LOCK TABLES `Blog` WRITE;
/*!40000 ALTER TABLE `Blog` DISABLE KEYS */;
/*!40000 ALTER TABLE `Blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Cart_userId_fkey` (`userId`),
  KEY `Cart_courseId_fkey` (`courseId`),
  CONSTRAINT `Cart_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
INSERT INTO `Cart` VALUES (3,1,9,1,'2024-12-18 04:20:31.019','2024-12-20 11:07:23.209'),(4,1,12,1,'2024-12-18 04:29:26.465','2024-12-19 12:00:15.098'),(5,1,13,1,'2024-12-18 04:29:35.902','2024-12-20 12:08:55.660'),(6,1,17,1,'2024-12-18 04:29:41.685','2024-12-18 11:46:41.190'),(7,1,11,1,'2024-12-19 12:00:05.152','2024-12-19 12:00:05.152');
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Category_parentId_fkey` (`parentId`),
  CONSTRAINT `Category_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'Reading',NULL),(2,'Listening',NULL),(3,'Writing',NULL),(4,'Speaking',NULL),(6,'Sing a song',4);
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Conversation`
--

DROP TABLE IF EXISTS `Conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Conversation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Conversation_createdAt_fkey` (`createdAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Conversation`
--

LOCK TABLES `Conversation` WRITE;
/*!40000 ALTER TABLE `Conversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Course`
--

DROP TABLE IF EXISTS `Course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `objectives` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `price` int NOT NULL,
  `newPrice` int DEFAULT NULL,
  `thumbnail` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryId` int NOT NULL DEFAULT '1',
  `creatorId` int NOT NULL,
  `teacherId` int DEFAULT NULL,
  `createdAt` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) DEFAULT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Course_teacherId_fkey` (`teacherId`),
  KEY `Course_creatorId_fkey` (`creatorId`),
  KEY `Course_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Course_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Course_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Course_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Course`
--

LOCK TABLES `Course` WRITE;
/*!40000 ALTER TABLE `Course` DISABLE KEYS */;
INSERT INTO `Course` VALUES (1,'English Foundation Course: Grammar and Speaking Upgrade','Become fluent by improving all your English Skills. Build a strong English foundation in grammar, speaking, and more!','Learn in-demand skills from university and industry experts. Master a subject or tool with hands-on projects. Develop a deep understanding of key concepts. Earn a career certificate from Georgia Institute of Technology.',99000,29000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733505839/a_yya234.jpg','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',3,1,1,'2024-12-17 03:36:45.032','2024-12-17 03:57:31.403',1,0),(7,'The Complete English Language Course Improve Spoken English','Master the English Language - Learn English Grammar English Conversation English Pronunciation Spoken English!','A detailed and thorough knowledge of English language and grammar. To understand English easier. To speak and write English with MORE confidence. Get answers to all your English language questions from someone who ACTUALLY teaches the language.',449000,299000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507386/h_nnvrvm.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',1,1,1,'2024-12-17 03:38:33.858','2024-12-17 03:37:09.352',1,0),(8,'Master English Grammar - Advanced Level','English Language skills for IELTS, CAE, and CPE. Downloadable 180-page ebook with images included. Essays checked!','Gain an advanced knowledge of complex English sentences. Improve your understanding of typical mistakes that must be avoided. Identify and use different tenses in passive and active forms. Identify and use different conditionals in a variety of complex forms. Identify and use reporting verbs in a variety of complex forms. Identify and use subjunctive and inversion in a variety of complex forms.',899000,499000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/d_zvkqlw.jpg','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',4,1,1,'2024-12-17 03:40:09.293','2024-12-17 03:57:31.403',1,0),(9,'Complete English Course: Master English Beginner to Advanced','Learn how to have a natural conversation FAST from a native English speaker!','Detailed understanding of English grammar. 1000+ vocabulary words. How to make appointments and plans. Describing your favorite books and films. Advanced reading and speaking skills. Conversational English to sound like a native.',599000,99000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/e_dbq8wh.webp','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/e_dbq8wh.webp',3,1,1,'2024-12-17 03:45:51.902','2024-12-17 03:57:31.403',1,0),(10,'IELTS Band 8: IELTS Listening Mastery | IELTS Tenses','IELTS boost: IELTS Listening, IELTS Tenses course in grammar, speaking, and more!','Different types of questions in the IELTS Listening Section. Develop the skill of being able to recognize Synonym Language / Paraphrasing. Learn all about the 12 tenses in English Grammar to improve your Grammar Range and Accuracy. Learn how to learn vocabulary.',1399000,600000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507376/l_f3uxj6.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',2,1,1,'2024-12-17 03:47:29.717','2024-12-17 03:57:31.403',1,0),(11,'2024 NEW!! Complete IELTS Academic Preparation to achieve 7+','The best IELTS strategies & tips to learn, practice & prepare for success in Listening, Reading, Writing, Speaking','Pass the IELTS test with 7 or above in all modules by focusing only on what\\\'s important. Master the most important and effective IELTS strategies, tips, and techniques for an easy road to IELTS success. IELTS LISTENING - Practice listening techniques and predict answers for a higher rate of success. IELTS READING - Master the simple tips to get through reading passages faster and to spot the right answers. IELTS WRITING - Learn complete essay structures & practice vocabulary and grammar that will prepare you for any IELTS writing topic. IELTS SPEAKING - Prepare to give extended answers on a wide range of speaking topics with confidence.',499000,99000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507379/i_vjmn9g.png','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507379/i_vjmn9g.png',1,1,1,'2024-12-17 03:49:42.317','2024-12-17 03:47:51.075',1,0),(12,'Intensive English Mastery Course: Animated Beginner’s Course','Intensive English course. 77 Hours of English language speaking, English listening practice. Animated Cartoons!','You will learn over 1000 vital English words, expressions and idioms, and how to use them in real life. You will learn the most important English grammar with tons of English-speaking practice. You will learn to think in English and to speak English fluently. (in Intermediate level) You will learn to read in English and to spell English words intuitively. You will learn to understand movies and TV shows in English. After the course, you can travel the world freely, without a language barrier. After the course, you can start preparing for English language tests like TOEFL, IELTS, GMAT etc.',2199000,1599000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507375/g_bjw4ik.png','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507375/g_bjw4ik.png',6,1,1,'2024-12-17 03:51:17.651','2024-12-17 03:57:31.403',1,0),(13,'The English Master Course: English Grammar, English Speaking','A Complete English Language Course: English Grammar, Speaking, Pronunciation, and Writing. British and American English','LEARN EVERYTHING about English grammar, English speaking, English writing and English pronunciation. Master the English Language. FULL ENGLISH GRAMMAR SECTION covering over 90 English grammar topics. Master English grammar from beginner to advanced. FULL ENGLISH SPEAKING SECTION teaching you to speak like a native speaker and improve your fluency. FULL ENGLISH PRONUNCIATION and ACCENT TRAINING SECTION: Build your own American or British accent. FULL ENGLISH WRITING and PUNCTUATION SECTION: Write English like a professional. IMPROVE YOUR SCORES for English exams like A1, A2, B1, B2, C1, TOEFL, IELTS, and TOEIC. USE PERFECT ENGLISH grammar in real conversations. SPEAK LIKE A NATIVE ENGLISH SPEAKER: You will learn to speak about over 27 different daily topics. HUNDREDS of INTERACTIVE QUIZZES for IELTS, TOEIC, TOEFL, and more. With new quizzes added every month. UPGRADE your English speaking, English listening, English writing, and English pronunciation with an American professor.',1699000,999000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/b_hrvenm.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',4,1,1,'2024-12-17 03:53:39.550','2024-12-17 03:51:55.202',1,0),(14,'Advanced English Vocabulary','500 High-Level Words/Phrases to take your English to the NEXT LEVEL!','500 Advanced English Vocabulary words and phrases. English listening and speaking skills through our specially designed course. 2500 high-level English collocations to make your English more natural. 2000 synonyms and antonyms to build your wider English vocabulary. 500 example sentences to improve your English grammar.',199000,49000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733506929/c_nbc3p4.jpg','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',3,1,1,'2024-12-17 03:54:52.755','2024-12-17 03:59:41.897',1,0),(17,'Building Your English Brain','Learn to start thinking in English so that you can stop translating in your head and become fluent in English faster!','Form thoughts in English. Speak English easily without translating. Express ideas creatively, rather than using set phrases. Use new English vocabulary and phrases with confidence. Connect and speak about abstract ideas. Follow a routine to build excellent habits.',1190000,349000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507380/k_qh2moc.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',1,1,1,'2024-12-17 03:57:31.403','2024-12-17 03:54:57.428',1,0);
/*!40000 ALTER TABLE `Course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Enrollment`
--

DROP TABLE IF EXISTS `Enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Enrollment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  `enrolledAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Enrollment_courseId_fkey` (`courseId`),
  KEY `Enrollment_userId_fkey` (`userId`),
  CONSTRAINT `Enrollment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Enrollment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enrollment`
--

LOCK TABLES `Enrollment` WRITE;
/*!40000 ALTER TABLE `Enrollment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ForumPost`
--

DROP TABLE IF EXISTS `ForumPost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ForumPost` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `threadId` int NOT NULL,
  `authorId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ForumPost_threadId_fkey` (`threadId`),
  KEY `ForumPost_authorId_fkey` (`authorId`),
  CONSTRAINT `ForumPost_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ForumPost_threadId_fkey` FOREIGN KEY (`threadId`) REFERENCES `ForumThread` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ForumPost`
--

LOCK TABLES `ForumPost` WRITE;
/*!40000 ALTER TABLE `ForumPost` DISABLE KEYS */;
INSERT INTO `ForumPost` VALUES (1,'Sang nay an gi?',1,1,'2024-12-17 07:58:14.277','2024-12-17 07:58:14.277'),(2,'Trua nay an gi?',2,1,'2024-12-17 07:58:24.892','2024-12-17 07:58:24.892'),(3,'Toi nay an gi? ',3,1,'2024-12-17 07:58:32.118','2024-12-17 07:58:32.118'),(4,'An dem co tot khong? ',4,1,'2024-12-17 07:58:41.747','2024-12-17 07:58:41.747'),(5,'Đảo Sip thuộc châu Á hay châu Âu?',1,1,'2024-12-17 08:30:21.227','2024-12-17 08:30:21.227'),(6,'Lục địa nào được phát hiện gần đây nhất?',2,1,'2024-12-17 08:30:27.621','2024-12-17 08:30:27.621'),(7,'Quốc gia nào nhỏ nhất thế giới về diện tích?',3,1,'2024-12-17 08:30:33.823','2024-12-17 08:30:33.823'),(8,'Thành phố châu Âu nào được gọi là thành phố vĩnh cửu?',4,1,'2024-12-17 08:30:41.447','2024-12-17 08:30:41.447'),(9,'Vĩ tuyến 38 chia bán đảo nào làm đôi và cho biết tên của hai quốc gia hình thành?',1,1,'2024-12-17 08:30:48.736','2024-12-17 08:30:48.736'),(10,'Đảo Korsika (Cooc) thuộc nước nào?',2,1,'2024-12-17 08:30:55.720','2024-12-17 08:30:55.720'),(11,'Cảng nào lớn nhất Đông Á?',3,1,'2024-12-17 08:31:02.162','2024-12-17 08:31:02.162'),(12,'Hồ nội địa nào sâu nhất thế giới?',4,1,'2024-12-17 08:31:08.961','2024-12-17 08:31:08.961'),(14,'Đảo St. Helena nằm ở đâu?',1,1,'2024-12-17 08:31:24.729','2024-12-17 08:31:24.729'),(15,'Người ta gọi vùng rừng vành đai Siberi là gì?',2,1,'2024-12-17 08:31:30.947','2024-12-17 08:31:30.947'),(16,'Năm 79 tr. CN thảm hoạ núi lửa và động đất đã phá huỷ hoàn toàn hai thành phố La mã. Tên hai thành phố ấy là gì?',3,1,'2024-12-17 08:31:36.859','2024-12-17 08:31:36.859'),(17,'Tại sao người ta gọi dân da đỏ là Indianer?',4,1,'2024-12-17 08:31:46.339','2024-12-17 08:31:46.339'),(18,'Tên của thành phố Köln thời La mã là gì?',1,1,'2024-12-17 08:31:52.301','2024-12-17 08:31:52.301'),(19,'Hãy kể tên 4 nước lớn nhất về diện tích!',1,1,'2024-12-17 08:31:59.362','2024-12-17 08:31:59.362'),(20,'Babylonnằm ở đâu?',2,1,'2024-12-17 08:32:04.945','2024-12-17 08:32:04.945'),(21,'Chim cánh cụt (Pinguin) sống ở đâu?',3,1,'2024-12-17 08:32:10.381','2024-12-17 08:32:10.381'),(22,'Brazil nói tiếng gì?',4,1,'2024-12-17 08:32:15.112','2024-12-17 08:32:15.112'),(23,'Sông nào dài nhất châu Âu?',1,1,'2024-12-17 08:32:19.696','2024-12-17 08:32:19.696'),(24,'Thành phố Istabul trước kia có tên là gì?',2,1,'2024-12-17 08:32:26.650','2024-12-17 08:32:26.650'),(25,'sdf',5,1,'2024-12-19 12:29:55.258','2024-12-19 12:29:55.258'),(26,'helo',5,1,'2024-12-19 12:30:41.869','2024-12-19 12:30:41.869'),(27,'sdfasdf',5,1,'2024-12-19 12:30:53.202','2024-12-19 12:30:53.202'),(28,'ádfasdfasd',6,1,'2024-12-19 12:30:56.748','2024-12-19 12:30:56.748'),(29,'dfasdfasdf',6,1,'2024-12-19 12:30:58.952','2024-12-19 12:30:58.952'),(30,'ádfasdfasd',7,1,'2024-12-19 12:31:03.163','2024-12-19 12:31:03.163'),(31,'ágqeqwrqwe',7,1,'2024-12-19 12:31:05.678','2024-12-19 12:31:05.678'),(32,'ádfasdf',2,1,'2024-12-19 12:31:56.119','2024-12-19 12:31:56.119'),(33,'qưer',2,1,'2024-12-20 11:06:16.905','2024-12-20 11:06:16.905');
/*!40000 ALTER TABLE `ForumPost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ForumThread`
--

DROP TABLE IF EXISTS `ForumThread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ForumThread` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ForumThread_authorId_fkey` (`authorId`),
  CONSTRAINT `ForumThread_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ForumThread`
--

LOCK TABLES `ForumThread` WRITE;
/*!40000 ALTER TABLE `ForumThread` DISABLE KEYS */;
INSERT INTO `ForumThread` VALUES (1,'How to speak english','Speak sao cho pro?',1,'2024-12-17 07:49:54.873','2024-12-17 07:49:54.873'),(2,'How to learn reading','Reading sao cho pro? ',1,'2024-12-17 07:50:50.225','2024-12-17 07:50:50.225'),(3,'How to learn writing	','toi nay an gi?',1,'2024-12-17 07:51:08.164','2024-12-17 07:51:08.164'),(4,'How to learn listening	','an khuya co tot khong? ',1,'2024-12-17 07:51:30.375','2024-12-17 07:51:30.375'),(5,'Toi code mot minh','Toi code mot minh',1,'2024-12-17 09:07:03.601','2024-12-17 09:07:03.601'),(6,'He thong con thieu chuc nang gi?','Toi khong biet',1,'2024-12-17 09:09:36.776','2024-12-17 09:09:36.776'),(7,'Toi muon code he thong bang Clean Architect','Okay',1,'2024-12-17 09:10:26.563','2024-12-17 09:10:26.563');
/*!40000 ALTER TABLE `ForumThread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Lesson`
--

DROP TABLE IF EXISTS `Lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Lesson` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoTime` int DEFAULT NULL,
  `courseId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Lesson_courseId_fkey` (`courseId`),
  CONSTRAINT `Lesson_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lesson`
--

LOCK TABLES `Lesson` WRITE;
/*!40000 ALTER TABLE `Lesson` DISABLE KEYS */;
INSERT INTO `Lesson` VALUES (1,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',7,7,'2024-12-17 04:01:49.584','2024-12-17 04:00:53.266'),(2,'Lesson 2 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130767',6,7,'2024-12-17 04:03:29.387','2024-12-17 04:03:46.016'),(3,'Lesson 4 for Course 7','Learn the basics of JavaScript programming','https://vimeo.com/1037130759',8,7,'2024-12-17 04:03:29.387','2024-12-17 04:03:46.016'),(4,'Lesson 3 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130747',4,7,'2024-12-17 04:03:29.387','2024-12-17 04:03:46.016'),(5,'Lesson 3 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130699',6,7,'2024-12-17 04:03:29.387','2024-12-17 04:03:46.016'),(6,'Lesson 3 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130666',5,7,'2024-12-17 04:03:29.387','2024-12-17 04:03:46.016'),(7,'Lesson 3 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130318',6,7,'2024-12-17 04:03:29.387','2024-12-17 04:03:51.114'),(8,'Lesson 1 for Course 3	','Learn the basics of JavaScript programming	','https://vimeo.com/1037130747	',NULL,7,'2024-12-17 10:07:34.041','2024-12-17 10:07:34.041'),(11,'asd','asdf','asdf',NULL,7,'2024-12-19 14:40:06.193','2024-12-19 14:40:06.193'),(12,'rqwer','qwer','asdfasd',NULL,7,'2024-12-19 14:40:25.716','2024-12-19 14:40:25.716');
/*!40000 ALTER TABLE `Lesson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveCourse`
--

DROP TABLE IF EXISTS `LiveCourse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LiveCourse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `instructorId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `LiveCourse_instructorId_fkey` (`instructorId`),
  CONSTRAINT `LiveCourse_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveCourse`
--

LOCK TABLES `LiveCourse` WRITE;
/*!40000 ALTER TABLE `LiveCourse` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveCourse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveSession`
--

DROP TABLE IF EXISTS `LiveSession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LiveSession` (
  `id` int NOT NULL AUTO_INCREMENT,
  `liveCourseId` int NOT NULL,
  `sessionDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `topic` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `LiveSession_liveCourseId_fkey` (`liveCourseId`),
  KEY `LiveSession_courseId_fkey` (`courseId`),
  CONSTRAINT `LiveSession_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `LiveSession_liveCourseId_fkey` FOREIGN KEY (`liveCourseId`) REFERENCES `LiveCourse` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveSession`
--

LOCK TABLES `LiveSession` WRITE;
/*!40000 ALTER TABLE `LiveSession` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveSession` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `senderId` int NOT NULL,
  `receiverId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Message_senderId_fkey` (`senderId`),
  KEY `Message_receiverId_fkey` (`receiverId`),
  KEY `Message_userId_fkey` (`userId`),
  CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `message` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Notification_userId_fkey` (`userId`),
  CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `amount` int NOT NULL,
  `paymentDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `method` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Payment_userId_fkey` (`userId`),
  CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Progress`
--

DROP TABLE IF EXISTS `Progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `lessonId` int NOT NULL,
  `enrollmentId` int NOT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `completedAt` datetime(3) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `feedback` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Progress_enrollmentId_fkey` (`enrollmentId`),
  KEY `Progress_lessonId_fkey` (`lessonId`),
  KEY `Progress_userId_fkey` (`userId`),
  CONSTRAINT `Progress_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `Enrollment` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Progress_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Progress`
--

LOCK TABLES `Progress` WRITE;
/*!40000 ALTER TABLE `Progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `Progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Purchase`
--

DROP TABLE IF EXISTS `Purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Purchase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  `amount` int NOT NULL,
  `purchasedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Purchase_courseId_fkey` (`courseId`),
  KEY `Purchase_userId_fkey` (`userId`),
  CONSTRAINT `Purchase_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Purchase_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Purchase`
--

LOCK TABLES `Purchase` WRITE;
/*!40000 ALTER TABLE `Purchase` DISABLE KEYS */;
/*!40000 ALTER TABLE `Purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Question`
--

DROP TABLE IF EXISTS `Question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` json NOT NULL,
  `answer` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `testId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Question_testId_fkey` (`testId`),
  CONSTRAINT `Question_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Question`
--

LOCK TABLES `Question` WRITE;
/*!40000 ALTER TABLE `Question` DISABLE KEYS */;
/*!40000 ALTER TABLE `Question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RefreshToken`
--

DROP TABLE IF EXISTS `RefreshToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RefreshToken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefreshToken_token_key` (`token`),
  KEY `RefreshToken_userId_fkey` (`userId`),
  CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RefreshToken`
--

LOCK TABLES `RefreshToken` WRITE;
/*!40000 ALTER TABLE `RefreshToken` DISABLE KEYS */;
INSERT INTO `RefreshToken` VALUES (1,'4e549bef-409a-4fe7-bbb6-e4d84bb8fccd',1,'2024-12-25 16:42:58.131','2024-12-18 16:42:58.132'),(2,'ce82df43-9aa6-403f-b9a5-a05526e684f3',1,'2024-12-25 16:46:05.668','2024-12-18 16:46:05.669'),(3,'d20e77e7-68ab-4132-8b3f-47d5f93ade55',1,'2024-12-25 16:46:29.400','2024-12-18 16:46:29.400'),(4,'f0c41a0f-2919-44a8-bd72-a743f054d40f',1,'2024-12-25 16:49:29.505','2024-12-18 16:49:29.505'),(5,'fc220e0a-c8ea-4096-921f-385755a9a418',1,'2024-12-25 16:50:06.968','2024-12-18 16:50:06.969'),(6,'22169129-0ef0-474b-bf90-8ca039c40550',1,'2024-12-25 16:50:27.203','2024-12-18 16:50:27.204'),(7,'73efb7c9-dd04-4f17-99e9-b78ccb770a5f',1,'2024-12-25 16:53:32.880','2024-12-18 16:53:32.881'),(8,'b804b514-ee2e-410a-9eb8-cbfc9e15d7e4',1,'2024-12-25 16:58:38.666','2024-12-18 16:58:38.667'),(9,'1cb6d294-b3a6-4937-a6a4-e59672e22777',1,'2024-12-25 17:00:02.339','2024-12-18 17:00:02.339'),(10,'2fb587d8-8b9f-4c9b-a5ac-9e7adaa34646',1,'2024-12-25 17:07:35.531','2024-12-18 17:07:35.532'),(11,'e54f0d6d-8e1d-4b5a-84aa-beb3518f1b4a',1,'2024-12-25 17:10:41.258','2024-12-18 17:10:41.258'),(12,'6802108a-235d-4a6a-a376-d4bf986808fe',1,'2024-12-25 17:16:39.351','2024-12-18 17:16:39.352'),(13,'565b0b19-374d-43c0-a4bd-316987d4f3dc',1,'2024-12-25 17:16:55.546','2024-12-18 17:16:55.547'),(14,'b2a91f01-4d20-4b44-9b54-d3d17febe833',1,'2024-12-25 17:17:17.630','2024-12-18 17:17:17.631'),(15,'48da113d-5fce-4005-b09b-e94f1ac5abed',1,'2024-12-25 17:18:30.433','2024-12-18 17:18:30.433'),(16,'83322318-1bbd-4709-ba61-60b3ca08c81d',1,'2024-12-25 17:18:49.945','2024-12-18 17:18:49.946'),(19,'432621a9-e028-4611-abc6-bcf738fae020',1,'2024-12-25 17:20:25.627','2024-12-18 17:20:25.627'),(20,'40f93e58-c6db-44b2-8f2e-5cb1fa469089',1,'2024-12-25 17:21:22.592','2024-12-18 17:21:22.593'),(24,'9d38eb4a-497b-4a92-8ca7-50bf94184174',1,'2024-12-25 17:29:07.934','2024-12-18 17:29:07.934'),(25,'7e8ba335-986a-42be-ba2b-5d5fee490d8d',1,'2024-12-25 17:29:48.980','2024-12-18 17:29:48.981'),(33,'aa1192e8-d777-4f89-a585-7622ab89ddda',1,'2024-12-25 17:37:43.176','2024-12-18 17:37:43.177'),(35,'37e77df0-17fe-4b58-92f4-7d9fc465bb47',1,'2024-12-25 18:19:06.361','2024-12-18 18:19:06.362'),(40,'648c03a3-662b-4f3a-8700-95698a296d3a',1,'2024-12-25 18:37:43.530','2024-12-18 18:37:43.530'),(41,'f2caf690-5e5a-48e8-a92b-b00d6f6ece42',1,'2024-12-25 18:46:39.980','2024-12-18 18:46:39.981'),(42,'4d7a0193-5ce9-4744-8450-3ebdf4103a84',1,'2024-12-25 18:47:50.629','2024-12-18 18:47:50.630'),(43,'f8f6d981-aa91-4720-9256-94c255f91329',1,'2024-12-25 18:51:30.311','2024-12-18 18:51:30.311'),(44,'da370b35-738c-4370-b0d7-a14bd18f379f',1,'2024-12-25 18:52:31.733','2024-12-18 18:52:31.734'),(45,'53a1def5-7fd5-41de-9435-9295535eae21',1,'2024-12-25 18:53:59.663','2024-12-18 18:53:59.664'),(46,'44fa7f0e-01d8-4b24-aeb9-fc8cee6ebc41',1,'2024-12-25 18:54:04.739','2024-12-18 18:54:04.740'),(47,'99f70cfa-57f5-4227-8b50-c0e0f3e935eb',1,'2024-12-25 18:54:09.977','2024-12-18 18:54:09.978'),(48,'06919a2d-98fb-40f4-9d4a-635aef916540',1,'2024-12-25 18:54:16.180','2024-12-18 18:54:16.181'),(49,'c499544e-543f-4c19-b37e-db4563210801',1,'2024-12-25 18:54:26.293','2024-12-18 18:54:26.294'),(50,'5738c799-f8ad-4b90-9c07-f66facc5dc1d',1,'2024-12-25 18:56:12.860','2024-12-18 18:56:12.861'),(52,'45b6c707-588c-4bdf-b24e-ddacfe76464a',1,'2024-12-26 03:04:17.874','2024-12-19 03:04:17.875'),(53,'b1dcb6b6-5a99-4801-a8a8-cbe0ccdcbc63',1,'2024-12-26 03:04:23.064','2024-12-19 03:04:23.064'),(54,'75e20607-c022-4422-9221-04b57cd66753',1,'2024-12-26 09:32:53.468','2024-12-19 09:32:53.469'),(55,'ae2de2e4-ace7-480e-9904-7cfca3a2ede4',1,'2024-12-26 09:33:02.212','2024-12-19 09:33:02.212'),(56,'f52fbddf-4e45-479b-bf99-c49a81fc8c0f',1,'2024-12-26 09:36:04.945','2024-12-19 09:36:04.946'),(57,'6a9dc785-58b9-4114-b534-9d6f511426fa',1,'2024-12-26 10:37:52.754','2024-12-19 10:37:52.755'),(58,'69c19c6f-4994-43f5-94f9-0e43636d2216',1,'2024-12-26 10:38:51.020','2024-12-19 10:38:51.021'),(59,'321deec7-5a8b-41ac-98b0-c323f8633083',1,'2024-12-26 10:39:37.324','2024-12-19 10:39:37.325'),(60,'8d33a03c-501c-428c-bcfe-b837d794a219',1,'2024-12-26 10:39:42.422','2024-12-19 10:39:42.423'),(61,'6efe68f7-cd85-4866-a6ea-90b58e43b2b3',1,'2024-12-26 10:41:34.409','2024-12-19 10:41:34.410'),(62,'c78d6e36-addb-45e7-89bd-38ec2564dda4',1,'2024-12-26 10:47:03.217','2024-12-19 10:47:03.218'),(63,'e3ecec0d-13f3-4c92-9719-6342b06b4894',1,'2024-12-26 10:47:07.637','2024-12-19 10:47:07.638'),(64,'18a2473d-e387-4d3b-9cb1-4bac3b01d580',1,'2024-12-26 10:53:05.505','2024-12-19 10:53:05.506'),(70,'d5d5b47b-c2c0-477e-b78c-4cbb4ab448ca',1,'2024-12-26 14:42:01.851','2024-12-19 14:42:01.852'),(71,'0ef1ef3b-58e3-4fb0-ba9a-24b91dd69a71',1,'2024-12-26 14:42:02.869','2024-12-19 14:42:02.870'),(72,'d96c788f-b7ca-418a-a62c-65c63a045b0d',1,'2024-12-26 14:42:03.770','2024-12-19 14:42:03.771'),(73,'9e31c8ea-a3c6-4553-b873-cce92c995a17',1,'2024-12-26 14:42:04.256','2024-12-19 14:42:04.257'),(74,'29749a63-ef06-49ef-a517-f0c18afbd348',1,'2024-12-26 14:42:06.963','2024-12-19 14:42:06.964'),(75,'5d731a0c-35ee-4375-b31a-47ba1f7cca9a',1,'2024-12-26 14:42:07.744','2024-12-19 14:42:07.745'),(76,'7a8223e7-ba02-4cc1-998c-7fba14369f4e',1,'2024-12-26 14:42:09.043','2024-12-19 14:42:09.044'),(77,'317f9e33-6f82-4f16-b77c-4c3f12a34359',1,'2024-12-26 14:42:09.807','2024-12-19 14:42:09.808'),(78,'1fc92012-a2af-445f-a9ba-ff1b91713213',1,'2024-12-26 14:42:10.514','2024-12-19 14:42:10.515'),(79,'8fbc32c0-e071-43a2-b976-902e061cfc26',1,'2024-12-26 14:42:15.869','2024-12-19 14:42:15.869'),(82,'930da137-c564-47e9-9475-dfdf18e4090d',1,'2024-12-26 14:44:01.792','2024-12-19 14:44:01.793'),(83,'96783da4-9df1-477d-bdca-9c1daca2e3ef',1,'2024-12-26 14:44:02.534','2024-12-19 14:44:02.535'),(84,'eef6e85a-1782-4de1-a385-55af7b11a946',1,'2024-12-26 14:44:06.068','2024-12-19 14:44:06.068'),(85,'840f7240-1b27-4969-85b6-5b714ed84c5b',1,'2024-12-26 14:44:59.465','2024-12-19 14:44:59.466'),(87,'a082b92e-62b9-44ae-a489-ad76eb72f1f8',1,'2024-12-27 04:18:07.005','2024-12-20 04:18:07.007');
/*!40000 ALTER TABLE `RefreshToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  `rating` int NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Review_courseId_fkey` (`courseId`),
  KEY `Review_userId_fkey` (`userId`),
  CONSTRAINT `Review_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
INSERT INTO `Review` VALUES (1,1,7,0,'ádasdf','2024-12-17 06:27:01.100'),(2,1,7,4,'sdfasdf','2024-12-17 06:29:32.588'),(3,1,8,4,'asdf','2024-12-19 12:20:34.748'),(4,1,8,4,'asdasdfasdf','2024-12-19 12:20:43.950'),(5,1,8,0,'ádf','2024-12-19 12:22:35.115'),(6,1,11,4,'dfa','2024-12-20 11:05:58.727');
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Role_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'admin'),(3,'student'),(2,'teacher');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudyTime`
--

DROP TABLE IF EXISTS `StudyTime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StudyTime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `startTime` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `endTime` datetime(3) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `StudyTime_userId_fkey` (`userId`),
  CONSTRAINT `StudyTime_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StudyTime`
--

LOCK TABLES `StudyTime` WRITE;
/*!40000 ALTER TABLE `StudyTime` DISABLE KEYS */;
/*!40000 ALTER TABLE `StudyTime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Test`
--

DROP TABLE IF EXISTS `Test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `creatorId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Test_creatorId_fkey` (`creatorId`),
  CONSTRAINT `Test_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Test`
--

LOCK TABLES `Test` WRITE;
/*!40000 ALTER TABLE `Test` DISABLE KEYS */;
/*!40000 ALTER TABLE `Test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` int NOT NULL,
  `settingsId` int DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `emailCheckToken` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_settingsId_key` (`settingsId`),
  KEY `User_roleId_fkey` (`roleId`),
  CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Admin','admin@alo.com','$2b$10$DJkyuBXbgM5rENGRqG5ye.wJi2wfds.EEqIcH7x.fnWFxu9P2BHuq',1,NULL,0,'2024-12-16 17:49:16.132','2024-12-22 16:49:52.047', 1, "ffffff");
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSettings`
--

DROP TABLE IF EXISTS `UserSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `learningGoals` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `theme` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'light',
  `notificationPreferences` json DEFAULT NULL,
  `userId` int NOT NULL,
  `assistantPreferences` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserSettings_userId_key` (`userId`),
  CONSTRAINT `UserSettings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSettings`
--

LOCK TABLES `UserSettings` WRITE;
/*!40000 ALTER TABLE `UserSettings` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserSettings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-23  0:59:49

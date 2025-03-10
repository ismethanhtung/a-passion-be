-- MySQL dump 10.13  Distrib 9.2.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: a_passion_db
-- ------------------------------------------------------
-- Server version	9.2.0

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
INSERT INTO `Cart` VALUES (3,1,9,1,'2024-12-18 04:20:31.019','2024-12-24 11:19:46.962'),(4,1,12,1,'2024-12-18 04:29:26.465','2024-12-30 11:27:45.729'),(5,1,13,1,'2024-12-18 04:29:35.902','2024-12-30 11:36:34.405'),(6,1,17,1,'2024-12-18 04:29:41.685','2024-12-18 11:46:41.190'),(8,1,7,1,'2024-12-24 11:01:45.399','2024-12-24 11:01:45.399'),(9,1,8,1,'2024-12-24 11:02:46.269','2024-12-24 11:02:46.269'),(15,135,8,1,'2025-01-12 18:05:22.339','2025-01-12 18:06:01.478'),(16,135,10,1,'2025-01-12 18:07:37.398','2025-01-12 18:07:37.398');
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
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Conversation_createdAt_fkey` (`createdAt`),
  KEY `Conversation_userId_fkey` (`userId`),
  CONSTRAINT `Conversation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Conversation`
--

LOCK TABLES `Conversation` WRITE;
/*!40000 ALTER TABLE `Conversation` DISABLE KEYS */;
INSERT INTO `Conversation` VALUES (25,'Chatbot','2025-03-09 20:52:36.547','2025-03-09 20:52:36.547',137),(26,'Chatbot','2025-03-09 20:52:36.548','2025-03-09 20:52:36.548',137);
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
  `tags` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Course_teacherId_fkey` (`teacherId`),
  KEY `Course_creatorId_fkey` (`creatorId`),
  KEY `Course_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Course_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Course_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Course_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Course`
--

LOCK TABLES `Course` WRITE;
/*!40000 ALTER TABLE `Course` DISABLE KEYS */;
INSERT INTO `Course` VALUES (1,'English Foundation Course: Grammar and Speaking Upgrade','Become fluent by improving all your English Skills. Build a strong English foundation in grammar, speaking, and more!','Learn in-demand skills from university and industry experts. Master a subject or tool with hands-on projects. Develop a deep understanding of key concepts. Earn a career certificate from Georgia Institute of Technology.',99000,29000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733505839/a_yya234.jpg','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',3,1,1,'2024-12-17 03:36:45.032','2025-03-09 08:36:17.180',1,0,'Living Abroad, Work & Study Overseas, Finding Housing, Making New Friends, Expat Life'),(7,'The Complete English Language Course Improve Spoken English','Master the English Language - Learn English Grammar English Conversation English Pronunciation Spoken English!','A detailed and thorough knowledge of English language and grammar. To understand English easier. To speak and write English with MORE confidence. Get answers to all your English language questions from someone who ACTUALLY teaches the language.',449000,299000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507386/h_nnvrvm.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',1,1,1,'2024-12-17 03:38:33.858','2025-03-09 08:36:17.180',1,0,'Intermediate, Conversation, Pronunciation, Vocabulary, Reading'),(8,'Master English Grammar - Advanced Level','English Language skills for IELTS, CAE, and CPE. Downloadable 180-page ebook with images included. Essays checked!','Gain an advanced knowledge of complex English sentences. Improve your understanding of typical mistakes that must be avoided. Identify and use different tenses in passive and active forms. Identify and use different conditionals in a variety of complex forms. Identify and use reporting verbs in a variety of complex forms. Identify and use subjunctive and inversion in a variety of complex forms.',899000,499000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/d_zvkqlw.jpg','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',4,1,1,'2024-12-17 03:40:09.293','2025-03-09 08:36:17.180',1,0,'Advanced, Fluency, Writing, IELTS, TOEIC'),(9,'Complete English Course: Master English Beginner to Advanced','Learn how to have a natural conversation FAST from a native English speaker!','Detailed understanding of English grammar. 1000+ vocabulary words. How to make appointments and plans. Describing your favorite books and films. Advanced reading and speaking skills. Conversational English to sound like a native.',599000,99000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/e_dbq8wh.webp','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/e_dbq8wh.webp',3,1,1,'2024-12-17 03:45:51.902','2025-03-09 08:36:17.180',1,0,'Business English, Workplace Communication, Presentations, Meetings, Emails'),(10,'IELTS Band 8: IELTS Listening Mastery | IELTS Tenses','IELTS boost: IELTS Listening, IELTS Tenses course in grammar, speaking, and more!','Different types of questions in the IELTS Listening Section. Develop the skill of being able to recognize Synonym Language / Paraphrasing. Learn all about the 12 tenses in English Grammar to improve your Grammar Range and Accuracy. Learn how to learn vocabulary.',1399000,600000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507376/l_f3uxj6.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',2,1,1,'2024-12-17 03:47:29.717','2025-03-09 08:36:17.180',1,0,'Travel English, Daily Conversation, Ordering Food, Directions, Airport'),(11,'2024 NEW!! Complete IELTS Academic Preparation to achieve 7+','The best IELTS strategies & tips to learn, practice & prepare for success in Listening, Reading, Writing, Speaking','Pass the IELTS test with 7 or above in all modules by focusing only on what\\\'s important. Master the most important and effective IELTS strategies, tips, and techniques for an easy road to IELTS success. IELTS LISTENING - Practice listening techniques and predict answers for a higher rate of success. IELTS READING - Master the simple tips to get through reading passages faster and to spot the right answers. IELTS WRITING - Learn complete essay structures & practice vocabulary and grammar that will prepare you for any IELTS writing topic. IELTS SPEAKING - Prepare to give extended answers on a wide range of speaking topics with confidence.',499000,99000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507379/i_vjmn9g.png','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507379/i_vjmn9g.png',1,1,1,'2024-12-17 03:49:42.317','2025-03-09 08:36:17.180',1,0,'Academic English, Essay Writing, Research Papers, Debate, Critical Thinking'),(12,'Intensive English Mastery Course: Animated Beginner’s Course','Intensive English course. 77 Hours of English language speaking, English listening practice. Animated Cartoons!','You will learn over 1000 vital English words, expressions and idioms, and how to use them in real life. You will learn the most important English grammar with tons of English-speaking practice. You will learn to think in English and to speak English fluently. (in Intermediate level) You will learn to read in English and to spell English words intuitively. You will learn to understand movies and TV shows in English. After the course, you can travel the world freely, without a language barrier. After the course, you can start preparing for English language tests like TOEFL, IELTS, GMAT etc.',2199000,1599000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507375/g_bjw4ik.png','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507375/g_bjw4ik.png',6,1,1,'2024-12-17 03:51:17.651','2025-03-09 08:36:17.180',1,0,'English for Kids, Phonics, Storytelling, Songs, Interactive Learning'),(13,'The English Master Course: English Grammar, English Speaking','A Complete English Language Course: English Grammar, Speaking, Pronunciation, and Writing. British and American English','LEARN EVERYTHING about English grammar, English speaking, English writing and English pronunciation. Master the English Language. FULL ENGLISH GRAMMAR SECTION covering over 90 English grammar topics. Master English grammar from beginner to advanced. FULL ENGLISH SPEAKING SECTION teaching you to speak like a native speaker and improve your fluency. FULL ENGLISH PRONUNCIATION and ACCENT TRAINING SECTION: Build your own American or British accent. FULL ENGLISH WRITING and PUNCTUATION SECTION: Write English like a professional. IMPROVE YOUR SCORES for English exams like A1, A2, B1, B2, C1, TOEFL, IELTS, and TOEIC. USE PERFECT ENGLISH grammar in real conversations. SPEAK LIKE A NATIVE ENGLISH SPEAKER: You will learn to speak about over 27 different daily topics. HUNDREDS of INTERACTIVE QUIZZES for IELTS, TOEIC, TOEFL, and more. With new quizzes added every month. UPGRADE your English speaking, English listening, English writing, and English pronunciation with an American professor.',1699000,999000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/b_hrvenm.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',4,1,1,'2024-12-17 03:53:39.550','2025-03-09 08:36:17.180',1,0,'Slang & Idioms, Casual Conversation, Expressions, Native Phrases, Cultural Context'),(14,'Advanced English Vocabulary','500 High-Level Words/Phrases to take your English to the NEXT LEVEL!','500 Advanced English Vocabulary words and phrases. English listening and speaking skills through our specially designed course. 2500 high-level English collocations to make your English more natural. 2000 synonyms and antonyms to build your wider English vocabulary. 500 example sentences to improve your English grammar.',199000,49000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733506929/c_nbc3p4.jpg','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',3,1,1,'2024-12-17 03:54:52.755','2025-03-09 08:36:17.180',1,0,'Listening Practice, TED Talks, Podcasts, News English, Transcription'),(17,'Building Your English Brain','Learn to start thinking in English so that you can stop translating in your head and become fluent in English faster!','Form thoughts in English. Speak English easily without translating. Express ideas creatively, rather than using set phrases. Use new English vocabulary and phrases with confidence. Connect and speak about abstract ideas. Follow a routine to build excellent habits.',1190000,349000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507380/k_qh2moc.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',1,1,1,'2024-12-17 03:57:31.403','2025-03-09 08:36:17.180',1,0,'Exam Preparation, TOEFL, Cambridge Exams, Mock Tests, Scoring Strategies'),(19,'Ultimate English Course: All-in-One English Course (A1-C2)','Your Complete English Language Course: English Grammar, Speaking, Pronunciation, and Writing American English.','Clearer pronunciation leads to success in business, education, or any field where English is required. Learners will improve their pronunciation by practicing realistic dialogues and other interactive exercises. you will learn and practice all of the consonant sounds of American English, including some pairs of consonants that are especially tricky. you will learn and practice all of the vowel sounds of American English, including pairs of vowels that may be easy to confuse. you will learn and practice the \"music\" of American English, the features of pronunciation such as stress, rhythm, and intonation that will help improve your listening comprehension as well as your ability to communicate',399000,300000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733505839/a_yya234.jpg','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',1,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'English Basics, Beginner English, Fundamentals, Common Phrases, Essential Grammar'),(20,'Intensive Intermediate-to-Advanced English Course','Intermediate-Advanced intensive English course. 57 hours of spoken English, listening, English vocabulary and more','You will learn to think in English language and to speak English language fluently (at an advanced level). You will learn over 5000 amazing English language words and idioms. You will start feeling English grammar like native. You will learn to understand movies and TV shows in English language. After the course, you can start preparing for English language tests like TOEFL, IELTS, GMAT etc.',899000,600000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507380/k_qh2moc.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',2,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'Intermediate English, Speaking Practice, Listening Skills, Daily Conversations, Fluency Training'),(21,'The Complete IELTS Guide- 7 Courses in One - IELTS Band 7+','UPDATED January-April 2025 - IELTS Preparation- Speaking, Listening, Reading, Writing (IELTS Academic AND General)','Get Band 7+ in all 4 IELTS tests - IELTS Listening, IELTS Reading, IELTS Writing and IELTS Speaking. Suitable for IELTS General and IELTS Academic students Learn great skills for IELTS Reading and IELTS Listening. Create perfect written answers for IELTS Academic or IELTS General Writing Impress the IELTS Speaking examiner with your answers',599000,49000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507386/h_nnvrvm.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',6,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'Advanced English, Professional Communication, Writing Mastery, Public Speaking, Debating'),(22,'The Complete English Grammar Course - Perfect Your English','A detailed and thorough English grammar course for all learners. Improve your language skills and understanding TODAY.','A detailed and thorough knowledge of English grammar. To understand English easier. To speak and write English with MORE confidence. Get answers to all your English grammar questions from someone who ACTUALLY teaches the language. Learn grammar deeply',1190000,599000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733506929/c_nbc3p4.jpg','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/e_dbq8wh.webp',3,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'Grammar Rules, Tenses, Prepositions, Modal Verbs, Conditionals'),(23,'Master Native English | Speaking Skills, Grammar, and More','Achieve English mastery and fluency in this journey through the English language. Each lesson is filled with examples.','Learn English skills to easily handle a wide range of common situations .Master exercises to improve your habits and ability to think in English. Learn and practice the grammar necessary to sound natural and avoid mistakes. Learn extremely common expressions and vocabulary (with examples). Gain confidence in your ability to express yourself in English clearly and accurately. Learn how to use English in advanced situations, like giving a presentation (and more)',899000,600000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507386/h_nnvrvm.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',6,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'Word Formation, Collocations, Synonyms & Antonyms, Pronunciation Hacks, Sentence Structure'),(24,'Advanced American English Pronunciation | Complete Mastery','Master English pronunciation like a native, including difficult English sounds, flow, rules, and more. All by example!','Master techniques for learning how to hear and imitate any English sound. Learn complex and simple sounds that make up most English words Learn the rules of pronunciation; when to use them, and when to avoid them. Master thousands of English word and sentence pronunciations; real practice to build skills AND habits. Gain techniques and examples to speak with flow, which is the key to natural English speech. Acquire exercises to practice everything you learn and continue improving your English long-term. Notice subtle differences between English sounds and words, so that you are never misunderstood. Learn patterns for correctly using both stress and intonation, to avoid sounding like a robot',600000,399000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507379/i_vjmn9g.png','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507379/i_vjmn9g.png',6,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'Listening Comprehension, Accents & Dialects, Real Conversations, Speech Patterns, TED Talks English'),(25,'AMERICAN ENGLISH PRONUNCIATION: Accent Reduction Made Easy','Step by Step Guide to Master the American Accent! Taught by Expert AWARD WINNING BROADWAY VOICE COACH','Speak American English clearly and confidently .Have a deeper knowledge of the American rhythm. How to speak American English dynamically and with intention .How to master the American Accent',499000,399000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733506929/c_nbc3p4.jpg','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507375/g_bjw4ik.png',4,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'Essay Writing, Paragraph Structure, Academic Writing, Creative Writing, Business Writing'),(26,'Perfect English Grammar For EVERY Level (A1/A2/B1/B2/C1/C2)','Improve English from BEGINNER (A1/A2) to INTERMEDIATE (B1/B2) to ADVANCED (C1/C2, IELTS 7-9). *FEEDBACK ON YOUR WRITING*','LEARN ALL that you need about English Grammar to communicate at a native level of English. Over 80 advanced C1/C2 lessons, 110 intermediate B1/B2 lessons and 50 beginner A1/A2 lessons Over 300 additional PRACTICE/SPEAKING TASKS. All lessons TAUGHT LIVE by an EXPERIENCED, UNIVERSITY LECTURER with a NATIVE ENGLISH ACCENT. Each section has lessons for BEGINNER, ELEMENTARY, INTERMEDIATE, ADVANCED and EXPERT English students. Lessons cover the FORM and USE of each grammar point, as well as EXAMPLES of real life use',1699000,1190000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/b_hrvenm.png','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',4,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'Business English, Corporate Communication, Meetings & Negotiations, Presentations, Professional Etiquette'),(27,'English Speaking: Mastering English Conversation','Mastering English Speaking and English Conversation: Gain Confidence, Avoid Mistakes, and Speak English Fluently - Fast','Easily start conversations and make great first impressions. Keep any conversation flowing smoothly without awkward pauses. Share your opinions clearly and be understood in any situation. Practice speaking English effectively, even without a partner. Sound polite and respectful in any English conversation. Tell engaging stories that capture attention and interest. Take control of your learning and improve as your own teacher. Avoid common mistakes to speak naturally and fluently.',599000,399000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/d_zvkqlw.jpg','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',2,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'Legal English, Contract Terminology, Courtroom English, Legal Documents, Legal Writing'),(28,'English Idioms Launch: Upgrade your speaking and listening','Learn English idioms from a native English teacher to take your spoken English and listening skills to the next level','Speak English more confidently. Improve your English listening skills. Produce the target idioms confidently and accurately when you speak. Understand more English idioms that native speakers use.',499000,399000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/e_dbq8wh.webp','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507379/i_vjmn9g.png',2,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'TOEIC Preparation, Listening & Reading Skills, Business Vocabulary, Mock Tests, Time Management'),(29,'Improve your Business English: English for Presentations','Learn 200+ essential phrases, plan & deliver presentations using effective Business English in this ESL course!','Prepare presentations with the right type of phrases/language/expressions to be able to communicate effectively to your audience. Effectively structure and present a presentation in easy English. Know the phrases for each part of a public presentation. Improve your presentation skills and public speaking skills. Develop your Business English presentation skills as a non-native speaker. Speak confidently in English to all types of audiences',399000,1190000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507375/g_bjw4ik.png','https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/e_dbq8wh.webp',2,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'IELTS Academic, IELTS General, Writing Task 1 & 2, Speaking Part 1-3, Band 7+ Strategies'),(30,'Learn English Speaking Course: English speaking secrets','Learn the secrets reductions English native speakers use naturally in speaking but they NEVER teach this in school!','Learn to speak intermediate English with perfect grammar!. Use natural native speaker English pronunciation. Use advanced conditionals including past modals (vital to speak English fluently). Practise and learn English speaking throughout the course Improve your listening ! .Learn all the native speaker pronunciation',1599000,599000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/e_dbq8wh.webp','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',4,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'Casual Conversations, Making Small Talk, Asking for Directions, Ordering Food, Shopping English'),(31,'The Complete English Language Course Improve Spoken English','Master the English Language - Learn English Grammar English Conversation English Pronunciation Spoken English','A detailed and thorough knowledge of English language and grammar. To understand English easier. To speak and write English with MORE confidence. Get answers to all your English language questions from someone who ACTUALLY teaches the language',600000,399000,'https://res.cloudinary.com/dzbifaqwo/image/upload/v1733507370/d_zvkqlw.jpg','https://www.youtube.com/watch?v=NYAaCakv7vs&list=RDMMNYAaCakv7vs&start_radio=1',3,1,NULL,NULL,'2025-03-09 08:36:17.180',0,0,'Social Events, Networking in English, Making Friends, Dating & Relationships, Cultural Etiquette');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enrollment`
--

LOCK TABLES `Enrollment` WRITE;
/*!40000 ALTER TABLE `Enrollment` DISABLE KEYS */;
INSERT INTO `Enrollment` VALUES (1,1,1,'2025-03-06 21:11:54.378');
/*!40000 ALTER TABLE `Enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ForumComment`
--

DROP TABLE IF EXISTS `ForumComment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ForumComment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorId` int NOT NULL,
  `threadId` int NOT NULL,
  `parentId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ForumComment_authorId_fkey` (`authorId`),
  KEY `ForumComment_threadId_fkey` (`threadId`),
  KEY `ForumComment_parentId_fkey` (`parentId`),
  CONSTRAINT `ForumComment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ForumComment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `ForumComment` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ForumComment_threadId_fkey` FOREIGN KEY (`threadId`) REFERENCES `ForumThread` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ForumComment`
--

LOCK TABLES `ForumComment` WRITE;
/*!40000 ALTER TABLE `ForumComment` DISABLE KEYS */;
/*!40000 ALTER TABLE `ForumComment` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
-- Table structure for table `LearningPath`
--

DROP TABLE IF EXISTS `LearningPath`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LearningPath` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `recommendedBy` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pathDetails` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `LearningPath_userId_fkey` (`userId`),
  CONSTRAINT `LearningPath_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LearningPath`
--

LOCK TABLES `LearningPath` WRITE;
/*!40000 ALTER TABLE `LearningPath` DISABLE KEYS */;
INSERT INTO `LearningPath` VALUES (1,1,'AI','\"**Lộ trình 2 tháng để đạt mục tiêu TOEIC 700**\\n\\n**Tuần 1-4:**\\n\\n* Khóa học 1: The Complete English Language Course Improve Spoken English (https://localhost:3000/course/31)\\n\\t+ Mục tiêu: Improve reading and writing skills\\n\\t+ Nội dung: Master English language and grammar, understand English easier, speak and write English with more confidence\\n* Khóa học 2: The Complete English Language Course Improve Spoken English (https://localhost:3000/course/7)\\n\\t+ Mục tiêu: Improve vocabulary and reading skills\\n\\t+ Nội dung: Master English language and grammar, improve vocabulary, read English with more confidence\\n\\n**Tuần 5-8:**\\n\\n* Khóa học 3: The Complete English Grammar Course - Perfect Your English (https://localhost:3000/course/22)\\n\\t+ Mục tiêu: Improve grammar skills\\n\\t+ Nội dung: Master English grammar, understand English easier, speak and write English with more confidence\\n* Khóa học 4: English Idioms Launch: Upgrade your speaking and listening (https://localhost:3000/course/28)\\n\\t+ Mục tiêu: Improve listening and speaking skills\\n\\t+ Nội dung: Learn English idioms, speak English more confidently, improve listening skills\\n\\n**Tuần 9-12:**\\n\\n* Khóa học 5: Learn English Speaking Course: English speaking secrets (https://localhost:3000/course/30)\\n\\t+ Mục tiêu: Improve speaking skills\\n\\t+ Nội dung: Learn native speaker English pronunciation, use advanced conditionals, practice speaking throughout the course\\n\\n**Chú ý:**\\n\\n* Học viên cần dành thời gian mỗi tuần để thực hành, luyện tập và kiểm tra kết quả.\\n* Học viên cần đánh giá và điều chỉnh lộ trình phù hợp với nhu cầu và tiến độ của mình.\\n* Học viên cần tham gia thảo luận và hỏi đáp với giáo viên để giải đáp thắc mắc và giải quyết khó khăn.\\n\\n**Mục tiêu cuối cùng:** TOEIC 700\\n\\n**Chúc mừng học viên!**\"','2025-03-06 21:17:26.913','2025-03-09 18:39:51.901'),(2,137,NULL,'\"**Creating a Personalized Learning Plan for You!**\\n\\nBased on the courses recommended earlier, I\'ve created a customized 4-month learning plan to help you achieve your learning goals.\\n\\n**Month 1: Building Foundation Skills**\\n\\n1. **Course 1: Building Your English Brain** (Weeks 1-4)\\n\\t* Focus on developing your English thinking skills, vocabulary, and grammar.\\n\\t* Complete exercises and quizzes to assess your progress.\\n2. **Additional Tasks:**\\n\\t* Read 1 English book or article per week.\\n\\t* Take notes on vocabulary and grammar rules.\\n\\t* Practice speaking with a language exchange partner or tutor for 30 minutes, 2 times a week.\\n\\n**Month 2: Improving Listening and Grammar**\\n\\n1. **Course 2: 2024 NEW!! Complete IELTS Academic Preparation to achieve 7+** (Weeks 5-8)\\n\\t* Focus on improving your IELTS Listening skills, including recognizing synonym language and paraphrasing.\\n\\t* Complete exercises and quizzes to assess your progress.\\n2. **Additional Tasks:**\\n\\t* Listen to 1 English podcast or radio show per week.\\n\\t* Complete 10-15 grammar exercises per week to improve your grammar range and accuracy.\\n\\n**Month 3: Mastering IELTS Writing and Speaking**\\n\\n1. **Course 3: IELTS Band 8: IELTS Listening Mastery | IELTS Tenses** (Weeks 9-12)\\n\\t* Focus on improving your IELTS Writing and Speaking skills, including writing essays and speaking confidently.\\n\\t* Complete exercises and quizzes to assess your progress.\\n2. **Additional Tasks:**\\n\\t* Write 1 essay per week based on IELTS topics.\\n\\t* Practice speaking for 15-20 minutes, 2 times a week, on various topics.\\n\\n**Month 4: Review and Refine**\\n\\n1. **Review and Refine:** Review all previous material and focus on refining your skills.\\n2. **Additional Tasks:**\\n\\t* Take a full-length IELTS practice test to assess your progress.\\n\\t* Reflect on your progress and identify areas for improvement.\\n\\n**Remember to stay consistent and motivated!** Take breaks, stay organized, and don\'t hesitate to ask for help if you need it.\\n\\nHere\'s your personalized learning plan:\\n\\n**Link to Course 1:** http://localhost:3000/courses/17\\n**Link to Course 2:** http://localhost:3000/courses/11\\n**Link to Course 3:** http://localhost:3000/courses/10\\n\\nBest of luck on your learning journey!\"','2025-03-09 18:19:47.051','2025-03-09 21:13:55.097');
/*!40000 ALTER TABLE `LearningPath` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lesson`
--

LOCK TABLES `Lesson` WRITE;
/*!40000 ALTER TABLE `Lesson` DISABLE KEYS */;
INSERT INTO `Lesson` VALUES (1,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',7,8,'2024-12-17 04:01:49.584','2024-12-23 04:24:05.303'),(2,'Lesson 2 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130767',6,8,'2024-12-17 04:03:29.387','2024-12-23 04:24:05.303'),(3,'Lesson 4 for Course 7','Learn the basics of JavaScript programming','https://vimeo.com/1037130759',8,8,'2024-12-17 04:03:29.387','2024-12-23 04:24:05.303'),(4,'Lesson 3 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130747',4,8,'2024-12-17 04:03:29.387','2024-12-23 04:24:05.303'),(5,'Lesson 3 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130699',6,8,'2024-12-17 04:03:29.387','2024-12-23 04:24:05.303'),(6,'Lesson 3 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130666',5,8,'2024-12-17 04:03:29.387','2024-12-23 04:24:05.303'),(7,'Lesson 3 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130318',6,8,'2024-12-17 04:03:29.387','2024-12-23 04:24:05.303'),(8,'Lesson 1 for Course 3	','Learn the basics of JavaScript programming	','https://vimeo.com/1037130747	',4,8,'2024-12-17 10:07:34.041','2024-12-30 11:40:51.035'),(11,'asd','asdf','asdf',NULL,8,'2024-12-19 14:40:06.193','2024-12-23 04:24:05.303'),(12,'rqwer','qwer','asdfasd',NULL,8,'2024-12-19 14:40:25.716','2024-12-23 04:24:05.303'),(13,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',3,1,'2024-12-30 11:42:23.020','2024-12-30 11:41:18.778'),(14,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',3,1,'2024-12-30 11:42:23.020','2024-12-30 11:41:19.195'),(15,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',2,1,'2024-12-30 11:42:23.020','2024-12-30 11:41:19.361'),(16,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',4,1,'2024-12-30 11:42:23.020','2024-12-30 11:41:19.513'),(17,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',56,1,'2024-12-30 11:42:23.020','2024-12-30 11:41:19.677'),(18,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',6,1,'2024-12-30 11:42:23.020','2024-12-30 11:41:19.842'),(19,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',5,1,'2024-12-30 11:42:23.020','2024-12-30 11:41:19.994'),(20,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',7,1,'2024-12-30 11:42:23.020','2024-12-30 11:41:20.161'),(21,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',7,1,'2024-12-30 11:42:23.020','2024-12-30 11:41:20.310'),(22,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',2,9,'2024-12-30 11:45:29.421','2024-12-30 11:42:40.160'),(23,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',3,10,'2024-12-30 11:45:29.421','2024-12-30 11:42:40.341'),(24,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',4,11,'2024-12-30 11:45:29.421','2024-12-30 11:42:40.494'),(25,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',3,9,'2024-12-30 11:45:29.421','2024-12-30 11:42:40.659'),(26,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',4,11,'2024-12-30 11:45:29.421','2024-12-30 11:42:40.829'),(27,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',5,10,'2024-12-30 11:45:29.421','2024-12-30 11:42:40.976'),(28,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',7,12,'2024-12-30 11:45:29.421','2024-12-30 11:42:41.141'),(29,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',6,9,'2024-12-30 11:45:29.421','2024-12-30 11:42:41.293'),(30,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',7,11,'2024-12-30 11:45:29.421','2024-12-30 11:42:41.460'),(31,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',5,12,'2024-12-30 11:45:29.421','2024-12-30 11:42:41.628'),(32,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',8,10,'2024-12-30 11:45:29.421','2024-12-30 11:42:41.815'),(33,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',5,9,'2024-12-30 11:45:29.421','2024-12-30 11:42:41.975'),(34,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',6,13,'2024-12-30 11:45:29.421','2024-12-30 11:42:42.127'),(35,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',8,12,'2024-12-30 11:45:29.421','2024-12-30 11:42:42.294'),(36,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',78,11,'2024-12-30 11:45:29.421','2024-12-30 11:42:42.460'),(37,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',8,9,'2024-12-30 11:45:29.421','2024-12-30 11:42:42.609'),(38,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',6,13,'2024-12-30 11:45:29.421','2024-12-30 11:42:42.778'),(39,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',5,10,'2024-12-30 11:45:29.421','2024-12-30 11:42:42.926'),(40,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',6,13,'2024-12-30 11:45:29.421','2024-12-30 11:42:43.093'),(41,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',7,12,'2024-12-30 11:45:29.421','2024-12-30 11:42:43.277'),(42,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',4,11,'2024-12-30 11:45:29.421','2024-12-30 11:42:43.427'),(43,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',6,9,'2024-12-30 11:45:29.421','2024-12-30 11:42:43.593'),(44,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',5,10,'2024-12-30 11:45:29.421','2024-12-30 11:42:43.760'),(45,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',8,12,'2024-12-30 11:45:29.421','2024-12-30 11:42:43.944'),(46,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',7,13,'2024-12-30 11:45:29.421','2024-12-30 11:42:44.111'),(47,'Lesson 1 for Course 3','Learn the basics of JavaScript programming','https://vimeo.com/1037130772',3,14,'2024-12-30 11:45:29.421','2024-12-30 11:42:44.277'),(49,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:54.650'),(50,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:56.149'),(51,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:56.299'),(52,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:56.450'),(53,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:56.601'),(54,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:56.749'),(55,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:56.900'),(56,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:57.051'),(57,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:57.199'),(58,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:57.350'),(59,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:57.516'),(60,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:57.682'),(61,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:57.833'),(62,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:57.983'),(63,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:58.149'),(64,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:59.049'),(65,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:59.217'),(66,'Lesson 1 for Course 3',NULL,'https://vimeo.com/1037130767',NULL,7,'2025-03-06 08:44:29.600','2025-03-06 08:42:59.367');
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
  `content` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `senderId` int DEFAULT NULL,
  `receiverId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `conversationId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Message_senderId_fkey` (`senderId`),
  KEY `Message_receiverId_fkey` (`receiverId`),
  KEY `Message_conversationId_fkey` (`conversationId`),
  CONSTRAINT `Message_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=464 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES (426,'With the help of one of the IT technicians, the missing accounting files have been _____. A. recover B. recovers C. recovering D. recovered',137,NULL,'2025-03-09 20:52:47.055',26),(427,'giải thích câu trên ',137,NULL,'2025-03-09 20:52:58.204',26),(428,'Aurora Furnishings is finding it difficult to make a profit in its _____ competitive market. A. increases B. increased C. increasingly D. increase',137,NULL,'2025-03-09 20:54:03.594',26),(429,'bạn ăn cơm chưa ',137,NULL,'2025-03-09 20:54:14.027',26),(430,'giới thiệu cho mình khoá học toeic nào giành cho người mới ',137,NULL,'2025-03-09 20:55:17.636',26),(431,'yeah, gud, hãy tạo lộ trình học cá nhân hoá cho mình đi, trong 4 tháng để đạt được learning goals',137,NULL,'2025-03-09 20:56:47.933',26),(432,'bạn có thể vẽ ra cho mình dễ đọc không?',137,NULL,'2025-03-09 20:58:50.568',26),(433,'helo',137,NULL,'2025-03-09 21:00:02.010',25),(434,'có bao nhiêu ngày trong tháng 2 ',137,NULL,'2025-03-09 21:00:44.139',25),(435,'**February, the shortest month of the year!**\nThere are **28 days** in February, unless it\'s a leap year, then it has **29 days**!',NULL,NULL,'2025-03-09 21:00:44.744',25),(436,'vậy tháng 3? ',137,NULL,'2025-03-09 21:00:52.861',25),(437,'**March, the beginning of spring!**\nThere are **31 days** in March!',NULL,NULL,'2025-03-09 21:00:53.446',25),(438,'còn tháng 4',137,NULL,'2025-03-09 21:00:56.807',25),(439,'**April, the sweet month of spring!**\nThere are also **31 days** in April!',NULL,NULL,'2025-03-09 21:00:57.135',25),(440,'tháng 5',137,NULL,'2025-03-09 21:01:00.427',25),(441,'**May, the month of flowers and sunshine!**\nThere are **31 days** in May!',NULL,NULL,'2025-03-09 21:01:00.906',25),(442,'tháng 6',137,NULL,'2025-03-09 21:01:04.219',25),(443,'**June, the start of summer!**\nThere are **30 days** in June!',NULL,NULL,'2025-03-09 21:01:04.511',25),(444,'tháng 7',137,NULL,'2025-03-09 21:01:08.810',25),(445,'**July, the warmest month of the year!**\nThere are **31 days** in July!',NULL,NULL,'2025-03-09 21:01:09.321',25),(446,'ok',137,NULL,'2025-03-09 21:02:04.427',25),(447,'vậy được, nói anh nghe',137,NULL,'2025-03-09 21:03:44.128',25),(448,'**So, what\'s on your mind?**\nI\'m all ears! Share what\'s been going on, and let\'s chat!',NULL,NULL,'2025-03-09 21:03:44.868',25),(449,'ok',137,NULL,'2025-03-09 21:04:06.106',25),(450,'**It looks like you\'re ready to talk!**\nWhat\'s been going on in your life? Have you got a specific topic you\'d like to discuss or something on your mind? I\'m here to listen and help if I can!',NULL,NULL,'2025-03-09 21:04:06.612',25),(451,'giới thiệu khoá học ielts',137,NULL,'2025-03-09 21:11:33.366',25),(452,'hãy tạo lộ trình cá nhân hoá để mình đạt được learning goals trong 4 tháng',137,NULL,'2025-03-09 21:13:53.167',25),(453,'bạn trả lời rất tốt',137,NULL,'2025-03-09 21:16:02.264',25),(454,'bạn tình ơi ',137,NULL,'2025-03-09 21:21:30.007',25),(455,'a',137,NULL,'2025-03-09 21:21:51.622',25),(456,'ok',137,NULL,'2025-03-09 21:22:20.634',25),(457,'tell em choke',137,NULL,'2025-03-09 21:23:39.674',25),(458,'tell me joke',137,NULL,'2025-03-09 21:25:12.959',25),(459,'Here\'s one:\n\nWhy did the scarecrow win an award?\n\nBecause he was outstanding in his field!\n\nHope that made you smile! Do you want to hear another one?',NULL,NULL,'2025-03-09 21:25:13.703',25),(460,'one more',137,NULL,'2025-03-09 21:25:27.890',25),(461,'Here\'s another one:\n\nWhat do you call a fake noodle?\n\nAn impasta!\n\nHope that one made you giggle! Do you want to hear another one?',NULL,NULL,'2025-03-09 21:25:28.962',25),(462,'kể tên 10 con vâtk ',137,NULL,'2025-03-09 21:25:42.425',25),(463,'kể tên 10 con vật',137,NULL,'2025-03-09 21:27:51.529',25);
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
  `testScores` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Progress_enrollmentId_fkey` (`enrollmentId`),
  KEY `Progress_lessonId_fkey` (`lessonId`),
  KEY `Progress_userId_fkey` (`userId`),
  CONSTRAINT `Progress_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `Enrollment` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Progress_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Progress`
--

LOCK TABLES `Progress` WRITE;
/*!40000 ALTER TABLE `Progress` DISABLE KEYS */;
INSERT INTO `Progress` VALUES (14,1,1,1,' Bài Kiểm Tra Đầu Vào',NULL,0,NULL,'{}'),(15,1,1,1,' Bài Kiểm Tra Đầu Vào',NULL,0,NULL,'{\"2\": \"B\"}'),(16,1,1,1,' Bài Kiểm Tra Đầu Vào',NULL,33,NULL,'{\"1\": \"B\", \"2\": \"B\", \"3\": \"A\", \"4\": \"B\"}'),(17,137,1,1,' Bài Kiểm Tra Đầu Vào Từ Vựng',NULL,0,NULL,'{\"2\": \"D\"}'),(18,137,1,1,' Bài Kiểm Tra Đầu Vào Từ Vựng',NULL,0,NULL,'{\"2\": \"D\"}'),(19,137,1,1,' Bài Kiểm Tra Đầu Vào Từ Vựng',NULL,17,NULL,'{\"1\": \"D\"}'),(20,137,1,1,' Bài Kiểm Tra Đầu Vào Từ Vựng',NULL,17,NULL,'{\"1\": \"D\", \"2\": \"B\"}'),(21,137,1,1,' Bài Kiểm Tra Đầu Vào Từ Vựng',NULL,17,NULL,'{\"1\": \"D\", \"2\": \"D\"}'),(22,137,1,1,' Bài Kiểm Tra Đầu Vào Từ Vựng',NULL,17,NULL,'{\"1\": \"D\", \"2\": \"C\"}'),(23,137,1,1,' Bài Kiểm Tra Đầu Vào Từ Vựng',NULL,33,NULL,'{\"1\": \"D\", \"2\": \"A\"}');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Purchase`
--

LOCK TABLES `Purchase` WRITE;
/*!40000 ALTER TABLE `Purchase` DISABLE KEYS */;
INSERT INTO `Purchase` VALUES (1,135,1,2900000,'2025-01-12 17:17:21.398',0),(2,135,10,60000000,'2025-01-14 14:10:12.158',0),(3,135,10,60000000,'2025-01-14 14:11:09.465',0),(4,135,10,60000000,'2025-01-14 14:11:10.403',0),(5,135,10,60000000,'2025-01-14 14:11:16.751',0),(6,135,10,60000000,'2025-01-14 14:11:40.923',0),(7,135,10,60000000,'2025-01-14 19:24:26.988',0);
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
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefreshToken_token_key` (`token`),
  KEY `RefreshToken_userId_fkey` (`userId`),
  CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=353 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RefreshToken`
--

LOCK TABLES `RefreshToken` WRITE;
/*!40000 ALTER TABLE `RefreshToken` DISABLE KEYS */;
INSERT INTO `RefreshToken` VALUES (318,'77298d65-1dbb-42fe-8efd-35fe769d8310',1,'2025-01-17 09:31:03.580','2025-01-10 09:31:03.581'),(327,'5c7bb211-97a2-412b-90ad-24bc6a13f7c4',1,'2025-01-27 02:16:12.806','2025-01-20 02:16:12.807'),(328,'5cd1011c-1b41-4740-83b0-f16287166dbb',1,'2025-02-18 03:45:56.490','2025-02-11 03:45:56.492'),(352,'f340a5e7-32b9-4df2-a480-cca73cb66746',137,'2025-03-16 18:40:13.149','2025-03-09 18:40:13.149');
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
INSERT INTO `Review` VALUES (1,1,7,0,'ádasdf','2024-12-17 06:27:01.100'),(2,1,7,4,'sdfasdf','2024-12-17 06:29:32.588'),(3,1,8,4,'asdf','2024-12-19 12:20:34.748'),(4,1,8,4,'asdasdfasdf','2024-12-19 12:20:43.950'),(5,1,8,0,'ádf','2024-12-19 12:22:35.115'),(6,1,11,4,'dfa','2024-12-20 11:05:58.727'),(7,1,7,0,'và em tôi, lung linh giọt sương trắng\n','2024-12-24 04:03:40.953'),(8,1,7,0,'trong vời vợi ','2024-12-24 04:03:45.300'),(9,1,7,0,'em biết yêu rồi','2024-12-24 04:03:53.628'),(10,1,7,0,'asdf','2024-12-24 11:02:03.185'),(14,1,11,4,'ádfasdf','2024-12-30 11:39:18.212'),(15,1,11,0,'ádf','2024-12-30 11:39:21.087'),(17,1,7,0,'asdfasdqwerqwerqwe','2025-01-10 09:36:15.404'),(18,1,7,5,'asaaa','2025-01-10 09:36:23.070'),(19,1,7,0,'ádf','2025-01-10 09:52:26.520'),(20,135,1,0,'ádf','2025-01-12 03:06:20.442'),(21,135,1,0,'ádfasdf','2025-01-12 03:06:22.299'),(22,135,1,0,'qưerqwer','2025-01-12 03:06:23.767'),(23,135,1,0,'qưerqwerq','2025-01-12 03:06:25.870'),(24,135,1,0,'qưerqwer','2025-01-12 03:06:27.505'),(25,135,1,4,'qưerwer','2025-01-12 03:06:30.547'),(26,135,1,5,'ádfasdfwerfqw','2025-01-12 03:06:33.386'),(27,135,1,4,'jhg','2025-01-12 18:06:29.645');
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
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `emailCheckToken` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `assessmentTest` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `knownVocabulary` int DEFAULT NULL,
  `learningPurpose` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prioritySkills` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skillLevel` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specificGoals` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  KEY `User_roleId_fkey` (`roleId`),
  CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Admin','admin@alo.com','$2b$10$DJkyuBXbgM5rENGRqG5ye.wJi2wfds.EEqIcH7x.fnWFxu9P2BHuq',1,0,'2024-12-16 17:49:16.132','2025-03-08 11:29:28.936',1,'','Toeic 460',1000,'Thi Toeic','đọc + viết','reading kém','Toeic 700'),(135,'Nguyen Thanh Tung','1823603311790205','$2b$10$GqFxlwy0JP.Gj9av7o7YOOKHQy4.9OiTmod5W3KTZWZzzK7.pO3Yu',3,0,'2025-01-11 17:47:48.305','2025-03-06 19:58:27.459',1,'','Toeic 660',1000,'Thi Toeic','đọc + viết','nói viết kém','Toeic 700'),(136,'Nguyen Thanh Tung','ismethanhtung@gmail.com','$2b$10$PaB455zZMmg6vtNN4aUuw.JqiR21.BK0WGJkuI8i0fsE0PGAKrugy',3,0,'2025-03-06 08:46:04.787','2025-03-06 08:46:04.787',1,'',NULL,NULL,NULL,NULL,NULL,NULL),(137,'Thanh Tung Nguyen','vivathanhtung@gmail.com','$2b$10$4V2V.44mHs7.AtN3Prmtau8QLyPQw9kR89jE4Eam0U0h/MzKIyupK',3,0,'2025-03-09 17:51:48.803','2025-03-09 17:51:48.803',1,'',NULL,NULL,NULL,NULL,NULL,NULL);
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

--
-- Table structure for table `Voucher`
--

DROP TABLE IF EXISTS `Voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Voucher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int NOT NULL,
  `maxDiscount` int DEFAULT NULL,
  `minPurchase` int DEFAULT NULL,
  `validFrom` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `validTo` datetime(3) NOT NULL,
  `usageCount` int NOT NULL DEFAULT '0',
  `maxUsage` int DEFAULT NULL,
  `userSpecific` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Voucher_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Voucher`
--

LOCK TABLES `Voucher` WRITE;
/*!40000 ALTER TABLE `Voucher` DISABLE KEYS */;
/*!40000 ALTER TABLE `Voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-10  4:30:20

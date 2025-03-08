-- AlterTable
ALTER TABLE `Course` ADD COLUMN `tags` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Progress` ADD COLUMN `testScores` JSON NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `assessmentTest` VARCHAR(191) NULL,
    ADD COLUMN `knownVocabulary` INTEGER NULL,
    ADD COLUMN `learningPurpose` VARCHAR(191) NULL,
    ADD COLUMN `prioritySkills` VARCHAR(191) NULL,
    ADD COLUMN `skillLevel` VARCHAR(191) NULL,
    ADD COLUMN `specificGoals` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `LearningPath` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `recommendedBy` VARCHAR(191) NULL,
    `pathDetails` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `LearningPath_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LearningPath` ADD CONSTRAINT `LearningPath_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

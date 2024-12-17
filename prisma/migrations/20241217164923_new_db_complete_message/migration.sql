/*
  Warnings:

  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `settingsId` on the `User` table. All the data in the column will be lost.
  - Added the required column `conversationId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_userId_fkey`;

-- DropIndex
DROP INDEX `User_settingsId_key` ON `User`;

-- AlterTable
ALTER TABLE `Course` MODIFY `title` VARCHAR(255) NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `objectives` TEXT NULL,
    MODIFY `createdAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `userId`,
    ADD COLUMN `conversationId` INTEGER NOT NULL,
    MODIFY `receiverId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `settingsId`;

-- CreateTable
CREATE TABLE `Conversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `Conversation_createdAt_fkey`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserConversations` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserConversations_AB_unique`(`A`, `B`),
    INDEX `_UserConversations_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Message_conversationId_fkey` ON `Message`(`conversationId`);

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserConversations` ADD CONSTRAINT `_UserConversations_A_fkey` FOREIGN KEY (`A`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserConversations` ADD CONSTRAINT `_UserConversations_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

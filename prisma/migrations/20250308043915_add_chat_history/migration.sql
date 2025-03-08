/*
  Warnings:

  - You are about to drop the `_UserConversations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `_UserConversations` DROP FOREIGN KEY `_UserConversations_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserConversations` DROP FOREIGN KEY `_UserConversations_B_fkey`;

-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Message` MODIFY `senderId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Progress` ADD COLUMN `testScores` JSON NULL;

-- DropTable
DROP TABLE `_UserConversations`;

-- CreateIndex
CREATE INDEX `Conversation_userId_fkey` ON `Conversation`(`userId`);

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

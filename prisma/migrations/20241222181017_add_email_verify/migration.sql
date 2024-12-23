/*
  Warnings:

  - Added the required column `emailCheckToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `emailCheckToken` VARCHAR(191) NOT NULL;

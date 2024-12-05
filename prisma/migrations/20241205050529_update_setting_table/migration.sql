/*
  Warnings:

  - A unique constraint covering the columns `[settingsId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "settingsId" INTEGER;

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phone" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "notifications" TEXT NOT NULL,
    "learningGoals" INTEGER NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'light',
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_settingsId_key" ON "User"("settingsId");

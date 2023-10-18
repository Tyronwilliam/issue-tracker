/*
  Warnings:

  - You are about to drop the column `userId` on the `issue` table. All the data in the column will be lost.
  - You are about to drop the `issueassignee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `issueassignee` DROP FOREIGN KEY `IssueAssignee_issueId_fkey`;

-- DropForeignKey
ALTER TABLE `issueassignee` DROP FOREIGN KEY `IssueAssignee_userId_fkey`;

-- AlterTable
ALTER TABLE `issue` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `issueassignee`;

-- CreateTable
CREATE TABLE `_IssueToUser` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_IssueToUser_AB_unique`(`A`, `B`),
    INDEX `_IssueToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_IssueToUser` ADD CONSTRAINT `_IssueToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Issue`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IssueToUser` ADD CONSTRAINT `_IssueToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

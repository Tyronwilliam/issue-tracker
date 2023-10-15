-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assignToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignToUserId_fkey` FOREIGN KEY (`assignToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

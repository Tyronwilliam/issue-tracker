-- AlterTable
ALTER TABLE `issue` ADD COLUMN `projectId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

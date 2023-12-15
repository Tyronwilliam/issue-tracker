-- CreateTable
CREATE TABLE `CategorieCustom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `hexCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CategorieCustom_hexCode_key`(`hexCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategorieCustomToIssue` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategorieCustomToIssue_AB_unique`(`A`, `B`),
    INDEX `_CategorieCustomToIssue_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategorieCustomToIssue` ADD CONSTRAINT `_CategorieCustomToIssue_A_fkey` FOREIGN KEY (`A`) REFERENCES `CategorieCustom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategorieCustomToIssue` ADD CONSTRAINT `_CategorieCustomToIssue_B_fkey` FOREIGN KEY (`B`) REFERENCES `Issue`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

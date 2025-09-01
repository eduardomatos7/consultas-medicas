-- CreateTable
CREATE TABLE `specialties` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `specialties_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

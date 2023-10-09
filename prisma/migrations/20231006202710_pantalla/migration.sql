/*
  Warnings:

  - You are about to drop the column `screen` on the `pantalla` table. All the data in the column will be lost.
  - Added the required column `name` to the `Pantalla` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resolution` to the `Pantalla` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pantalla` DROP COLUMN `screen`,
    ADD COLUMN `hdmiConnected` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `resolution` VARCHAR(191) NOT NULL;

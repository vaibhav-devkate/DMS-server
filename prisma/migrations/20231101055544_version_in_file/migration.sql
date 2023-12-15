/*
  Warnings:

  - Added the required column `version` to the `fileversion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fileversion" ADD COLUMN     "version" INTEGER NOT NULL;

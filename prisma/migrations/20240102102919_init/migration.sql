/*
  Warnings:

  - Added the required column `value` to the `RelatedDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RelatedDocument" ADD COLUMN     "value" INTEGER NOT NULL;

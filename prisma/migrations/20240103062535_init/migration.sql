/*
  Warnings:

  - You are about to drop the column `name` on the `RelatedDocument` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `RelatedDocument` table. All the data in the column will be lost.
  - Added the required column `pdfid` to the `RelatedDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RelatedDocument" DROP COLUMN "name",
DROP COLUMN "value",
ADD COLUMN     "pdfid" INTEGER NOT NULL;

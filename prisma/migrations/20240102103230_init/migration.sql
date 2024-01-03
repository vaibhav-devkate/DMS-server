/*
  Warnings:

  - Added the required column `maindocid` to the `RelatedDocument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RelatedDocument" DROP CONSTRAINT "RelatedDocument_id_fkey";

-- AlterTable
ALTER TABLE "RelatedDocument" ADD COLUMN     "maindocid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "RelatedDocument" ADD CONSTRAINT "RelatedDocument_maindocid_fkey" FOREIGN KEY ("maindocid") REFERENCES "pdf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

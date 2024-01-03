-- CreateTable
CREATE TABLE "RelatedDocument" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RelatedDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RelatedDocument" ADD CONSTRAINT "RelatedDocument_id_fkey" FOREIGN KEY ("id") REFERENCES "pdf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

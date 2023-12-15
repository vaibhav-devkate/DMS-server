-- CreateTable
CREATE TABLE "PdfFile" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "PdfFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fileversion" (
    "id" SERIAL NOT NULL,
    "pdfFileId" INTEGER NOT NULL,
    "pdfname" TEXT NOT NULL,
    "pdfdata" BYTEA NOT NULL,
    "pdftype" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fileversion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fileversion" ADD CONSTRAINT "fileversion_pdfFileId_fkey" FOREIGN KEY ("pdfFileId") REFERENCES "PdfFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

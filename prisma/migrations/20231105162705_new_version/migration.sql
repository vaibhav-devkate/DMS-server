-- CreateTable
CREATE TABLE "pdf" (
    "id" SERIAL NOT NULL,
    "pdfname" TEXT NOT NULL,
    "pdfdata" BYTEA NOT NULL,
    "pdftype" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pdf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "version" (
    "id" SERIAL NOT NULL,
    "fileid" INTEGER NOT NULL,
    "pdfname" TEXT NOT NULL,
    "pdfdata" BYTEA NOT NULL,
    "pdftype" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "version_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "version" ADD CONSTRAINT "version_fileid_fkey" FOREIGN KEY ("fileid") REFERENCES "pdf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

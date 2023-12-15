-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "filedata" BYTEA NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

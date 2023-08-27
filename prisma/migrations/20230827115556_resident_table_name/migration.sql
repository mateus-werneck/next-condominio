/*
  Warnings:

  - You are about to drop the `Resident` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Resident";

-- CreateTable
CREATE TABLE "residents" (
    "id_resident" TEXT NOT NULL,
    "name_resident" VARCHAR(50) NOT NULL,
    "email_resident" VARCHAR(50),
    "phone_resident" VARCHAR(20),
    "apartment_resident" INTEGER NOT NULL,
    "insertdate_resident" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedate_resident" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "residents_pkey" PRIMARY KEY ("id_resident")
);

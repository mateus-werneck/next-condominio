-- CreateTable
CREATE TABLE "Resident" (
    "id_resident" TEXT NOT NULL,
    "name_resident" VARCHAR(50) NOT NULL,
    "email_resident" VARCHAR(50),
    "phone_resident" VARCHAR(20),
    "apartment_resident" INTEGER NOT NULL,
    "insertdate_resident" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedate_resident" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id_resident")
);

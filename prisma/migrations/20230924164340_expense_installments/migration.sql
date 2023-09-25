-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "installments_expense" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "payment_type_expense" VARCHAR(256) DEFAULT 'À vista';

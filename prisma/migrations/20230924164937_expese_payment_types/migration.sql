/*
  Warnings:

  - Made the column `payment_type_expense` on table `expenses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "payment_type_expense" SET NOT NULL,
ALTER COLUMN "payment_type_expense" SET DEFAULT 'À Vista';

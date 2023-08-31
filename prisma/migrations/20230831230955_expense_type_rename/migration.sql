/*
  Warnings:

  - You are about to drop the `ExpenseType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_type_expense_fkey";

-- DropTable
DROP TABLE "ExpenseType";

-- CreateTable
CREATE TABLE "expense_types" (
    "id_type" TEXT NOT NULL,
    "name_expense" VARCHAR(256) NOT NULL,
    "label_expense" VARCHAR(256) NOT NULL,

    CONSTRAINT "expense_types_pkey" PRIMARY KEY ("id_type")
);

-- CreateIndex
CREATE UNIQUE INDEX "expense_types_name_expense_key" ON "expense_types"("name_expense");

-- CreateIndex
CREATE UNIQUE INDEX "expense_types_label_expense_key" ON "expense_types"("label_expense");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_type_expense_fkey" FOREIGN KEY ("type_expense") REFERENCES "expense_types"("id_type") ON DELETE RESTRICT ON UPDATE CASCADE;

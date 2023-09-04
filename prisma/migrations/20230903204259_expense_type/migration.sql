/*
  Warnings:

  - You are about to drop the column `label_expense` on the `expense_types` table. All the data in the column will be lost.
  - You are about to drop the column `name_expense` on the `expense_types` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name_type]` on the table `expense_types` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label_type]` on the table `expense_types` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label_type` to the `expense_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_type` to the `expense_types` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_type_expense_fkey";

-- DropIndex
DROP INDEX "expense_types_label_expense_key";

-- DropIndex
DROP INDEX "expense_types_name_expense_key";

-- AlterTable
ALTER TABLE "expense_types" DROP COLUMN "label_expense",
DROP COLUMN "name_expense",
ADD COLUMN     "label_type" VARCHAR(256) NOT NULL,
ADD COLUMN     "name_type" VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "type_expense" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "expense_types_name_type_key" ON "expense_types"("name_type");

-- CreateIndex
CREATE UNIQUE INDEX "expense_types_label_type_key" ON "expense_types"("label_type");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_type_expense_fkey" FOREIGN KEY ("type_expense") REFERENCES "expense_types"("id_type") ON DELETE SET NULL ON UPDATE CASCADE;

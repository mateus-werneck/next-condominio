-- CreateTable
CREATE TABLE "expenses" (
    "id_expense" TEXT NOT NULL,
    "name_expense" VARCHAR(256) NOT NULL,
    "value_expense" MONEY NOT NULL,
    "duedate_expense" DATE NOT NULL,
    "type_expense" VARCHAR(256) NOT NULL,
    "insertdate_expense" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedate_expense" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id_expense")
);

-- CreateTable
CREATE TABLE "ExpenseType" (
    "id_type" TEXT NOT NULL,
    "name_expense" VARCHAR(256) NOT NULL,
    "label_expense" VARCHAR(256) NOT NULL,

    CONSTRAINT "ExpenseType_pkey" PRIMARY KEY ("id_type")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseType_name_expense_key" ON "ExpenseType"("name_expense");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseType_label_expense_key" ON "ExpenseType"("label_expense");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_type_expense_fkey" FOREIGN KEY ("type_expense") REFERENCES "ExpenseType"("id_type") ON DELETE RESTRICT ON UPDATE CASCADE;

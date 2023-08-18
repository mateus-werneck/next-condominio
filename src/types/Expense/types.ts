import { ExpenseType } from '@prisma/client';

export type CreateExpense = {
  name: string;
  value: number;
  dueDate: Date;
  type: string;
};

export interface ExpenseDto {
  name: string;
  value: number;
  dueDate: string;
  type: string;
  expenseType: ExpenseType;
}

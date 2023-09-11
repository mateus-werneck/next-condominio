import { ExpenseType } from '@prisma/client';

export type CreateExpense = {
  name: string;
  value: number;
  dueDate: Date;
  type: string;
};

export interface ExpenseDto {
  id?: string;
  name: string;
  value: string;
  dueDate: string;
  type: string;
  expenseType: ExpenseType;
}

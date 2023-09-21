import { Expense } from '@prisma/client';

export type CreateExpense = {
  name: string;
  value: number;
  dueDate: Date;
  type: string;
};

export interface ExpenseDto extends Omit<Expense, 'dueDate'> {
  dueDate: string;
}

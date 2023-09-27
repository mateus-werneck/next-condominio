import { Expense } from '@prisma/client';

export interface UpdateExpense
  extends Omit<Expense, 'createdAt' | 'updatedAt' | 'value'> {
  value: number;
}

export type CreateExpense = Omit<UpdateExpense, 'id'>;

export interface ExpenseDto extends Omit<Expense, 'dueDate'> {
  dueDate: string;
}

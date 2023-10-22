import { Expense } from '@prisma/client';
import { MoneyUtil } from '../Money';
import { DateUtil } from '../Date';
import { ExpenseDto } from '@Types/Expense/types';

export function treatOne(expense: Expense): ExpenseDto {
  const { value, dueDate } = expense;
  return {
    ...expense,
    value: MoneyUtil.toBRL(Number(value)),
    dueDate: DateUtil.toLocalePtBr(dueDate)
  };
}

export function treatMany(expenses: Expense[]): ExpenseDto[] {
  return expenses.map(treatOne);
}

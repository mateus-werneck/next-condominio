import { IExpenseQueryParams } from '@Components/Views/Expenses/types';
import { appendQueryParams } from '@Lib/Treat/Request';
import { ExpenseDto } from '@Types/Expense/types';
import { ExpenseType } from '@prisma/client';

export const fetchExpenses = async (
  searchParams: IExpenseQueryParams
): Promise<ExpenseDto[]> => {
  const url = appendQueryParams(
    `${process.env.SYSTEM_URL}/api/expenses`,
    searchParams
  );

  const response = await fetch(url.toString(), {
    next: { revalidate: 0 }
  });

  return await response.json();
};

export const fetchExpense = async (id: string): Promise<ExpenseDto> => {
  const url = `${process.env.SYSTEM_URL}/api/expenses/${id}`;

  const response = await fetch(url, {
    next: { revalidate: 0 }
  });

  const expense = await response.json();

  return expense;
};

export const fetchTypes = async (): Promise<ExpenseType[]> => {
  const response = await fetch(`${process.env.SYSTEM_URL}/api/expenses/types`, {
    next: { revalidate: 0 }
  });

  return await response.json();
};

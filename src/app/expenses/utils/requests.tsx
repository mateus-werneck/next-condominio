import { DateUtil, MonthRange } from '@Lib/Treat/Date';
import { appendQueryParams } from '@Lib/Treat/Request';
import { ExpenseDto } from '@Types/Expense/types';
import { Expense, ExpenseType } from '@prisma/client';

export const fetchExpenses = async (
  monthRange: MonthRange
): Promise<Expense[]> => {
  const url = appendQueryParams(`${process.env.SYSTEM_URL}/api/expenses`, {
    startAt: DateUtil.fromDateToIsoString(monthRange.startAt),
    endAt: DateUtil.fromDateToIsoString(monthRange.endAt)
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 1 }
  });

  return await response.json();
};

export const fetchExpense = async (id: string): Promise<ExpenseDto> => {
  const url = `${process.env.SYSTEM_URL}/api/expenses/${id}`;

  const response = await fetch(url, {
    next: { revalidate: 1 }
  });

  return await response.json();
};

export const fetchTypes = async (): Promise<ExpenseType[]> => {
  const response = await fetch(`${process.env.SYSTEM_URL}/api/expenses/types`, {
    next: { revalidate: 1 }
  });

  return await response.json();
};

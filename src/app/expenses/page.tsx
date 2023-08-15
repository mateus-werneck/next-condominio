import ViewExpenses from '@Components/Views/Expenses';
import { DateUtil, MonthRange } from '@Lib/Treat/Date';
import { appendQueryParams } from '@Lib/Treat/Request';
import { ExpenseType } from '@prisma/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Despesas'
};

const fetchExpenses = async (monthRange: MonthRange): Promise<any[]> => {
  const url = appendQueryParams('http://localhost/api/expenses', {
    startAt: DateUtil.toIsoStringDate(monthRange.startAt),
    endAt: DateUtil.toIsoStringDate(monthRange.endAt)
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 1 }
  });

  return await response.json();
};

const fetchTypes = async (): Promise<ExpenseType[]> => {
  const response = await fetch('http://localhost/api/expenses/types', {
    next: { revalidate: 1 }
  });

  return await response.json();
};

export default async function Expenses() {
  const monthRange = DateUtil.getMonthRange();
  const rows = await fetchExpenses(monthRange);
  const expenseTypes = await fetchTypes();

  return (
    <ViewExpenses
      rows={rows}
      monthRange={monthRange}
      expenseTypes={expenseTypes}
    />
  );
}

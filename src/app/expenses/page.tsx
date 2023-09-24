import ViewExpenses from '@Components/Views/Expenses';
import { DateUtil } from '@Lib/Treat/Date';
import { isValidUUID } from '@Lib/Treat/String';
import { ExpenseDto } from '@Types/Expense/types';
import { Metadata } from 'next';
import { fetchExpense, fetchExpenses, fetchTypes } from './utils/requests';

export const metadata: Metadata = {
  title: 'Despesas'
};

interface ISearchParams {
  id?: string;
  startAt?: string;
  endAt?: string;
  name?: string;
  expenseTypes?: string;
}

interface IExpense {
  searchParams?: ISearchParams;
}

export default async function Expenses({ searchParams }: IExpense) {
  const monthRange = DateUtil.getMonthRange();

  if (searchParams?.startAt) {
    monthRange.startAt = DateUtil.toDateObject(searchParams.startAt);
  }

  if (searchParams?.endAt) {
    monthRange.endAt = DateUtil.toDateObject(searchParams.endAt);
  }

  const rows = await fetchExpenses(monthRange);
  const expenseTypes = await fetchTypes();

  const id = searchParams?.id ?? '';
  let editRow = null;

  if (isValidUUID(id)) {
    const expense = await fetchExpense(id);
    editRow = expense.id ? expense : null;
  }

  if (id == 'new') {
    editRow = {} as ExpenseDto;
  }

  return (
    <ViewExpenses
      searchParams={{
        ...searchParams,
        startAt: DateUtil.toISOString(monthRange.startAt),
        endAt: DateUtil.toISOString(monthRange.endAt)
      }}
      rows={rows}
      expenseTypes={expenseTypes}
      editRow={editRow}
    />
  );
}

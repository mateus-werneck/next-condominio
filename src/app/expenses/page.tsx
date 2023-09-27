import ViewExpenses from '@Components/Views/Expenses';
import { IExpenseQueryParams } from '@Components/Views/Expenses/types';
import {
  fetchExpense,
  fetchExpenses,
  fetchExpenseTypes
} from '@Lib/Requests/expenses';
import { DateUtil } from '@Lib/Treat/Date';
import { isValidUUID } from '@Lib/Treat/String';
import { ExpenseDto } from '@Types/Expense/types';
import { Metadata } from 'next';

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

  const filters: IExpenseQueryParams = {
    startAt: searchParams?.startAt ?? DateUtil.toISOString(monthRange.startAt),
    endAt: searchParams?.endAt ?? DateUtil.toISOString(monthRange.endAt),
    name: searchParams?.name ?? '',
    expenseTypes: searchParams?.expenseTypes ?? ''
  };

  const rows = await fetchExpenses(filters);
  const expenseTypes = await fetchExpenseTypes();

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
      filters={filters}
      rows={rows}
      expenseTypes={expenseTypes}
      editRow={editRow}
    />
  );
}

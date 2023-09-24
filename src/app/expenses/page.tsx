import ViewExpenses from '@Components/Views/Expenses';
import { DateUtil } from '@Lib/Treat/Date';
import { Metadata } from 'next';
import { fetchExpense, fetchExpenses, fetchTypes } from './utils/requests';
import ExpenseForm from '@Components/Forms/Expenses/Edit';
import { ExpenseDto } from '@Types/Expense/types';
import { isValidUUID } from '@Lib/Treat/String';

export const metadata: Metadata = {
  title: 'Despesas'
};

interface ISearchParams {
  id?: string;
}

interface IExpense {
  searchParams?: ISearchParams;
}

export default async function Expenses({ searchParams }: IExpense) {
  const monthRange = DateUtil.getMonthRange();
  const rows = await fetchExpenses(monthRange);
  const expenseTypes = await fetchTypes();

  const id = searchParams?.id ?? '';
  const expense = isValidUUID(id) ? await fetchExpense(id) : ({} as ExpenseDto);

  if (id == 'new' || expense.id !== undefined) {
    const title = id == 'new' ? 'Cadastrar' : 'Editar';

    return (
      <div className="flex flex-col gap-1 mt-4">
        <h1 className="text-bold text-2x">{title}</h1>
        <ExpenseForm expense={expense} expenseTypes={expenseTypes} />
      </div>
    );
  }

  return (
    <ViewExpenses
      rows={rows}
      monthRange={monthRange}
      expenseTypes={expenseTypes}
    />
  );
}

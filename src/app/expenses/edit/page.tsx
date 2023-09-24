import ExpenseForm from '@Components/Forms/Expenses/Edit';
import { DateUtil } from '@Lib/Treat/Date';
import { isValidUUID } from '@Lib/Treat/String';
import { ExpenseDto } from '@Types/Expense/types';
import { notFound } from 'next/navigation';
import { fetchExpense, fetchTypes } from '../utils/requests';

interface IEditExpense {
  searchParams: {
    id: string;
  };
}

export default async function EditExpense({ searchParams }: IEditExpense) {
  let expense = {} as ExpenseDto;

  if (isValidUUID(searchParams.id)) {
    expense = await fetchExpense(searchParams.id);
  }

  if (!expense.id && searchParams.id != 'new') {
    notFound();
  }

  const expenseTypes = await fetchTypes();

  return (
    <div className="flex flex-col gap-1 mt-4">
      <h2 className="font-bold text-slate-700 text-sm">
        {searchParams.id == 'new'
          ? 'Nova Despesa'
          : `Despesa #${expense.name} - ${DateUtil.toLocalePtBr(
              expense.dueDate
            )}`}
      </h2>
      <ExpenseForm expense={expense} expenseTypes={expenseTypes} />
    </div>
  );
}

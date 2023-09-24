import ExpenseForm from '@Components/Forms/Expenses/Edit';
import { DateUtil } from '@Lib/Treat/Date';
import { isValidUUID } from '@Lib/Treat/String';
import { ExpenseDto } from '@Types/Expense/types';
import { notFound } from 'next/navigation';
import { fetchExpense, fetchTypes } from '../../utils/requests';

interface IEditExpense {
  params: {
    id: string;
  };
}

export default async function EditExpense({ params }: IEditExpense) {
  let expense = {} as ExpenseDto;

  if (isValidUUID(params.id)) {
    expense = await fetchExpense(params.id);
  }

  if (!expense.id && params.id != 'new') {
    notFound();
  }

  const expenseTypes = await fetchTypes();

  return (
    <div className="flex flex-col gap-1 mt-4">
      <h2 className="font-bold text-slate-700 text-sm">
        {params.id == 'new'
          ? 'Nova Despesa'
          : `Despesa #${expense.name} - ${DateUtil.toLocalePtBr(
              expense.dueDate
            )}`}
      </h2>
      <ExpenseForm expense={expense} expenseTypes={expenseTypes} />
    </div>
  );
}
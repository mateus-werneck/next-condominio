import ExpenseForm from '@Components/Forms/Expenses/Edit';
import { ExpenseDto } from '@Types/Expense/types';
import { fetchExpense, fetchTypes } from '../utils/requests';

interface ISearchParams {
  id?: string;
}

interface IExpense {
  params: {
    type: string;
  };
  searchParams?: ISearchParams;
}

export default async function Expense({ params, searchParams }: IExpense) {
  const title = params.type == 'new' ? 'Cadastrar' : 'Editar';

  let expense = {} as ExpenseDto;

  if (params.type != 'new' && searchParams?.id) {
    expense = await fetchExpense(searchParams.id);
  }

  const expenseTypes = await fetchTypes();

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-bold text-2x">{title}</h1>
      <ExpenseForm expense={expense} expenseTypes={expenseTypes} />
    </div>
  );
}

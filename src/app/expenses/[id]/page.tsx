import ExpenseForm from '@Components/Forms/Expenses/Create';
import { fetchTypes } from '../utils/expenses';

interface IExpense {
  params: {
    id: string;
  };
}

export default async function Event({ params }: IExpense) {
  let title = 'Editar';
  const expenseTypes = await fetchTypes();

  if (params.id == 'new') {
    title = 'Cadastrar';
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-bold text-2x">{title}</h1>
      <ExpenseForm expenseTypes={expenseTypes} />
    </div>
  );
}

import CreateExpenseForm from '@Components/Forms/Expenses/Create';

interface IExpense {
  params: {
    id: string;
  };
}

export default function Event({ params }: IExpense) {
  if (params.id == 'new') {
    return (
      <div className="flex flex-col gap-1">
        <h1 className="text-bold text-2x">Cadastrar</h1>
        <CreateExpenseForm />
      </div>
    );
  }

  return <></>;
}

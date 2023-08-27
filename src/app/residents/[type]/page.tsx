import ResidentForm from '@Components/Forms/Resident/Edit';
import { Resident } from '@prisma/client';
import { fetchResident } from '../utils/requests';

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

  let resident = {} as Resident;

  if (params.type != 'new' && searchParams?.id) {
    resident = await fetchResident(searchParams.id);
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-bold text-2x">{title}</h1>
      <ResidentForm resident={resident} />
    </div>
  );
}

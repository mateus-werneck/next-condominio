import ResidentForm from '@Components/Forms/Resident/Edit';
import { isValidUUID } from '@Lib/Treat/String';
import { Resident } from '@prisma/client';
import { notFound } from 'next/navigation';
import { fetchResident } from '../../utils/requests';

interface IResident {
  params: {
    id: string;
  };
}

export default async function EditResident({ params }: IResident) {
  let resident = {} as Resident;

  if (isValidUUID(params.id)) {
    resident = await fetchResident(params.id);
  }

  if (!resident.id && params.id != 'new') {
    notFound();
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-bold text-slate-700 text-sm">
        {' '}
        {params.id == 'new'
          ? 'Adicionar Morador'
          : `Apartmento #${resident.apartment}`}
      </h1>
      <ResidentForm resident={resident} />
    </div>
  );
}

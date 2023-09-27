import ViewResidents from '@Components/Views/Residents';
import { fetchResident, fetchResidents } from '@Lib/Requests/residents';
import { isValidUUID } from '@Lib/Treat/String';
import { Resident } from '@prisma/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moradores'
};

interface ISearchParams {
  id?: string;
}

interface IResident {
  searchParams?: ISearchParams;
}

export default async function Residents({ searchParams }: IResident) {
  const rows = await fetchResidents();

  const id = searchParams?.id ?? '';
  let editRow = null;

  if (isValidUUID(id)) {
    const expense = await fetchResident(id);
    editRow = expense.id ? expense : null;
  }

  if (id == 'new') {
    editRow = {} as Resident;
  }

  return (
    <>
      <ViewResidents rows={rows} editRow={editRow} />
    </>
  );
}

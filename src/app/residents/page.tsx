import TableListResidents from '@Components/Tables/Residents';
import { Metadata } from 'next';
import { fetchResidents } from './utils/requests';

export const metadata: Metadata = {
  title: 'Moradores'
};

export default async function Residents() {
  const rows = await fetchResidents();
  return (
    <>
      <TableListResidents rows={rows} />
    </>
  );
}

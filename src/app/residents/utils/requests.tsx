import { Resident } from '@prisma/client';

export const fetchResidents = async (): Promise<Resident[]> => {
  const response = await fetch(`${process.env.SYSTEM_URL}/api/residents`, {
    next: { revalidate: 0 }
  });

  return await response.json();
};

export const fetchResident = async (id: string): Promise<Resident> => {
  const url = `${process.env.SYSTEM_URL}/api/residents/${id}`;

  const response = await fetch(url, {
    next: { revalidate: 1 }
  });

  return await response.json();
};

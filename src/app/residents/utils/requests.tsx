import { Resident } from '@prisma/client';

export const fetchResidents = async (): Promise<Resident[]> => {
  const response = await fetch(`${process.env.SYSTEM_URL}/api/residents`, {
    next: { revalidate: 0 }
  });

  return await response.json();
};

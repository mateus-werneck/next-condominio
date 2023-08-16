import { ExpenseType } from '@prisma/client';

export const fetchTypes = async (): Promise<ExpenseType[]> => {
  const response = await fetch('http://localhost/api/expenses/types', {
    next: { revalidate: 1 }
  });

  return await response.json();
};

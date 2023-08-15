import { IExpensesFilters } from '@Components/Views/Expenses/types';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

interface Expense {
  id?: number;
  name: string;
  value: number;
  status: string;
  type: string;
  dueDate: string;
}

type IRequestFilters = Omit<IExpensesFilters, 'expenseType'>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filters: IRequestFilters = {
    startAt: String(searchParams.get('startAt')),
    endAt: String(searchParams.get('endAt')),
    name: String(searchParams.get('name'))
  };

  const expenses = await loadLocalFile(filters);
  return NextResponse.json(expenses);
}

async function loadLocalFile({
  startAt,
  endAt
}: IRequestFilters): Promise<Expense[]> {
  const jsonDirectory = path.join(process.cwd(), 'public');

  const fileContent = await fs.readFile(
    `${jsonDirectory}/expenses.json`,
    'utf-8'
  );

  const expenses = JSON.parse(fileContent).map(
    (expense: Expense, index: number) => {
      return {
        id: index,
        ...expense
      };
    }
  );

  if (!startAt && !endAt) {
    return expenses;
  }

  return expenses.filter(
    ({ dueDate }: Expense) => dueDate >= startAt && dueDate <= endAt
  );
}

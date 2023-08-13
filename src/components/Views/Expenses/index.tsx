'use client';
import { useState } from 'react';
import ListExpensesForm from '@Components/Forms/Expenses/List';
import TableListExpenses from '@Components/Tables/Expenses';
import { MonthRange } from '@Utils/Date';

interface IViewExpenses {
  monthRange: MonthRange;
  rows: any[];
}

export interface IExpensesFilters {
  startAt: string;
  endAt: string;
  name: string | null;
}

export default function ViewExpenses({ monthRange, rows }: IViewExpenses) {
  const [expenses, setExpenses] = useState<any[]>(rows);

  async function onFormSubmit({
    startAt,
    endAt,
    name
  }: IExpensesFilters): Promise<void> {
    // await new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 3000);
    // });
    const url = new URL(`${process.env.NEXT_PUBLIC_SYSTEM_URL}/api/expenses`);

    url.searchParams.append('startAt', startAt);
    url.searchParams.append('endAt', endAt);
    url.searchParams.append('name', String(name));

    const response = await fetch(url.toString());
    const data = await response.json();

    setExpenses(data as any[]);
  }

  return (
    <>
      <ListExpensesForm monthRange={monthRange} onFormSubmit={onFormSubmit} />
      <TableListExpenses rows={expenses} />
    </>
  );
}

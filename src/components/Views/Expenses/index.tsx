'use client';
import ListExpensesForm from '@Components/Forms/Expenses/List';
import TableListExpenses from '@Components/Tables/Expenses';
import { MonthRange } from '@Utils/Date';
import { appendQueryParams } from '@Utils/Request';
import { useState } from 'react';
import { IExpensesFilters } from './types';

interface IViewExpenses {
  monthRange: MonthRange;
  rows: any[];
}

export default function ViewExpenses({ monthRange, rows }: IViewExpenses) {
  const [expenses, setExpenses] = useState<any[]>(rows);

  async function onFormSubmit(filters: IExpensesFilters): Promise<void> {
    const route = appendQueryParams(
      `${process.env.NEXT_PUBLIC_SYSTEM_URL}/api/expenses`,
      filters
    );

    const response = await fetch(route);
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

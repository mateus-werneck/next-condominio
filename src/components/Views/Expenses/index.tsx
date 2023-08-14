'use client';
import ListExpensesForm from '@Components/Forms/Expenses/List';
import { ISelectOption } from '@Components/Structure/Form/Select/types';
import TableListExpenses from '@Components/Tables/Expenses';
import { MonthRange } from '@Utils/Date';
import { appendQueryParams } from '@Utils/Request';
import { useState } from 'react';

interface IViewExpenses {
  monthRange: MonthRange;
  rows: any[];
}

export interface IExpensesFilters {
  startAt: string;
  endAt: string;
  name: string | null;
  expenseType: ISelectOption;
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

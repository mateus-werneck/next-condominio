'use client';
import ListExpensesForm from '@Components/Forms/Expenses/List';
import TableListExpenses from '@Components/Tables/Expenses';
import { MonthRange } from '@Lib/Treat/Date';
import { appendQueryParams } from '@Lib/Treat/Request';
import { Expense, ExpenseType } from '@prisma/client';
import { useState } from 'react';
import { IExpenseQueryParams, IExpensesFilters } from './types';

interface IViewExpenses {
  monthRange: MonthRange;
  expenseTypes: ExpenseType[];
  rows: any[];
}

export default function ViewExpenses({
  monthRange,
  expenseTypes,
  rows
}: IViewExpenses) {
  const [expenses, setExpenses] = useState<Expense[]>(rows);
  const [loading, setIsLoading] = useState<boolean>(false);

  async function onFormSubmit(filters: IExpensesFilters): Promise<void> {
    setIsLoading(true);

    const expenseTypeFilter = filters.expenseTypes ? filters.expenseTypes : [];

    const queryParams: IExpenseQueryParams = {
      ...filters,
      name: String(filters.name),
      expenseTypes: expenseTypeFilter
        .map((expenseType) => expenseType.id)
        .toString()
    };

    const route = appendQueryParams(
      `${process.env.NEXT_PUBLIC_SYSTEM_URL}/api/expenses`,
      queryParams
    );

    const response = await fetch(route);
    const data = await response.json();

    setExpenses(data as Expense[]);
    setIsLoading(false);
  }

  return (
    <>
      <ListExpensesForm
        monthRange={monthRange}
        expenseTypes={expenseTypes}
        onFormSubmit={onFormSubmit}
      />
      <TableListExpenses rows={expenses} loading={loading} />
    </>
  );
}

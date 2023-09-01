'use client';
import ListExpensesForm from '@Components/Forms/Expenses/List';
import TableListExpenses from '@Components/Tables/Expenses';
import { MonthRange } from '@Lib/Treat/Date';
import { appendQueryParams } from '@Lib/Treat/Request';
import { Expense, ExpenseType } from '@prisma/client';
import { useState } from 'react';
import { IExpenseQueryParams, IExpensesFilters } from './types';
import { publicAPI } from '@Lib/Client/api';

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

    const params: IExpenseQueryParams = {
      ...filters,
      name: String(filters.name),
      expenseTypes: filters.expenseTypes.join(',')
    };

    const response = await publicAPI.get('expenses', { params });
    const data = await response.data;

    setExpenses(() => data as Expense[]);
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

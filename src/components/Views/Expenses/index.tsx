'use client';
import ListExpensesForm from '@Components/Forms/Expenses/List';
import TableListExpenses from '@Components/Tables/Expenses';
import { clientConn } from '@Lib/Client/api';
import { MonthRange } from '@Lib/Treat/Date';
import { useTableReducer } from '@Reducers/tableActions/reducer';
import { Expense, ExpenseType } from '@prisma/client';
import { IExpenseQueryParams, IExpensesFilters } from './types';

interface IViewExpenses {
  monthRange: MonthRange;
  expenseTypes: ExpenseType[];
  rows: Expense[];
}

export default function ViewExpenses({
  monthRange,
  expenseTypes,
  rows
}: IViewExpenses) {
  const reducer = useTableReducer<Expense>({
    editRow: null,
    rows,
    loading: false
  });

  async function onFormSubmit(filters: IExpensesFilters): Promise<void> {
    reducer.dispatch({ type: 'loading' });

    const params: IExpenseQueryParams = {
      ...filters,
      name: String(filters.name),
      expenseTypes: filters.expenseTypes.join(',')
    };

    const response = await clientConn.get('expenses', { params });
    const data = (await response?.data) ?? reducer.state.rows;

    reducer.dispatch({ type: 'setRows', payload: data as Expense[] });

    reducer.dispatch({ type: 'loaded' });
  }

  return (
    <>
      <ListExpensesForm
        monthRange={monthRange}
        expenseTypes={expenseTypes}
        onFormSubmit={onFormSubmit}
      />
      <TableListExpenses reducer={reducer} />
    </>
  );
}

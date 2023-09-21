'use client';
import ListExpensesForm from '@Components/Forms/Expenses/List';
import TableListExpenses from '@Components/Tables/Expenses';
import { clientConn } from '@Lib/Client/api';
import { MonthRange } from '@Lib/Treat/Date';
import { useTableReducer } from '@Reducers/tableActions/reducer';
import { ExpenseDto } from '@Types/Expense/types';
import { Expense, ExpenseType } from '@prisma/client';
import { IExpenseQueryParams, IExpensesFilters } from './types';

interface IViewExpenses {
  monthRange: MonthRange;
  expenseTypes: ExpenseType[];
  rows: ExpenseDto[];
}

export default function ViewExpenses({
  monthRange,
  expenseTypes,
  rows
}: IViewExpenses) {
  const reducer = useTableReducer<ExpenseDto>({
    editRow: null,
    rows,
    loading: false
  });

  return (
    <>
      <ListExpensesForm
        monthRange={monthRange}
        expenseTypes={expenseTypes}
        onFormSubmit={async (filters: IExpensesFilters): Promise<void> => {
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
        }}
      />
      <TableListExpenses reducer={reducer} expenseTypes={expenseTypes} />
    </>
  );
}

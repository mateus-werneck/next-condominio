'use client';
import ExpenseForm from '@Components/Forms/Expenses/Edit';
import ListExpensesForm from '@Components/Forms/Expenses/List';
import FormCard from '@Components/Structure/Card/Form/FormCard';
import Modal from '@Components/Structure/Modal';
import TableListExpenses from '@Components/Tables/Expenses';
import { clientConn } from '@Lib/Client/api';
import { DateUtil, MonthRange } from '@Lib/Treat/Date';
import { appendQueryParams } from '@Lib/Treat/Request';
import { useTableReducer } from '@Reducers/tableActions/reducer';
import { ExpenseDto } from '@Types/Expense/types';
import { Expense, ExpenseType } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import { IExpenseQueryParams, IExpensesFilters } from './types';

interface IViewExpenses {
  monthRange: MonthRange;
  rows: ExpenseDto[];
  expenseTypes: ExpenseType[];
  editRow: ExpenseDto | null;
}

export default function ViewExpenses({ editRow, ...props }: IViewExpenses) {
  const initialState = {
    editRow,
    rows: props.rows.map((row) => ({
      ...row,
      dueDate: DateUtil.toLocalePtBr(row.dueDate)
    })),
    loading: false
  };

  const reducer = useTableReducer<ExpenseDto>(initialState);

  const router = useRouter();
  const path = usePathname();

  return (
    <>
      <Modal
        onClose={() => {
          reducer.dispatch({ type: 'cancelEdit' });
          router.push(path);
        }}
        isVisible={reducer.state.editRow !== null}
      >
        <FormCard
          title={reducer.state.editRow?.id ? 'Despesa' : 'Nova despesa'}
          id={reducer.state.editRow?.id ?? 'new'}
          hashTag={
            reducer.state.editRow?.id &&
            `${reducer.state.editRow?.name} - ${DateUtil.toLocalePtBr(
              reducer.state.editRow?.dueDate
            )}`
          }
        >
          <ExpenseForm
            expense={{
              ...(reducer.state.editRow ?? ({} as ExpenseDto)),
              dueDate: DateUtil.toLocalePtBr(reducer.state.editRow?.dueDate)
            }}
            alignment="center"
            formSubmitCallback={(payload: ExpenseDto) =>
              reducer.dispatch({ type: 'updateRow', payload })
            }
          />
        </FormCard>
      </Modal>
      <ListExpensesForm
        monthRange={props.monthRange}
        expenseTypes={props.expenseTypes}
        onFormSubmit={async (filters: IExpensesFilters): Promise<void> => {
          reducer.dispatch({ type: 'loading' });

          const params: IExpenseQueryParams = {
            ...filters,
            name: String(filters.name),
            expenseTypes: filters.expenseTypes?.join(',') ?? ''
          };

          const url = process.env.NEXT_PUBLIC_SYSTEM_URL as string;
          const newUrl = appendQueryParams(url + path, params);

          router.push(newUrl.replace(url, ''));

          const response = await clientConn.get('expenses', { params });
          const data = (await response?.data) ?? reducer.state.rows;

          reducer.dispatch({ type: 'setRows', payload: data as Expense[] });

          reducer.dispatch({ type: 'loaded' });
        }}
      />
      <TableListExpenses reducer={reducer} expenseTypes={props.expenseTypes} />
    </>
  );
}

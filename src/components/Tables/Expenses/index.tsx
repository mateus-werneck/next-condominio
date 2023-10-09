'use client';

import TableData from '@Components/Structure/TableData';
import FieldActions from '@Components/Structure/TableData/FieldActions';
import { IDefaultTableActions } from '@Components/Structure/TableData/FieldActions/types';
import Add from '@Components/Structure/TableData/Toolbar/Buttons/Add';
import Import from '@Components/Structure/TableData/Toolbar/Buttons/Import';
import Reload from '@Components/Structure/TableData/Toolbar/Buttons/Reload';
import { getPaymentType, paymentTypes } from '@Lib/Select/PaymentOptions';
import { DateUtil } from '@Lib/Treat/Date';
import { MoneyUtil } from '@Lib/Treat/Money';
import { ITableReducerAction } from '@Reducers/tableActions/types';
import { ExpenseDto } from '@Types/Expense/types';
import { GridCellEditStopParams, GridColDef } from '@mui/x-data-grid';
import { ExpenseType } from '@prisma/client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import { Dispatch } from 'react';

interface ITableListExpenses {
  reducer: {
    state: {
      editRow: ExpenseDto | null;
      rows: ExpenseDto[];
      loading?: boolean;
    };
    dispatch: Dispatch<ITableReducerAction>;
  };
  expenseTypes: ExpenseType[];
}

export default function TableListExpenses({
  reducer: { state, dispatch },
  expenseTypes
}: ITableListExpenses) {
  const table = 'TableListExpenses';
  const router = useRouter();

  return (
    <>
      <TableData
        name={table}
        columns={getColumns(table, dispatch, router, expenseTypes)}
        rows={state.rows}
        customToolbar={[
          <Import key="Expense_Import_Button" />,
          <Add
            key="Expense_Add_Button"
            onClick={() => {
              dispatch({ type: 'edit', payload: {} as ExpenseDto });
              router.push('/expenses?id=new');
            }}
          />,
          <Reload
            key="Expense_Reload_Button"
            onClickFunction={() => {
              dispatch({ type: 'loading' });
              dispatch({ type: 'reload', payload: { route: '/expenses' } });
            }}
          />
        ]}
        loading={state.loading}
        checkBoxSelection={true}
        onBatchDelete={(selectedRows: string[]) =>
          dispatch({
            type: 'batchDelete',
            payload: { selectedRows, route: '/expenses' }
          })
        }
        onRowUpdate={(
          newRow: GridCellEditStopParams,
          oldRow: GridCellEditStopParams
        ) => {
          const expense = newRow as unknown as ExpenseDto;
          dispatch({
            type: 'update',
            payload: {
              newRow: {
                id: newRow.id,
                name: expense.name,
                type: expense.type,
                paymentType: getPaymentType(expense.paymentType),
                installments: Number(expense.installments),
                dueDate: DateUtil.toDateObject(expense.dueDate),
                value: MoneyUtil.toFloat(String(newRow.value))
              },
              oldRow,
              route: '/expenses'
            }
          });

          return newRow;
        }}
      />
    </>
  );
}

function getColumns(
  table: string,
  dispatch: Dispatch<ITableReducerAction>,
  router: AppRouterInstance,
  expenseTypes: ExpenseType[]
) {
  const rowActions: IDefaultTableActions<ExpenseDto> = {
    table,
    onEditRow: (row: ExpenseDto) => {
      dispatch({ type: 'edit', payload: row });
      router.push(`/expenses?id=${row.id}`);
    },
    onConfirmDeletion: (row: ExpenseDto) =>
      dispatch({ type: 'delete', payload: { row, route: '/expenses' } })
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome'
    },
    {
      field: 'value',
      headerName: 'Valor',
      type: 'money'
    },
    {
      field: 'type',
      valueFormatter: (params) =>
        expenseTypes.find((e) => e.id === params.value)?.label ?? '',
      headerName: 'Tipo',
      type: 'singleSelect',
      valueOptions: expenseTypes
    },
    {
      field: 'paymentType',
      valueFormatter: (params) =>
        paymentTypes.find((p) => p.label === params.value)?.label,
      headerName: 'Pagamento',
      type: 'singleSelect',
      valueOptions: paymentTypes
    },
    {
      field: 'installments',
      headerName: 'Parcelas',
      type: 'number'
    },
    {
      field: 'dueDate',
      headerName: 'Data de Vencimento',
      type: 'date'
    },
    FieldActions<ExpenseDto>(rowActions)
  ];

  return columns;
}

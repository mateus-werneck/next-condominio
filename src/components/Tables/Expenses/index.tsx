'use client';

import TableData from '@Components/Structure/TableData';
import FieldActions from '@Components/Structure/TableData/FieldActions';
import { TTableActions } from '@Components/Structure/TableData/FieldActions/types';
import Export from '@Components/Structure/TableData/Helpers/Export/Export';
import Add from '@Components/Structure/TableData/Toolbar/Buttons/Add';
import Import from '@Components/Structure/TableData/Toolbar/Buttons/Import';
import Reload from '@Components/Structure/TableData/Toolbar/Buttons/Reload';
import { getPaymentType, paymentTypes } from '@Lib/Select/PaymentOptions';
import { DateUtil } from '@Lib/Treat/Date';
import { MoneyUtil } from '@Lib/Treat/Money';
import { TColDef } from '@Lib/Treat/Table';
import { ITableReducerAction } from '@Reducers/tableActions/types';
import { ExpenseDto } from '@Types/Expense/types';
import {
  GridCellEditStopParams,
  GridValueFormatterParams
} from '@mui/x-data-grid';
import { ExpenseType } from '@prisma/client';
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

  const rowActions: TTableActions<ExpenseDto> = {
    onEditRow: (row: ExpenseDto) => {
      dispatch({ type: 'edit', payload: row });
      router.push(`/expenses?id=${row.id}`);
    },
    onConfirmDeletion: (row: ExpenseDto) =>
      dispatch({ type: 'delete', payload: { row, route: 'expenses' } })
  };

  const columns = getColumns(expenseTypes);
  const fieldActions = FieldActions(table, rowActions);

  return (
    <>
      <TableData
        name={table}
        columns={columns.concat(fieldActions)}
        rows={state.rows}
        loading={state.loading}
        checkBoxSelection={true}
        onBatchDelete={(selectedRows: string[]) =>
          dispatch({
            type: 'batchDelete',
            payload: { selectedRows, route: 'expenses' }
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
        customToolbar={[
          <Export
            key="Expense_Export_Button"
            rows={state.rows.map((expense: ExpenseDto) => ({
              ...expense,
              dueDate: DateUtil.toISOString(expense.dueDate),
              value: MoneyUtil.toFloat(expense.value),
              type: expenseTypes.find((e) => e.id === expense.type)?.label ?? ''
            }))}
            columns={columns as TColDef[]}
            route="expenses/export"
          />,
          <Import
            key="Expense_Import_Button"
            route="expenses/import"
            fileInfo={{
              message: 'A planilha deve seguir o padrão abaixo:',
              fields: columns.map((c) => c.headerName)
            }}
            onSuccess={() =>
              dispatch({ type: 'reload', payload: { route: '/expenses' } })
            }
          />,
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
      />
    </>
  );
}

function getColumns(expenseTypes: ExpenseType[]) {
  const columns = [
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
      valueFormatter: (params: GridValueFormatterParams<any>) =>
        expenseTypes.find((e) => e.id === params.value)?.label ?? '',
      headerName: 'Tipo',
      type: 'singleSelect',
      valueOptions: expenseTypes
    },
    {
      field: 'paymentType',
      valueFormatter: (params: GridValueFormatterParams<any>) =>
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
    }
  ];

  return columns;
}

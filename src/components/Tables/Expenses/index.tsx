'use client';

import StandardTable from '@Components/Structure/Table';
import { getDefaultTableActions, getTableAddButton } from '@Lib/Table/Actions';
import {
  IConfirmDeletionCallback,
  IDefaultTableActions
} from '@Lib/Table/types';
import { GridColDef } from '@mui/x-data-grid';
import { Expense } from '@prisma/client';
import { useTableActions } from './actions';

interface ITableListExpenses {
  rows: Expense[];
  setExpenses: (value: (previousValue: Expense[]) => Expense[]) => void;
  loading: boolean;
}

export default function TableListExpenses({
  rows,
  setExpenses,
  loading
}: ITableListExpenses) {
  const table = 'TableListExpenses';

  const { onConfirmDeletion, onBatchDelete, onRowUpdate } =
    useTableActions(setExpenses);

  const columns = getColumns(table, onConfirmDeletion);

  return (
    <StandardTable
      name={table}
      columns={columns}
      rows={rows}
      customToolbar={getTableAddButton('/expenses/new')}
      loading={loading}
      checkBoxSelection={true}
      onBatchDelete={onBatchDelete}
      onRowUpdate={onRowUpdate}
    />
  );
}

function getColumns(
  table: string,
  onConfirmDeletion: IConfirmDeletionCallback
) {
  const tableActions: IDefaultTableActions = {
    table,
    route: '/expenses',
    onConfirmDeletion
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
      field: 'expenseType',
      headerName: 'Tipo',
      type: 'select'
    },
    {
      field: 'dueDate',
      headerName: 'Data de Vencimento',
      type: 'date'
    },
    getDefaultTableActions(tableActions)
  ];

  return columns;
}

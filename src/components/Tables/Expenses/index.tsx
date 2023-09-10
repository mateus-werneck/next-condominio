'use client';

import StandardTable from '@Components/Structure/Table';
import ActionsColumn from '@Components/Structure/Table/ActionsColumn';
import { IDefaultTableActions } from '@Components/Structure/Table/ActionsColumn/types';
import Add from '@Components/Structure/Table/Toolbar/Buttons/Add';
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
      customToolbar={Add('/expenses/new')}
      loading={loading}
      checkBoxSelection={true}
      onBatchDelete={onBatchDelete}
      onRowUpdate={onRowUpdate}
    />
  );
}

function getColumns(
  table: string,
  onConfirmDeletion: (row: Expense) => void | Promise<void>
) {
  const tableActions: IDefaultTableActions<Expense> = {
    table,
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
    ActionsColumn<Expense>(tableActions)
  ];

  return columns;
}

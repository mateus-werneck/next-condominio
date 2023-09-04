'use client';

import StandardTable from '@Components/Structure/Table';
import {
  alertDeletion,
  alertDeletionFailed,
  alertEditSuccess,
  onDeleteAction
} from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import { getDefaultTableActions } from '@Lib/Table/Actions';
import { GridColDef } from '@mui/x-data-grid';
import { Expense } from '@prisma/client';
import { getTableAddButton } from '../utils/customButtons';

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

  const { onConfirmDeletion, onBatchDelete } = useTableActions({ setExpenses });

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 300
    },
    {
      field: 'value',
      headerName: 'Valor',
      minWidth: 300,
      type: 'money'
    },
    {
      field: 'expenseType',
      headerName: 'Tipo',
      minWidth: 300,
      type: 'select'
    },
    {
      field: 'dueDate',
      headerName: 'Data de Vencimento',
      minWidth: 200,
      type: 'date'
    },
    getDefaultTableActions({ table, route: '/expenses', onConfirmDeletion })
  ];

  return (
    <StandardTable
      name={table}
      columns={columns}
      rows={rows}
      customToolbar={getTableAddButton('/expenses/new')}
      loading={loading}
      checkBoxSelection={true}
      onBatchDelete={onBatchDelete}
    />
  );
}

function useTableActions({
  setExpenses
}: {
  setExpenses: (value: (previousValue: Expense[]) => Expense[]) => void;
}) {
  const onConfirmDeletion = async (row: { id: string }) => {
    await onDeleteAction({
      info: { id: row.id, endpoint: 'expenses' },
      callback: setExpenses
    });
  };

  const onBatchDelete = async (selectedRows: string[]) => {
    const onConfirmDeletion = async () => {
      try {
        await clientConn.delete(`/expenses`, {
          params: {
            expenseIds: selectedRows.join(',')
          }
        });

        setExpenses((previousExpenses: Expense[]) =>
          previousExpenses.filter(({ id }) => !selectedRows.includes(id))
        );

        alertEditSuccess();
      } catch (error) {
        alertDeletionFailed();
      }
    };

    alertDeletion(onConfirmDeletion);
  };

  return { onConfirmDeletion, onBatchDelete };
}

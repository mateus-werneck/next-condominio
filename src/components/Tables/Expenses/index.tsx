'use client';

import StandardTable from '@Components/Structure/Table';
import {
  alertDeletion,
  alertDeletionFailed,
  alertEditSuccess,
  onDeleteAction
} from '@Lib/Alerts/customActions';
import { publicAPI } from '@Lib/Client/api';
import { getDefaultTableActions } from '@Lib/Table/Actions';
import { GridColDef } from '@mui/x-data-grid';
import { Expense } from '@prisma/client';
import { useState } from 'react';
import { getTableAddButton } from '../utils/customButtons';

interface ITableListExpenses {
  rows: Expense[];
  loading: boolean;
}

export default function TableListExpenses({
  rows,
  loading
}: ITableListExpenses) {
  const table = 'TableListExpenses';
  const [expenses, setExpenses] = useState<Expense[]>(rows);

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
      type: 'number'
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
      rows={expenses}
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
  setExpenses: (value: (previousValue: any[]) => any[]) => void;
}) {
  const onConfirmDeletion = async (row: { id: string }) => {
    await onDeleteAction({
      info: { id: row.id, endpoint: 'residents' },
      callback: setExpenses
    });
  };

  const onBatchDelete = async (selectedRows: string[]) => {
    const onConfirmDeletion = async () => {
      try {
        await publicAPI.delete(`/expenses`, {
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

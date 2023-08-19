'use client';

import DefaultButton from '@Components/Structure/Button';
import StandardTable from '@Components/Structure/Table';
import {
  alertDeletion,
  alertEditSuccess,
  onDeleteAction
} from '@Lib/Alerts/customActions';
import { IFilter, appendQueryParams } from '@Lib/Treat/Request';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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

  const { getTableActions } = useTableActions(table, setExpenses);

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
    getTableActions()
  ];

  return (
    <StandardTable
      name={table}
      columns={columns}
      rows={expenses}
      customToolbar={getTableAddButton('/expenses/new')}
      loading={loading}
      checkBoxSelection={true}
      onDelete={(selectedRows: string[]) => {
        const onConfirmDeletion = async () => {
          const queryParams = {
            expenseIds: selectedRows.join(',')
          } as IFilter;

          const url: string = appendQueryParams(
            `${process.env.NEXT_PUBLIC_URL}/expenses`,
            queryParams
          );

          await fetch(url, {
            method: 'DELETE'
          });

          alertEditSuccess();
        };
        alertDeletion(onConfirmDeletion);
      }}
    />
  );
}

function useTableActions(
  table: string,
  setExpenses: (value: (previousValue: Expense[]) => Expense[]) => void
) {
  function getTableActions() {
    return {
      field: 'actions',
      headerName: 'Ações',
      minWidth: 200,
      renderCell: (params: any) => {
        const row = params.row;

        return (
          <div className="flex gap-2" key={`${table}_Actions_${row.id}`}>
            <DefaultButton
              key={`${table}_Edit_${row.id}`}
              color="primary"
              route={`expenses/edit?id=${row.id}`}
            >
              <EditIcon fontSize="small" key={`${table}_Edit_${row.id}`} />
            </DefaultButton>
            <DefaultButton
              color="error"
              key={`${table}_Delete_${row.id}`}
              onClickFunction={() => {
                const onConfirmDeletion = async () => {
                  await onDeleteAction({
                    info: { id: row.id, endpoint: 'expenses' },
                    callback: setExpenses
                  });
                };
                alertDeletion(onConfirmDeletion);
              }}
            >
              <DeleteIcon fontSize="small" key={`${table}_Delete_${row.id}`} />
            </DefaultButton>
          </div>
        );
      }
    };
  }

  return { getTableActions };
}

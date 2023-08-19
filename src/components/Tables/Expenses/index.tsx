'use client';

import { Alert } from '@Components/Structure/Alert';
import DefaultButton from '@Components/Structure/Button';
import StandardTable from '@Components/Structure/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridColDef } from '@mui/x-data-grid';
import { Expense } from '@prisma/client';
import { useState } from 'react';
import { onDeleteAction } from '../utils/customActions';
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
                Alert({
                  title: 'Alerta',
                  message: 'Tem certeza que deseja deletar ?',
                  variant: 'warning',
                  cancelButton: true,
                  focusCancel: true,
                  allowEscapeKey: true,
                  allowOutsideClick: true,
                  callbackFunction: async () => {
                    await onDeleteAction({
                      info: { id: row.id, endpoint: 'expenses' },
                      callback: setExpenses
                    });
                  }
                });
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

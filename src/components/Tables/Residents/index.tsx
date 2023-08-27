'use client';

import DefaultButton from '@Components/Structure/Button';
import StandardTable from '@Components/Structure/Table';
import {
  alertDeletion,
  alertDeletionFailed,
  alertEditSuccess,
  onDeleteAction
} from '@Lib/Alerts/customActions';
import { publicAPI } from '@Lib/Client/api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridColDef } from '@mui/x-data-grid';
import { Resident } from '@prisma/client';
import { useState } from 'react';
import { getTableAddButton } from '../utils/customButtons';

interface ITableListResidents {
  rows: Resident[];
}

export default function TableListResidents({ rows }: ITableListResidents) {
  const table = 'TableListResidents';
  const [residents, setResidents] = useState<Resident[]>(rows);

  const { getTableActions } = useTableActions(table, setResidents);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 300
    },
    {
      field: 'apartment',
      headerName: 'Apartamento',
      minWidth: 300,
      type: 'number'
    },
    getTableActions()
  ];

  const onBatchDelete = async (selectedRows: string[]) => {
    const onConfirmDeletion = async () => {
      try {
        await publicAPI.delete(`/expenses`, {
          params: {
            expenseIds: selectedRows.join(',')
          }
        });

        setResidents((previousExpenses: Resident[]) =>
          previousExpenses.filter(({ id }) => !selectedRows.includes(id))
        );

        alertEditSuccess();
      } catch (error) {
        alertDeletionFailed();
      }
    };

    alertDeletion(onConfirmDeletion);
  };

  return (
    <StandardTable
      name={table}
      columns={columns}
      rows={residents}
      customToolbar={getTableAddButton('/expenses/new')}
      checkBoxSelection={true}
      onBatchDelete={onBatchDelete}
    />
  );
}

function useTableActions(
  table: string,
  setResidents: (value: (previousValue: Resident[]) => Resident[]) => void
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
              route={`residents/edit?id=${row.id}`}
            >
              <EditIcon fontSize="small" key={`${table}_Edit_${row.id}`} />
            </DefaultButton>
            <DefaultButton
              color="error"
              key={`${table}_Delete_${row.id}`}
              onClickFunction={() => {
                const onConfirmDeletion = async () => {
                  await onDeleteAction({
                    info: { id: row.id, endpoint: 'residents' },
                    callback: setResidents
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

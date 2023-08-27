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
import { Resident } from '@prisma/client';
import { useState } from 'react';
import { getTableAddButton } from '../utils/customButtons';

interface ITableListResidents {
  rows: Resident[];
}

export default function TableListResidents({ rows }: ITableListResidents) {
  const table = 'TableListResidents';
  const [residents, setResidents] = useState<Resident[]>(rows);
  const { onConfirmDeletion, onBatchDelete } = useTableActions({
    setResidents
  });

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
    getDefaultTableActions({ table, route: '/residents', onConfirmDeletion })
  ];

  return (
    <StandardTable
      name={table}
      columns={columns}
      rows={residents}
      customToolbar={getTableAddButton('/residents/new')}
      checkBoxSelection={true}
      onBatchDelete={onBatchDelete}
    />
  );
}

function useTableActions({
  setResidents
}: {
  setResidents: (value: (previousValue: any[]) => any[]) => void;
}) {
  const onConfirmDeletion = async (row: { id: string }) => {
    await onDeleteAction({
      info: { id: row.id, endpoint: 'residents' },
      callback: setResidents
    });
  };

  const onBatchDelete = async (selectedRows: string[]) => {
    const onConfirmDeletion = async () => {
      try {
        await publicAPI.delete(`/residents`, {
          params: {
            residents: selectedRows.join(',')
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

  return { onConfirmDeletion, onBatchDelete };
}

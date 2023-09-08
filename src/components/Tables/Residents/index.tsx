'use client';

import StandardTable from '@Components/Structure/Table';
import { getDefaultTableActions, getTableAddButton } from '@Lib/Table/Actions';
import {
  IConfirmDeletionCallback,
  IDefaultTableActions
} from '@Lib/Table/types';
import { GridColDef } from '@mui/x-data-grid';
import { Resident } from '@prisma/client';
import { useState } from 'react';
import { useTableActions } from './actions';

interface ITableListResidents {
  rows: Resident[];
}

export default function TableListResidents({ rows }: ITableListResidents) {
  const table = 'TableListResidents';
  const [residents, setResidents] = useState<Resident[]>(rows);

  const { onConfirmDeletion, onBatchDelete, onRowUpdate } =
    useTableActions(setResidents);

  const columns = getColumns(table, onConfirmDeletion);

  return (
    <StandardTable
      name={table}
      columns={columns}
      rows={residents}
      customToolbar={getTableAddButton('/residents/new')}
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
    route: '/residents',
    onConfirmDeletion
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome'
    },
    {
      field: 'apartment',
      headerName: 'Apartamento',
      type: 'number'
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email'
    },
    {
      field: 'phone',
      headerName: 'Telefone'
    },
    getDefaultTableActions(tableActions)
  ];

  return columns;
}

'use client';

import StandardTable from '@Components/Structure/Table';
import ActionsColumn from '@Components/Structure/Table/ActionsColumn';
import {
  IConfirmDeletionCallback,
  IDefaultTableActions,
  IEditFormCallback
} from '@Components/Structure/Table/ActionsColumn/types';
import Add from '@Components/Structure/Table/Toolbar/Buttons/Add';
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

  const { onEditRow, onConfirmDeletion, onBatchDelete, onRowUpdate } =
    useTableActions(setResidents);

  const columns = getColumns(table, onEditRow, onConfirmDeletion);

  return (
    <StandardTable
      name={table}
      columns={columns}
      rows={residents}
      customToolbar={Add('/residents/new')}
      onBatchDelete={onBatchDelete}
      onRowUpdate={onRowUpdate}
    />
  );
}

function getColumns(
  table: string,
  onEditRow: IEditFormCallback,
  onConfirmDeletion: IConfirmDeletionCallback
) {
  const tableActions: IDefaultTableActions = {
    table,
    onEditRow,
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
    ActionsColumn(tableActions)
  ];

  return columns;
}

'use client';

import TableData from '@Components/Structure/TableData';
import FieldActions from '@Components/Structure/TableData/FieldActions';
import { IDefaultTableActions } from '@Components/Structure/TableData/FieldActions/types';
import Add from '@Components/Structure/TableData/Toolbar/Buttons/Add';
import { GridColDef } from '@mui/x-data-grid';
import { Resident } from '@prisma/client';
import { useRef, useState } from 'react';
import { useTableActions } from './actions';
import Modal from '@Components/Structure/Modal';
import ResidentForm from '@Components/Forms/Resident/Edit';

interface ITableListResidents {
  rows: Resident[];
}

export default function TableListResidents({ rows }: ITableListResidents) {
  const table = 'TableListResidents';
  const [residents, setResidents] = useState<Resident[]>(rows);
  const [editRow, setEditRow] = useState<Resident | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { onEditRow, onConfirmDeletion, onBatchDelete, onRowUpdate } =
    useTableActions(setResidents, setEditRow);

  const columns = getColumns(table, onEditRow, onConfirmDeletion);

  return (
    <div ref={ref}>
      {editRow && (
        <Modal parentRef={ref} callback={() => setEditRow(null)}>
          <ResidentForm resident={editRow} alignment="center" />
        </Modal>
      )}
      <TableData
        name={table}
        columns={columns}
        rows={residents}
        customToolbar={Add('/residents/new')}
        onBatchDelete={onBatchDelete}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
}

function getColumns(
  table: string,
  onEditRow: (row: Resident) => void,
  onConfirmDeletion: (row: Resident) => void | Promise<void>
) {
  const tableActions: IDefaultTableActions<Resident> = {
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
    FieldActions<Resident>(tableActions)
  ];

  return columns;
}

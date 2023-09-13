'use client';

import ResidentForm from '@Components/Forms/Resident/Edit';
import Modal from '@Components/Structure/Modal';
import TableData from '@Components/Structure/TableData';
import FieldActions from '@Components/Structure/TableData/FieldActions';
import { IDefaultTableActions } from '@Components/Structure/TableData/FieldActions/types';
import Add from '@Components/Structure/TableData/Toolbar/Buttons/Add';
import { useTableReducer } from '@Reducers/tableActions/reducer';
import { ITableReducerAction } from '@Reducers/tableActions/types';
import { GridCellEditStopParams, GridColDef } from '@mui/x-data-grid';
import { Resident } from '@prisma/client';
import { Dispatch, useRef } from 'react';

interface ITableListResidents {
  rows: Resident[];
}

export default function TableListResidents({ rows }: ITableListResidents) {
  const table = 'TableListResidents';
  const ref = useRef<HTMLDivElement>(null);

  const { state, dispatch } = useTableReducer<Resident>({
    editRow: null,
    rows
  });

  const getEditModal = () =>
    state.editRow ? (
      <Modal parentRef={ref} forceHide={() => dispatch({ type: 'cancelEdit' })}>
        <ResidentForm resident={state.editRow} alignment="center" />
      </Modal>
    ) : (
      <></>
    );

  return (
    <div ref={ref}>
      {getEditModal()}
      <TableData
        name={table}
        columns={getColumns(table, dispatch)}
        rows={state.rows}
        customToolbar={Add('/residents/new')}
        onBatchDelete={(selectedRows: string[]) =>
          dispatch({
            type: 'batchDelete',
            payload: { selectedRows, route: '/residents' }
          })
        }
        onRowUpdate={(
          newRow: GridCellEditStopParams,
          oldRow: GridCellEditStopParams
        ) => {
          dispatch({
            type: 'update',
            payload: { newRow, oldRow, route: '/residents' }
          });

          return newRow;
        }}
      />
    </div>
  );
}

function getColumns(table: string, dispatch: Dispatch<ITableReducerAction>) {
  const rowActions: IDefaultTableActions<Resident> = {
    table,
    onEditRow: (row: Resident) => dispatch({ type: 'edit', payload: row }),
    onConfirmDeletion: (row: Resident) =>
      dispatch({ type: 'delete', payload: { row, route: '/residents' } })
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
    FieldActions<Resident>(rowActions)
  ];

  return columns;
}

'use client';

import ResidentForm from '@Components/Forms/Resident/Edit';
import FormCard from '@Components/Structure/Card/Form/FormCard';
import Modal from '@Components/Structure/Modal';
import TableData from '@Components/Structure/TableData';
import FieldActions from '@Components/Structure/TableData/FieldActions';
import { IDefaultTableActions } from '@Components/Structure/TableData/FieldActions/types';
import Add from '@Components/Structure/TableData/Toolbar/Buttons/Add';
import Reload from '@Components/Structure/TableData/Toolbar/Buttons/Reload';
import { useTableReducer } from '@Reducers/tableActions/reducer';
import { ITableReducerAction } from '@Reducers/tableActions/types';
import { GridCellEditStopParams, GridColDef } from '@mui/x-data-grid';
import { Resident } from '@prisma/client';
import { Dispatch } from 'react';

interface ITableListResidents {
  rows: Resident[];
}

export default function TableListResidents({ rows }: ITableListResidents) {
  const table = 'TableListResidents';

  const { state, dispatch } = useTableReducer<Resident>({
    editRow: null,
    rows
  });

  return (
    <>
      <Modal
        onClose={() => dispatch({ type: 'cancelEdit' })}
        isVisible={state.editRow !== null && state.editRow !== undefined}
      >
        <FormCard
          title="Apartamento"
          id={state.editRow?.id ?? ''}
          hashTag={state.editRow?.apartment}
        >
          <ResidentForm
            resident={state.editRow ?? ({} as Resident)}
            alignment="center"
            formSubmitCallback={(payload: Resident) => {
              dispatch({ type: 'updateRow', payload });
            }}
          />
        </FormCard>
      </Modal>
      <TableData
        name={table}
        columns={getColumns(table, dispatch)}
        rows={state.rows}
        customToolbar={[
          Add('/residents/new'),
          Reload(() => {
            dispatch({ type: 'loading' });
            dispatch({ type: 'reload', payload: { route: '/residents' } });
          })
        ]}
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
    </>
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

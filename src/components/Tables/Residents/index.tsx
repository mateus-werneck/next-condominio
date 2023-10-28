'use client';

import TableData from '@Components/Structure/TableData';
import FieldActions from '@Components/Structure/TableData/FieldActions';
import { IDefaultTableActions } from '@Components/Structure/TableData/FieldActions/types';
import Add from '@Components/Structure/TableData/Toolbar/Buttons/Add';
import Reload from '@Components/Structure/TableData/Toolbar/Buttons/Reload';
import { ITableReducerAction } from '@Reducers/tableActions/types';
import { GridCellEditStopParams, GridColDef } from '@mui/x-data-grid';
import { Resident } from '@prisma/client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { Dispatch } from 'react';

interface ITableListResidents {
  reducer: {
    state: {
      editRow: Resident | null;
      rows: Resident[];
      loading?: boolean;
    };
    dispatch: Dispatch<ITableReducerAction>;
  };
}

export default function TableListResidents({
  reducer: { state, dispatch }
}: ITableListResidents) {
  const table = 'TableListResidents';
  const router = useRouter();

  return (
    <>
      <TableData
        name={table}
        columns={getColumns(table, dispatch, router)}
        rows={state.rows}
        customToolbar={[
          <Add
            key="Resident_Add_Button"
            onClick={() => {
              dispatch({ type: 'edit', payload: {} as Resident });
              router.push('/residents?id=new');
            }}
          />,
          <Reload
            key="Resident_Reload_Button"
            onClickFunction={() => {
              dispatch({ type: 'loading' });
              dispatch({ type: 'reload', payload: { route: '/residents' } });
            }}
          />
        ]}
        onBatchDelete={(selectedRows: string[]) =>
          dispatch({
            type: 'batchDelete',
            payload: { selectedRows, route: 'residents' }
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

function getColumns(
  table: string,
  dispatch: Dispatch<ITableReducerAction>,
  router: AppRouterInstance
) {
  const rowActions: IDefaultTableActions<Resident> = {
    table,
    onEditRow: (row: Resident) => {
      dispatch({ type: 'edit', payload: row });
      router.push(`/residents?id=${row.id}`);
    },
    onConfirmDeletion: (row: Resident) =>
      dispatch({ type: 'delete', payload: { row, route: 'residents' } })
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

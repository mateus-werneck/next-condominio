'use client';

import TableData from '@Components/Structure/TableData';
import FieldActions from '@Components/Structure/TableData/FieldActions';
import { TTableActions } from '@Components/Structure/TableData/FieldActions/types';
import Export from '@Components/Structure/TableData/Helpers/Export/Export';
import Add from '@Components/Structure/TableData/Toolbar/Buttons/Add';
import Import from '@Components/Structure/TableData/Toolbar/Buttons/Import';
import Reload from '@Components/Structure/TableData/Toolbar/Buttons/Reload';
import { TColExportDef } from '@Lib/Treat/Table';
import { ITableReducerAction } from '@Reducers/tableActions/types';
import { GridCellEditStopParams, GridColDef } from '@mui/x-data-grid';
import { Resident } from '@prisma/client';
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

  const rowActions: TTableActions<Resident> = {
    onEditRow: (row: Resident) => {
      dispatch({ type: 'edit', payload: row });
      router.push(`/residents?id=${row.id}`);
    },
    onConfirmDeletion: (row: Resident) =>
      dispatch({ type: 'delete', payload: { row, route: 'residents' } })
  };

  const columns = getColumns();
  const fieldActions = FieldActions(table, rowActions);

  return (
    <>
      <TableData
        name={table}
        columns={columns.concat(fieldActions)}
        rows={state.rows}
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
        customToolbar={[
          <Export
            key="Resident_Export_Button"
            rows={state.rows}
            columns={columns as TColExportDef[]}
          />,
          <Import
            key="Resident_Import_Button"
            route="residents/import"
            fileInfo={{
              message: 'A planilha deve seguir o padrão abaixo:',
              fields: ['Nome', 'Apartamento', 'Email', 'Telefone']
            }}
            onSuccess={() =>
              dispatch({ type: 'reload', payload: { route: '/residents' } })
            }
          />,
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
      />
    </>
  );
}

function getColumns() {
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
    }
  ];

  return columns;
}

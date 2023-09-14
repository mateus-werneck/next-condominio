'use client';

import ExpenseForm from '@Components/Forms/Expenses/Edit';
import Modal from '@Components/Structure/Modal';
import TableData from '@Components/Structure/TableData';
import FieldActions from '@Components/Structure/TableData/FieldActions';
import { IDefaultTableActions } from '@Components/Structure/TableData/FieldActions/types';
import Add from '@Components/Structure/TableData/Toolbar/Buttons/Add';
import { ITableReducerAction } from '@Reducers/tableActions/types';
import { ExpenseDto } from '@Types/Expense/types';
import { GridCellEditStopParams, GridColDef } from '@mui/x-data-grid';
import { Expense } from '@prisma/client';
import { Dispatch } from 'react';

interface ITableListExpenses {
  reducer: {
    state: {
      editRow: ExpenseDto | null;
      rows: ExpenseDto[];
      loading?: boolean;
    };
    dispatch: Dispatch<ITableReducerAction>;
  };
}

export default function TableListExpenses({
  reducer: { state, dispatch }
}: ITableListExpenses) {
  const table = 'TableListExpenses';

  return (
    <>
      <Modal
        onClose={() => dispatch({ type: 'cancelEdit' })}
        isVisible={state.editRow !== null && state.editRow !== undefined}
      >
        <ExpenseForm
          expense={state.editRow as ExpenseDto}
          alignment="center"
          formSubmitCallback={(payload: Expense) =>
            dispatch({ type: 'updateRow', payload })
          }
        />
      </Modal>
      <TableData
        name={table}
        columns={getColumns(table, dispatch)}
        rows={state.rows}
        customToolbar={Add('/expenses/new')}
        loading={state.loading}
        checkBoxSelection={true}
        onBatchDelete={(selectedRows: string[]) =>
          dispatch({
            type: 'batchDelete',
            payload: { selectedRows, route: '/expenses' }
          })
        }
        onRowUpdate={(
          newRow: GridCellEditStopParams,
          oldRow: GridCellEditStopParams
        ) => {
          dispatch({
            type: 'update',
            payload: { newRow, oldRow, route: '/expenses' }
          });

          return newRow;
        }}
      />
    </>
  );
}

function getColumns(table: string, dispatch: Dispatch<ITableReducerAction>) {
  const rowActions: IDefaultTableActions<ExpenseDto> = {
    table,
    onEditRow: (row: ExpenseDto) => dispatch({ type: 'edit', payload: row }),
    onConfirmDeletion: (row: ExpenseDto) =>
      dispatch({ type: 'delete', payload: { row, route: '/expenses' } })
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome'
    },
    {
      field: 'value',
      headerName: 'Valor',
      type: 'money'
    },
    {
      field: 'expenseType',
      headerName: 'Tipo',
      type: 'select'
    },
    {
      field: 'dueDate',
      headerName: 'Data de Vencimento',
      type: 'date'
    },
    FieldActions<ExpenseDto>(rowActions)
  ];

  return columns;
}

'use client';

import ExpenseForm from '@Components/Forms/Expenses/Edit';
import FormCard from '@Components/Structure/Card/Form/FormCard';
import Modal from '@Components/Structure/Modal';
import TableData from '@Components/Structure/TableData';
import FieldActions from '@Components/Structure/TableData/FieldActions';
import { IDefaultTableActions } from '@Components/Structure/TableData/FieldActions/types';
import Add from '@Components/Structure/TableData/Toolbar/Buttons/Add';
import { DateUtil } from '@Lib/Treat/Date';
import { MoneyUtil } from '@Lib/Treat/Money';
import { ITableReducerAction } from '@Reducers/tableActions/types';
import { ExpenseDto } from '@Types/Expense/types';
import { GridCellEditStopParams, GridColDef } from '@mui/x-data-grid';
import { Expense, ExpenseType } from '@prisma/client';
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
  expenseTypes: ExpenseType[];
}

export default function TableListExpenses({
  reducer: { state, dispatch },
  expenseTypes
}: ITableListExpenses) {
  const table = 'TableListExpenses';

  const hashTag = `${state.editRow?.name} - ${
    state.editRow?.dueDate
      ? DateUtil.fromDateToPtBrString(new Date(state.editRow?.dueDate))
      : ''
  }`;

  return (
    <>
      <Modal
        onClose={() => dispatch({ type: 'cancelEdit' })}
        isVisible={state.editRow !== null && state.editRow !== undefined}
      >
        <FormCard
          title="Despesa"
          id={state.editRow?.id ?? ''}
          hashTag={hashTag}
        >
          <ExpenseForm
            expense={state.editRow ?? ({} as ExpenseDto)}
            alignment="center"
            formSubmitCallback={(payload: Expense) =>
              dispatch({ type: 'updateRow', payload })
            }
          />
        </FormCard>
      </Modal>
      <TableData
        name={table}
        columns={getColumns(table, dispatch, expenseTypes)}
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
          const expense = newRow as unknown as ExpenseDto;
          dispatch({
            type: 'update',
            payload: {
              newRow: {
                id: newRow.id,
                name: expense.name,
                type: expense.type,
                dueDate: expense.dueDate,
                value: MoneyUtil.toFloat(String(newRow.value))
              },
              oldRow,
              route: '/expenses'
            }
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
  expenseTypes: ExpenseType[]
) {
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
      field: 'type',
      valueFormatter: (params) =>
        expenseTypes.find((e) => e.id === params.value)?.label ?? '',
      headerName: 'Tipo',
      type: 'singleSelect',
      valueOptions: expenseTypes
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

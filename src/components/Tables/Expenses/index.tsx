'use client';

import { Alert } from '@Components/Structure/Alert';
import DefaultButton from '@Components/Structure/Button';
import StandardTable from '@Components/Structure/Table';
import { DateUtil } from '@Lib/Treat/Date';
import { MoneyUtil } from '@Lib/Treat/Money';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  GridColDef,
  GridTreeNodeWithRender,
  GridValueFormatterParams,
  GridValueGetterParams,
  getGridDateOperators,
  getGridNumericOperators,
  getGridStringOperators
} from '@mui/x-data-grid';
import { Expense } from '@prisma/client';
import { useState } from 'react';
import { getTableAddButton } from '../utils/customButtons';

interface ITableListExpenses {
  rows: Expense[];
  loading: boolean;
}

export default function TableListExpenses({
  rows,
  loading
}: ITableListExpenses) {
  const table = 'TableListExpenses';
  const [expenses, setExpenses] = useState<Expense[]>(rows);

  const { getTableActions } = useTableActions(table, setExpenses);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 300,
      filterOperators: getGridStringOperators()
    },
    {
      field: 'value',
      headerName: 'Valor',
      minWidth: 300,
      valueFormatter: (params: any) => MoneyUtil.toBRL(params.value),
      filterOperators: getGridNumericOperators()
    },
    {
      field: 'expenseType',
      headerName: 'Tipo',
      minWidth: 300,
      valueFormatter: (params: any) => params.value.label,
      filterOperators: getGridStringOperators()
    },
    {
      field: 'dueDate',
      headerName: 'Data de Vencimento',
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<any>) => {
        const date = new Date(params.value).toISOString();
        const offset = DateUtil.BRTOffset(date);
        return DateUtil.fromDateToPtBrString(offset);
      },
      valueGetter: (
        params: GridValueGetterParams<any, any, GridTreeNodeWithRender>
      ) => {
        return DateUtil.GMTOffset(params.value);
      },
      filterOperators: getGridDateOperators()
    },
    getTableActions()
  ];

  return (
    <StandardTable
      name={table}
      columns={columns}
      rows={expenses}
      customToolbar={getTableAddButton('/expenses/new')}
      loading={loading}
      checkBoxSelection={false}
    />
  );
}

function useTableActions(
  table: string,
  setExpenses: (value: (previousValue: Expense[]) => Expense[]) => void
) {
  function getTableActions() {
    return {
      field: 'actions',
      headerName: 'Ações',
      minWidth: 200,
      renderCell: (params: any) => {
        const row = params.row;

        return (
          <div className="flex gap-2" key={`${table}_Actions_${row.id}`}>
            <DefaultButton
              key={`${table}_Edit_${row.id}`}
              color="primary"
              route={`expenses/edit?id=${row.id}`}
            >
              <EditIcon fontSize="small" key={`${table}_Edit_${row.id}`} />
            </DefaultButton>
            <DefaultButton
              color="error"
              key={`${table}_Delete_${row.id}`}
              onClickFunction={() => {
                Alert({
                  title: 'Alerta',
                  message: 'Tem certeza que deseja deletar ?',
                  variant: 'warning',
                  cancelButton: true,
                  focusCancel: true,
                  allowEscapeKey: true,
                  allowOutsideClick: true,
                  callbackFunction: async () => {
                    await onDeleteAction(row.id);
                  }
                });
              }}
            >
              <DeleteIcon fontSize="small" key={`${table}_Delete_${row.id}`} />
            </DefaultButton>
          </div>
        );
      }
    };
  }

  async function onDeleteAction(id: string) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SYSTEM_URL}/api/expenses/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      Alert({
        title: 'Falha ao remover registro',
        message: 'Por favor, tente novamente.',
        variant: 'error',
        allowOutsideClick: true,
        allowEscapeKey: true
      });
      Promise.resolve();
    }

    setExpenses((previousValue: Expense[]) =>
      previousValue.filter((expense) => expense.id != id)
    );

    Alert({
      message: 'Alterações salvas com sucesso.',
      variant: 'success',
      timer: 1500
    });
  }

  return { getTableActions };
}

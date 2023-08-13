'use client';

import DefaultButton from '@Components/Structure/Button';
import StandardTable from '@Components/Structure/Table';
import { DateUtil } from '@Utils/Date';
import { MoneyUtil } from '@Utils/Money';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getTableAddButton } from '../utils/customButtons';

interface ITableListExpenses {
  rows: any[];
}

export default function TableListExpenses({ rows }: ITableListExpenses) {
  const table = 'TableListExpenses';
  const { getTableActions } = useTableActions(table);

  const columns = [
    { field: 'name', headerName: 'Nome', minWidth: 300 },
    {
      field: 'value',
      headerName: 'Valor',
      minWidth: 300,
      valueFormatter: (params: any) => MoneyUtil.toBRL(params.value)
    },
    {
      field: 'dueDate',
      headerName: 'Data de Vencimento',
      minWidth: 200,
      valueFormatter: (params: any) => DateUtil.toLocalePtBr(params.value)
    },
    getTableActions()
  ];

  return (
    <StandardTable
      name={table}
      columns={columns}
      rows={rows}
      customToolbar={getTableAddButton('/expenses/new')}
    />
  );
}

function useTableActions(table: string) {
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
              route={`eventos/${row.id}`}
            >
              <EditIcon fontSize="small" key={`${table}_Edit_${row.id}`} />
            </DefaultButton>
            <DefaultButton color="error" key={`${table}_Delete_${row.id}`}>
              <DeleteIcon fontSize="small" key={`${table}_Delete_${row.id}`} />
            </DefaultButton>
          </div>
        );
      }
    };
  }
  return { getTableActions };
}
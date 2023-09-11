import ExpenseForm from '@Components/Forms/Expenses/Edit';
import {
  alertDeletion,
  alertDeletionFailed,
  alertEditSuccess,
  onDeleteAction
} from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import { ExpenseDto } from '@Types/Expense/types';
import { GridCellEditStopParams } from '@mui/x-data-grid';
import { Expense } from '@prisma/client';

type ISetExpenses = (value: (previousValue: Expense[]) => Expense[]) => void;

export function useTableActions(setExpenses: ISetExpenses) {
  function onEditRow(row: Expense) {
    return (
      <ExpenseForm
        expense={
          {
            id: row.id,
            name: row.name,
            value: String(row.value),
            dueDate: String(row.dueDate),
            type: row.type
          } as ExpenseDto
        }
      />
    );
  }

  const onConfirmDeletion = async (row: Expense) => {
    await onDeleteAction({
      info: { id: row.id, endpoint: 'expenses' },
      callback: setExpenses
    });
  };

  const onBatchDelete = async (selectedRows: string[]) => {
    const onConfirmDeletion = async () => {
      try {
        await clientConn.delete(`/expenses`, {
          params: {
            expenseIds: selectedRows.join(',')
          }
        });

        setExpenses((previousExpenses: Expense[]) =>
          previousExpenses.filter(({ id }) => !selectedRows.includes(id))
        );

        alertEditSuccess();
      } catch (error) {
        alertDeletionFailed();
      }
    };

    alertDeletion(onConfirmDeletion);
  };

  const onRowUpdate = async (
    newRow: GridCellEditStopParams,
    oldRow: GridCellEditStopParams
  ) => {
    const response = await clientConn.put('/expenses', newRow);
    if (response.status != 200) return oldRow;
    alertEditSuccess();
    return newRow;
  };

  return {
    onConfirmDeletion,
    onBatchDelete,
    onRowUpdate,
    onEditRow
  };
}

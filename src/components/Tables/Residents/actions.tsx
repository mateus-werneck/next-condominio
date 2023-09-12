import ResidentForm from '@Components/Forms/Resident/Edit';
import {
  alertDeletion,
  alertDeletionFailed,
  alertEditSuccess,
  onDeleteAction
} from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import { GridCellEditStopParams } from '@mui/x-data-grid';
import { Resident } from '@prisma/client';

type ISetResidents = (value: (previousValue: Resident[]) => Resident[]) => void;
type ISetResident = (value: Resident) => void;

export function useTableActions(
  setResidents: ISetResidents,
  setEditRow: ISetResident
) {
  function onEditRow(row: Resident) {
    setEditRow(row);
  }

  const onConfirmDeletion = async (row: Resident) => {
    await onDeleteAction({
      info: { id: row.id, endpoint: 'residents' },
      callback: setResidents
    });
  };

  const onBatchDelete = async (selectedRows: string[]) => {
    const onConfirmDeletion = async () => {
      try {
        const params = { residents: selectedRows.join(',') };
        await clientConn.delete(`/residents`, { params });

        setResidents((previousExpenses: Resident[]) =>
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
    const response = await clientConn.put('/residents', newRow);
    if (response.status != 200) return oldRow;
    alertEditSuccess();
    return newRow;
  };

  return {
    onEditRow,
    onConfirmDeletion,
    onBatchDelete,
    onRowUpdate
  };
}

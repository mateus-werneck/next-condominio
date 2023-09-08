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

export function useTableActions(setResidents: ISetResidents) {
  const onConfirmDeletion = async (row: { id: string }) => {
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
    onConfirmDeletion,
    onBatchDelete,
    onRowUpdate
  };
}

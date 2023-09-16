import Button from '@Components/Structure/Button';
import { alertDeletion } from '@Lib/Alerts/customActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { ITableDeleteButton, TableRecord } from '../../types';

export default function Delete<T extends TableRecord>({
  row: { id },
  table,
  onConfirmDeletion
}: ITableDeleteButton<T>): JSX.Element {
  return (
    <Button
      className="bg-transperent hover:text-gray-500 hover:border-solid hover:border-[1px] hover:border-gray-500"
      key={`${table}_Delete_${id}`}
      onClickFunction={() =>
        alertDeletion(async (row: T) => await onConfirmDeletion(row))
      }
    >
      <DeleteIcon
        fontSize="small"
        key={`${table}_Delete_${id}`}
        color="error"
      />
    </Button>
  );
}

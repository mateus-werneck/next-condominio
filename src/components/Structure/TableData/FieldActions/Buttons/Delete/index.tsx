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
      className="bg-transperent hover:text-red hover:bg-gray-300"
      key={`${table}_Delete_${id}`}
      onClickFunction={() => alertDeletion(onConfirmDeletion)}
    >
      <DeleteIcon
        className="w-10 h-10 md:w-6 md:h-6"
        key={`${table}_Delete_${id}`}
      />
    </Button>
  );
}

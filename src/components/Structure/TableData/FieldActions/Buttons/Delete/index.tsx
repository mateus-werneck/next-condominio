import DefaultButton from '@Components/Structure/Button';
import { alertDeletion } from '@Lib/Alerts/customActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { ITableDeleteButton, TableRecord } from '../../types';

export default function Delete<T extends TableRecord>({
  row: { id },
  table,
  onConfirmDeletion
}: ITableDeleteButton<T>): JSX.Element {
  return (
    <DefaultButton
      color="error"
      key={`${table}_Delete_${id}`}
      onClickFunction={() => alertDeletion(onConfirmDeletion)}
    >
      <DeleteIcon fontSize="small" key={`${table}_Delete_${id}`} />
    </DefaultButton>
  );
}

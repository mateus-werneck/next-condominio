import DefaultButton from '@Components/Structure/Button';
import { alertDeletion } from '@Lib/Alerts/customActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { ITableDeleteButton } from '../../types';

export default function Delete({
  row: { id },
  table,
  onConfirmDeletion
}: ITableDeleteButton): JSX.Element {
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

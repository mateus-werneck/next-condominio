import DefaultButton from '@Components/Structure/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ITableEditButton } from '../types';

export default function getEditButton({
  row: { id },
  table,
  route
}: ITableEditButton): JSX.Element {
  return (
    <DefaultButton
      key={`${table}_Edit_${id}`}
      color="primary"
      route={`${route}/edit?id=${id}`}
    >
      <VisibilityIcon fontSize="small" key={`${table}_Edit_${id}`} />
    </DefaultButton>
  );
}

import DefaultButton from '@Components/Structure/Button';
import Modal from '@Components/Structure/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ITableEditButton, TableRecord } from '../../types';

export default function Edit<T extends TableRecord>({
  table,
  row,
  onEditRow
}: ITableEditButton<T>): JSX.Element {
  return (
    <>
      <DefaultButton
        key={`${table}_Edit_${row.id}`}
        color="primary"
        onClickFunction={() => onEditRow(row)}
      >
        <VisibilityIcon fontSize="small" key={`${table}_Edit_${row.id}`} />
      </DefaultButton>
    </>
  );
}

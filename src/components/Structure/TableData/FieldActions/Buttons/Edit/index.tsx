import Button from '@Components/Structure/Button';
import { Colors } from '@Lib/Treat/Colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ITableEditButton, TableRecord } from '../../types';

export default function Edit<T extends TableRecord>({
  table,
  row,
  onEditRow
}: ITableEditButton<T>): JSX.Element {
  return (
    <>
      <Button
        key={`${table}_Edit_${row.id}`}
        color={Colors.info}
        onClickFunction={() => onEditRow(row)}
      >
        <VisibilityIcon fontSize="small" key={`${table}_Edit_${row.id}`} />
      </Button>
    </>
  );
}

import Button from '@Components/Structure/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ITableEditButton, TableRecord } from '../../types';

export default function Edit<T extends TableRecord>({
  table,
  row,
  onEditRow
}: ITableEditButton<T>): JSX.Element {
  if (!onEditRow) return <></>;

  return (
    <>
      <Button
        key={`${table}_Edit_${row.id}`}
        className="bg-transperent hover:text-blue hover:bg-gray-400"
        onClickFunction={() => onEditRow(row)}
      >
        <VisibilityIcon fontSize="medium" key={`${table}_Edit_${row.id}`} />
      </Button>
    </>
  );
}

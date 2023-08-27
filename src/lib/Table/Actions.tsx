import DefaultButton from '@Components/Structure/Button';
import { alertDeletion } from '@Lib/Alerts/customActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IEditButton {
  row: {
    id: string;
  };
  table: string;
  route: string;
}

export function getEditButton({
  row: { id },
  table,
  route
}: IEditButton): JSX.Element {
  return (
    <DefaultButton
      key={`${table}_Edit_${id}`}
      color="primary"
      route={`${route}/edit?id=${id}`}
    >
      <EditIcon fontSize="small" key={`${table}_Edit_${id}`} />
    </DefaultButton>
  );
}

interface IDeleteButton {
  row: {
    id: string;
  };
  table: string;
  onConfirmDeletion: () => void | Promise<void>;
}

export function getDeleteButton({
  row: { id },
  table,
  onConfirmDeletion
}: IDeleteButton): JSX.Element {
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

interface IDefaultTableActions {
  table: string;
  route: string;
  onConfirmDeletion: (row: { id: string }) => void | Promise<void>;
}

export function getDefaultTableActions({
  table,
  route,
  onConfirmDeletion
}: IDefaultTableActions) {
  return {
    field: 'actions',
    headerName: 'Ações',
    minWidth: 200,
    renderCell: (params: any) => {
      const row = params.row;

      return (
        <div className="flex gap-2" key={`${table}_Actions_${row.id}`}>
          {getEditButton({ row, table, route })}
          {getDeleteButton({
            row,
            table,
            onConfirmDeletion: () => onConfirmDeletion(row)
          })}
        </div>
      );
    }
  };
}

import DefaultButton from '@Components/Structure/Button';
import { alertDeletion } from '@Lib/Alerts/customActions';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  IDefaultTableActions,
  ITableDeleteButton,
  ITableEditButton
} from './types';

export function getTableAddButton(route: string): JSX.Element[] {
  return [
    <DefaultButton route={route} variant="text" key={route}>
      <AddIcon fontSize="small" />
      Adicionar
    </DefaultButton>
  ];
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

export function getEditButton({
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

export function getDeleteButton({
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

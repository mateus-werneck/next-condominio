import getDeleteButton from './Buttons/Delete';
import getEditButton from './Buttons/Edit';
import { IDefaultTableActions } from './types';

export default function ActionsColumn({
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
            onConfirmDeletion: async () => await onConfirmDeletion(row)
          })}
        </div>
      );
    }
  };
}

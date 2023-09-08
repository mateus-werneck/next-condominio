import Delete from './Buttons/Delete';
import Edit from './Buttons/Edit';
import { IDefaultTableActions } from './types';

export default function ActionsColumn({
  table,
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
          {Edit({ row, table })}
          {Delete({
            row,
            table,
            onConfirmDeletion: async () => await onConfirmDeletion(row)
          })}
        </div>
      );
    }
  };
}

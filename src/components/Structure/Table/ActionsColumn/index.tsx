import Delete from './Buttons/Delete';
import Edit from './Buttons/Edit';
import { IDefaultTableActions, TableRecord } from './types';

export default function ActionsColumn<T extends TableRecord>({
  table,
  onEditRow,
  onConfirmDeletion
}: IDefaultTableActions<T>) {
  return {
    field: 'actions',
    headerName: 'Ações',
    minWidth: 200,
    renderCell: (params: any) => {
      const row = params.row;

      return (
        <div className="flex gap-2" key={`${table}_Actions_${row.id}`}>
          {onEditRow && Edit<T>({ row, table, onEditRow })}
          {Delete<T>({
            table,
            row,
            onConfirmDeletion: async () => await onConfirmDeletion(row)
          })}
        </div>
      );
    }
  };
}

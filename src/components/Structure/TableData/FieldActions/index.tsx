import Delete from './Buttons/Delete';
import Edit from './Buttons/Edit';
import { TTableActions, TableRecord } from './types';

export default function FieldActions<T extends TableRecord>(
  table: string,
  { onEditRow, onConfirmDeletion }: TTableActions<T>
) {
  return {
    field: 'actions',
    headerName: 'Ações',
    minWidth: 200,
    renderCell: (params: any) => {
      const row = params.row;

      return (
        <div className="flex gap-4" key={`${table}_Actions_${row.id}`}>
          {Edit<T>({ row, table, onEditRow })}
          {Delete<T>({
            row,
            table,
            onConfirmDeletion: async () => await onConfirmDeletion(row)
          })}
        </div>
      );
    }
  };
}

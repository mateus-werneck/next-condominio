import { GridColDef } from '@mui/x-data-grid';
import { GridColumnsConfig, IGridColumnTypes } from './types';

export function treatColumns(columns: GridColDef[], isEditable?: boolean) {
  const treatedColumns = columns.map(appendColumnConfig);

  if (isEditable) return treatEditable(treatedColumns);

  return treatedColumns;
}

function appendColumnConfig(column: GridColDef): GridColDef {
  const columnType: string = column.type ?? 'string';
  const customConfig = getColumnConfig(columnType as IGridColumnTypes);

  const customColumn = {
    ...column,
    ...customConfig
  };

  delete customColumn.type;
  return customColumn;
}

function getColumnConfig(type: IGridColumnTypes) {
  return GridColumnsConfig[type];
}

function treatEditable(columns: GridColDef[]): GridColDef[] {
  return columns.map((column) => {
    return { ...column, editable: true };
  });
}

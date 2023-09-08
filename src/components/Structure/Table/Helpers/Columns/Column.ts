import { GridColDef } from '@mui/x-data-grid';
import { GridColumnsConfig, IGridColumnTypes } from './types';

export function treatColumns(columns: GridColDef[], isEditable?: boolean) {
  const treatedColumns = columns.map(appendColumnConfig);

  if (isEditable) return treatEditable(treatedColumns);

  return treatedColumns;
}

function appendColumnConfig(column: GridColDef): GridColDef {
  const columnType = (column.type ?? 'string') as IGridColumnTypes;
  const columnTreatments = GridColumnsConfig[columnType];

  const treatedColumn = {
    ...column,
    ...columnTreatments
  };

  delete treatedColumn.type;
  return treatedColumn;
}

function treatEditable(columns: GridColDef[]): GridColDef[] {
  return columns.map((column) => {
    return { ...column, editable: true };
  });
}

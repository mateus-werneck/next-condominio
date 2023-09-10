import { GridColDef } from '@mui/x-data-grid';
import { GridColumnsConfig, IGridColumnTypes } from './types';

export function treatColumns(columns: GridColDef[], isEditable?: boolean) {
  const treatedColumns = columns.map(treatEachColumn);

  if (isEditable) return treatEditable(treatedColumns);

  return treatedColumns;
}

function treatEachColumn(column: GridColDef): GridColDef {
  const columnType = (column.type ?? 'string') as IGridColumnTypes;
  const columnTreatments = GridColumnsConfig[columnType];

  delete column.type;

  const treatedColumn = {
    ...column,
    ...columnTreatments
  };

  return treatedColumn;
}

function treatEditable(columns: GridColDef[]): GridColDef[] {
  return columns.map((column) => {
    return { ...column, editable: column.field !== 'actions' };
  });
}

import { GridCellEditStopParams, GridColDef } from '@mui/x-data-grid';

export interface ITableData {
  name: string;
  columns: GridColDef[];
  rows: any[];
  onRowUpdate?: (
    newRow: GridCellEditStopParams,
    oldRow: GridCellEditStopParams
  ) => GridCellEditStopParams | Promise<GridCellEditStopParams>;
  rowsPerPage?: number;
  checkBoxSelection?: boolean;
  customToolbar?: JSX.Element[];
  onBatchDelete?: (selectedRows: string[]) => void;
  loading?: boolean;
}

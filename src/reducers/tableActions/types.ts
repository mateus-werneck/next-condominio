import { GridCellEditStopParams } from '@mui/x-data-grid';

export interface TableReducerInitialState<T> {
  editRow: T | null;
  rows: T[];
  loading?: boolean;
}

export interface ITableReducerAction {
  type:
    | 'edit'
    | 'cancelEdit'
    | 'update'
    | 'updateRow'
    | 'delete'
    | 'batchDelete'
    | 'setRows'
    | 'removeRows'
    | 'loading'
    | 'loaded';
  payload?: any;
}

export interface IBatchDelete {
  selectedRows: string[];
  route: string;
}

export interface IRowUpdate {
  newRow: GridCellEditStopParams;
  oldRow: GridCellEditStopParams;
  route: string;
}

export interface IRowDelete<T> {
  row: T;
  route: string;
}

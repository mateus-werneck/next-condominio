export interface TableRecord {
  id: string;
}

export interface ITableEditButton<T extends TableRecord> {
  table: string;
  row: T;
  onEditRow: (row: T) => JSX.Element;
}

export interface ITableDeleteButton<T> {
  table: string;
  row: {
    id: string;
  };
  onConfirmDeletion: (row: T) => void | Promise<void>;
}

export interface IDefaultTableActions<T extends TableRecord> {
  table: string;
  onEditRow?: (row: T) => JSX.Element;
  onConfirmDeletion: (row: T) => void | Promise<void>;
}

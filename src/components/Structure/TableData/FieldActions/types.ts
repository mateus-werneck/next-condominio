export interface TableRecord {
  id: string;
}

export interface ITableEditButton<T extends TableRecord> {
  table: string;
  row: T;
  onEditRow?: (row: T) => void;
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
  onEditRow?: (row: T) => void;
  onConfirmDeletion: (row: T) => void | Promise<void>;
}

export interface ITableEditButton {
  table: string;
  row: {
    id: string;
  };
  onEditRow: IEditFormCallback;
}

export interface IEditFormCallback {
  (row: { id: string }): JSX.Element;
}
export type IConfirmDeletionCallback = (row: { id: string }) => Promise<void>;

export interface ITableDeleteButton {
  table: string;
  row: {
    id: string;
  };
  onConfirmDeletion: IConfirmDeletionCallback;
}

export interface IDefaultTableActions {
  table: string;
  onEditRow: IEditFormCallback;
  onConfirmDeletion: (row: { id: string }) => void | Promise<void>;
}

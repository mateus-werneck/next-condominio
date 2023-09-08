export interface ITableEditButton {
  row: {
    id: string;
  };
  table: string;
}

export type IConfirmDeletionCallback = (row: { id: string }) => Promise<void>;

export interface ITableDeleteButton {
  row: {
    id: string;
  };
  table: string;
  onConfirmDeletion: IConfirmDeletionCallback;
}

export interface IDefaultTableActions {
  table: string;
  onConfirmDeletion: (row: { id: string }) => void | Promise<void>;
}

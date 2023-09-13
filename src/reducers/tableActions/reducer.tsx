import {
  alertDeletion,
  alertDeletionFailed,
  alertEditSuccess,
  onDeleteAction
} from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import { useReducer } from 'react';
import {
  IBatchDelete,
  IRowDelete,
  IRowUpdate,
  ITableReducerAction,
  TableReducerInitialState
} from './types';

export function useTableReducer<T extends Record<string, any>>(
  initialState: TableReducerInitialState<T>
) {
  const onBatchDelete = async ({ selectedRows, route }: IBatchDelete) => {
    const onConfirmDeletion = async () => {
      try {
        const params = { residents: selectedRows.join(',') };
        await clientConn.delete(route, { params });
        alertEditSuccess();
      } catch (error) {
        alertDeletionFailed();
      }
    };
    alertDeletion<T>(onConfirmDeletion);
  };

  const onRowUpdate = async ({ newRow, oldRow, route }: IRowUpdate) => {
    let data = newRow;

    try {
      const response = await clientConn.put(route, newRow);
      if (response.status != 200) data = oldRow;

      if (response.status == 200) alertEditSuccess();
    } catch (error) {
      data = oldRow;
    }

    dispatch({
      type: 'updateRow',
      payload: data
    });
  };

  const onRowDelete = async ({ row, route }: IRowDelete<T>) => {
    await onDeleteAction({
      info: { id: row.id, endpoint: route }
    });
  };

  function tableReducer(
    state: TableReducerInitialState<T>,
    action: ITableReducerAction
  ) {
    switch (action.type) {
      case 'edit':
        return {
          ...state,
          editRow: action.payload
        };
      case 'cancelEdit':
        return {
          ...state,
          editRow: null
        };
      case 'update':
        onRowUpdate(action.payload);
        return state;
      case 'updateRow':
        return {
          ...state,
          rows: state.rows.map((row) =>
            row.id === action.payload.id ? action.payload : row
          )
        };
      case 'delete':
        onRowDelete(action.payload);
        return {
          ...state,
          rows: state.rows.filter((row: T) => row.id != action.payload.id)
        };
      case 'batchDelete':
        onBatchDelete(action.payload);
        const keepRows = state.rows.filter(
          (row: T) => !action.payload.includes(row.id)
        );
        return {
          ...state,
          rows: keepRows
        };
      case 'setRows':
        return {
          ...state,
          rows: action.payload
        };
      case 'loading':
        return {
          ...state,
          loading: true
        };
      case 'loaded':
        return {
          ...state,
          loading: false
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(tableReducer, initialState);

  return { state, dispatch };
}

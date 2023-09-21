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

  const onBatchDelete = async ({ selectedRows, route }: IBatchDelete) => {
    const onConfirmDeletion = async () => {
      try {
        const params = { ids: selectedRows.join(',') };
        await clientConn.delete(route, { params });
        alertEditSuccess();
        dispatch({ type: 'removeRows', payload: selectedRows });
      } catch (error) {
        alertDeletionFailed();
      }
    };
    alertDeletion<T>(onConfirmDeletion);
  };

  const onRowDelete = async ({ row, route }: IRowDelete<T>) => {
    await onDeleteAction({
      info: { id: row.id, endpoint: route },
      callbackFunction: () => {
        dispatch({ type: 'removeRows', payload: [row.id] });
      }
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
        return state;
      case 'batchDelete':
        onBatchDelete(action.payload);
        return state;
      case 'setRows':
        return {
          ...state,
          rows: action.payload
        };
      case 'removeRows':
        return {
          ...state,
          rows: state.rows.filter((row) => !action.payload.includes(row.id))
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
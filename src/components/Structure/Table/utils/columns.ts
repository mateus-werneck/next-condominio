import { DateUtil } from '@Lib/Treat/Date';
import { MoneyUtil } from '@Lib/Treat/Money';
import {
  GridColDef,
  GridTreeNodeWithRender,
  GridValueFormatterParams,
  GridValueGetterParams,
  getGridDateOperators,
  getGridNumericOperators,
  getGridStringOperators
} from '@mui/x-data-grid';

export function appendColumnConfig(column: GridColDef): GridColDef {
  const columnType: string = column.type !== undefined ? column.type : 'string';
  const customConfig = getColumnConfig(columnType as IGridColumnTypes);

  const customColumn = {
    ...column,
    ...customConfig
  };

  delete customColumn.type;
  return customColumn;
}

function getColumnConfig(type: IGridColumnTypes) {
  return GridColumnsConfig[type];
}

const GridColumnsConfig = {
  string: {
    filterOperators: getGridStringOperators()
  },
  number: {
    valueFormatter: (params: GridValueFormatterParams<any>) =>
      Number(params.value),
    filterOperators: getGridNumericOperators()
  },
  money: {
    valueFormatter: (params: GridValueFormatterParams<any>) =>
      MoneyUtil.toBRL(params.value),
    filterOperators: getGridNumericOperators()
  },
  date: {
    valueFormatter: (params: GridValueFormatterParams<any>) => {
      const date = new Date(params.value).toISOString();
      const offset = DateUtil.BRTOffset(date);
      return DateUtil.fromDateToPtBrString(offset);
    },
    valueGetter: (
      params: GridValueGetterParams<any, any, GridTreeNodeWithRender>
    ) => {
      return DateUtil.GMTOffset(params.value);
    },
    filterOperators: getGridDateOperators()
  },
  select: {
    valueFormatter: (params: GridValueFormatterParams) => params.value.label,
    valueGetter: (
      params: GridValueGetterParams<any, any, GridTreeNodeWithRender>
    ) => params.value?.label ?? '',
    filterOperators: getGridStringOperators()
  }
} as const;

type IGridColumnTypes = keyof typeof GridColumnsConfig;

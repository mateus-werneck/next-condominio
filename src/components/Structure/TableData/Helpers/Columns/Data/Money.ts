import { MoneyUtil } from '@Lib/Treat/Money';
import {
  GridColDef,
  GridTreeNodeWithRender,
  GridValueFormatterParams,
  GridValueGetterParams,
  getGridNumericOperators
} from '@mui/x-data-grid';

export const columnMoney: Partial<GridColDef> = {
  valueGetter: (
    params: GridValueGetterParams<any, any, GridTreeNodeWithRender>
  ) => MoneyUtil.toNumber(params.value),
  valueParser: (value: string) => MoneyUtil.toNumber(value),
  valueFormatter: (params: GridValueFormatterParams<any>) =>
    MoneyUtil.toBRL(params.value),
  filterOperators: getGridNumericOperators()
};

import { MoneyUtil } from '@Lib/Treat/Money';
import {
  GridColDef,
  GridValueFormatterParams,
  getGridNumericOperators
} from '@mui/x-data-grid';

export const columnMoney: Partial<GridColDef> = {
  valueFormatter: (params: GridValueFormatterParams<any>) =>
    MoneyUtil.toBRL(params.value),
  filterOperators: getGridNumericOperators()
};

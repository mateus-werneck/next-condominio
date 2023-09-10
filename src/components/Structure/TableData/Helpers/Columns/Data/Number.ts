import {
  GridColDef,
  GridValueFormatterParams,
  getGridNumericOperators
} from '@mui/x-data-grid';

export const columnNumber: Partial<GridColDef> = {
  valueFormatter: (params: GridValueFormatterParams<any>) =>
    Number(params.value),
  filterOperators: getGridNumericOperators()
};

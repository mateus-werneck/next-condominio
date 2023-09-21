import {
  GridColDef,
  GridTreeNodeWithRender,
  GridValueFormatterParams,
  GridValueGetterParams,
  getGridStringOperators
} from '@mui/x-data-grid';

export const columnSelect: Partial<GridColDef> = {
  type: 'singleSelect',
  valueFormatter: (params: GridValueFormatterParams) => params.value.label,
  valueGetter: (
    params: GridValueGetterParams<any, any, GridTreeNodeWithRender>
  ) => params.value?.label ?? '',
  filterOperators: getGridStringOperators()
};

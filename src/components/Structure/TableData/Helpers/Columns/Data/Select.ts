import { GridColDef, getGridSingleSelectOperators } from '@mui/x-data-grid';

export const columnSelect: Partial<GridColDef> = {
  type: 'singleSelect',
  getOptionLabel(value: any) {
    return value.label;
  },
  getOptionValue(value: any) {
    return value.id;
  },
  filterOperators: getGridSingleSelectOperators()
};

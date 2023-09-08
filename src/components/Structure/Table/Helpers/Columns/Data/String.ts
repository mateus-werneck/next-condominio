import { GridColDef, getGridStringOperators } from '@mui/x-data-grid';

export const columnString: Partial<GridColDef> = {
  filterOperators: getGridStringOperators()
};

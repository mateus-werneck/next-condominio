import { DateUtil } from '@Lib/Treat/Date';
import {
  GridColDef,
  GridTreeNodeWithRender,
  GridValueGetterParams,
  getGridDateOperators
} from '@mui/x-data-grid';

export const columnDate: Partial<GridColDef> = {
  type: 'date',
  valueGetter: (
    params: GridValueGetterParams<any, any, GridTreeNodeWithRender>
  ) => {
    const date =
      typeof params.value === 'string'
        ? DateUtil.toISOString(params.value)
        : params.value;
    return DateUtil.GMTOffset(date);
  },
  filterOperators: getGridDateOperators()
};

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
    const date = DateUtil.toISOString(params.value);
    return DateUtil.GMTOffset(date);
  },
  valueParser: (value: string) => {
    const date = DateUtil.toISOString(value);
    return DateUtil.GMTOffset(date);
  },
  filterOperators: getGridDateOperators()
};

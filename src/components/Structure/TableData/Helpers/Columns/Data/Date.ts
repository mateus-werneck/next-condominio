import { DateUtil } from '@Lib/Treat/Date';
import {
  GridColDef,
  GridTreeNodeWithRender,
  GridValueFormatterParams,
  GridValueGetterParams,
  getGridDateOperators
} from '@mui/x-data-grid';

export const columnDate: Partial<GridColDef> = {
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
};

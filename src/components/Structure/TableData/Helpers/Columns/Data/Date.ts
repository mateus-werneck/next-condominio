import { DateUtil } from '@Lib/Treat/Date';
import {
  GridColDef,
  GridTreeNodeWithRender,
  GridValueGetterParams,
  getGridDateOperators
} from '@mui/x-data-grid';

export const columnDate: Partial<GridColDef> = {
  valueGetter: (
    params: GridValueGetterParams<any, any, GridTreeNodeWithRender>
  ) => {
    const date = DateUtil.fromPtBrStringToIsoString(params.value);
    return DateUtil.GMTOffset(date);
  },
  filterOperators: getGridDateOperators()
};

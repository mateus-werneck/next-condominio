import { columnDate } from './Data/Date';
import { columnMoney } from './Data/Money';
import { columnNumber } from './Data/Number';
import { columnSelect } from './Data/Select';
import { columnString } from './Data/String';

export type IGridColumnTypes = keyof typeof GridColumnsConfig;

export const GridColumnsConfig = {
  string: columnString,
  number: columnNumber,
  money: columnMoney,
  date: columnDate,
  singleSelect: columnSelect
} as const;

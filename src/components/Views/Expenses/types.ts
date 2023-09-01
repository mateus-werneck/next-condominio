import { ISelectOption } from '@Components/Structure/Form/Input/utils/types';
import { IFilter } from '@Lib/Treat/Request';

interface IExpenseType extends ISelectOption {
  id: string;
  name: string;
  label: string;
}

export interface IExpensesFilters {
  startAt: string;
  endAt: string;
  name: string;
  expenseTypes: IExpenseType[];
}

export interface IExpenseQueryParams extends IFilter {
  startAt: string;
  endAt: string;
  name: string;
  expenseTypes: string;
}

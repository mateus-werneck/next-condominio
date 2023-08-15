import { IFilter } from '@Utils/Request';

interface IExpenseType extends ISelectOption {
  id: number;
  name: string;
  label: string;
}

export interface IExpensesFilters extends IFilter {
  startAt: string;
  endAt: string;
  name: string | null;
  expenseTypes: IExpenseType[];
}

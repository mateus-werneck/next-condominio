import ViewExpenses from '@Components/Views/Expenses';
import { DateUtil } from '@Lib/Treat/Date';
import { Metadata } from 'next';
import { fetchExpenses, fetchTypes } from './utils/requests';

export const metadata: Metadata = {
  title: 'Despesas'
};

export default async function Expenses() {
  const monthRange = DateUtil.getMonthRange();
  const rows = await fetchExpenses(monthRange);
  const expenseTypes = await fetchTypes();

  return (
    <ViewExpenses
      rows={rows}
      monthRange={monthRange}
      expenseTypes={expenseTypes}
    />
  );
}

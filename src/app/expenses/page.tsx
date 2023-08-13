import ViewExpenses from '@Components/Views/Expenses';
import { DateUtil, MonthRange } from '@Utils/Date';
import { appendQueryParams } from '@Utils/Request';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Despesas'
};

const data = async (monthRange: MonthRange): Promise<[]> => {
  const url = appendQueryParams('http://localhost/api/expenses', {
    startAt: DateUtil.toIsoStringDate(monthRange.startAt),
    endAt: DateUtil.toIsoStringDate(monthRange.endAt)
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 1 }
  });

  return await response.json();
};

export default async function Expenses() {
  const monthRange = DateUtil.getMonthRange();
  const rows = await data(monthRange);

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });

  return <ViewExpenses rows={rows} monthRange={monthRange} />;
}

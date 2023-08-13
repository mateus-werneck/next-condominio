import ViewExpenses from '@Components/Views/Expenses';
import { DateUtil, MonthRange } from '@Utils/Date';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Despesas'
};

const data = async ({ startAt, endAt }: MonthRange): Promise<[]> => {
  const url = new URL(`http://localhost/api/expenses`);

  url.searchParams.append('startAt', DateUtil.toIsoStringDate(startAt));
  url.searchParams.append('endAt', DateUtil.toIsoStringDate(endAt));

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

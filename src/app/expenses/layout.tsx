import Link from 'next/link';
import { ReactNode } from 'react';

interface IExpensesLayout {
  children: ReactNode;
}
export default async function ExpensesLayout({ children }: IExpensesLayout) {
  return (
    <>
      <div className="flex flex-col justify-between gap-8 pt-4 pb-4 max-w-full">
        <Link
          href="/expenses"
          className="text-base self-center hd:self-start font-bold text-black hover:text-slate-600"
        >
          Despesas Gerais
        </Link>
      </div>
      {children}
    </>
  );
}

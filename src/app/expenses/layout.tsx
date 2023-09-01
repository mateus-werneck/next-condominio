import { ReactNode } from 'react';

interface IExpensesLayout {
  children: ReactNode;
}
export default async function ExpensesLayout({ children }: IExpensesLayout) {
  return (
    <>
      <div className="flex flex-col justify-between gap-8 pt-4 pb-4 max-w-full">
        <h2 className="text-base font-bold text-black">Despesas Gerais</h2>
      </div>
      {children}
    </>
  );
}

import { ReactNode } from 'react';

interface IExpensesLayout {
  children: ReactNode;
}
export default async function ExpensesLayout({ children }: IExpensesLayout) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 p-4 max-w-full">
      <h1 className="text-bold text-2xl">Condomínio</h1>
      <h2 className="text-base text-slate-600">Despesas Gerais</h2>
      {children}
    </div>
  );
}

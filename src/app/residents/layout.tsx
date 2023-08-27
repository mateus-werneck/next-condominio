import { ReactNode } from 'react';

interface IResidentsLayout {
  children: ReactNode;
}
export default async function ResidentsLayout({ children }: IResidentsLayout) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 p-4 max-w-full">
      <h1 className="text-bold text-2xl">Moradores</h1>
      {children}
    </div>
  );
}

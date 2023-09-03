import { ReactNode } from 'react';

interface IResidentsLayout {
  children: ReactNode;
}
export default async function ResidentsLayout({ children }: IResidentsLayout) {
  return (
    <div className="flex flex-col justify-between gap-4 p-4 max-w-full">
      <h1 className="text-base font-bold text-black">Moradores</h1>
      {children}
    </div>
  );
}
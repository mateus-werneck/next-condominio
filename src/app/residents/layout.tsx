import Link from 'next/link';
import { ReactNode } from 'react';

interface IResidentsLayout {
  children: ReactNode;
}
export default async function ResidentsLayout({ children }: IResidentsLayout) {
  return (
    <div className="flex flex-col justify-between gap-4 p-4 max-w-full">
      <Link
        href="/residents"
        className="text-base self-center hd:self-start font-bold text-black hover:text-slate-600"
      >
        Moradores
      </Link>
      {children}
    </div>
  );
}

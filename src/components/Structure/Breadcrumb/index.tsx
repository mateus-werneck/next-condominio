'use client';

import { useDevice } from '@Contexts/useDevice';
import { capitalize } from '@Lib/Treat/String';
import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const { isMobileView } = useDevice();
  const pathName = usePathname();
  const paths = pathName?.split('?')[0].split('/').filter(Boolean) ?? [];
  const breadcrumbs = paths.slice(0, -1);

  if (isMobileView() || paths.length <= 1) {
    return <></>;
  }

  return (
    <div className="absolute right-6">
      <Breadcrumbs aria-label="breadcrumb" className="text-sm text-black">
        <Link href="/" className="hover:underline hover:text-slate-400">
          Home
        </Link>
        {breadcrumbs !== undefined &&
          breadcrumbs.map((path) => (
            <Link
              href={`/${path}`}
              key={path}
              className="hover:underline hover:text-slate-400"
            >
              {capitalize(path)}
            </Link>
          ))}
      </Breadcrumbs>
    </div>
  );
}

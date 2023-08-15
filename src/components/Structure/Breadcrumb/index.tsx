'use client';

import { capitalize } from '@Lib/Treat/String';
import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathName = usePathname();
  const paths = pathName.split('?')[0].split('/').filter(Boolean);
  const breadcrumbs = paths.slice(0, -1);

  if (paths.length === 1) {
    return <></>;
  }

  return (
    <div className="h-8 max-w-fit">
      <div className="absolute right-8">
        <Breadcrumbs aria-label="breadcrumb" className="text-black">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
          {breadcrumbs !== undefined &&
            breadcrumbs.map((path) => (
              <Link
                href={`/${path}`}
                key={path}
                className="hover:text-gray-600"
              >
                {capitalize(path)}
              </Link>
            ))}
        </Breadcrumbs>
      </div>
    </div>
  );
}

'use client';
import { useDevice } from '@Contexts/useDevice';
import { useMobileMenu } from '@Contexts/useMobileMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import HomeButton from './HomeButton';
import { NavLink } from './NavLink';
import { getMenuDefault } from './utils/StandardMenu';

export default function NavMenu() {
  const router = useRouter();
  const { isMobileView } = useDevice();

  const { showMobileMenu, resetActiveLink, hideMobileMenuSlowly } =
    useMobileMenu();

  const navStyles =
    'w-11/12 flex flex-col absolute items-start self-center top-16 gap-12' +
    ' z-10 py-8 px-2 rounded-2xl bg-white text-white transition-all delay-75' +
    ' md:flex md:flex-row md:gap-12 md:items-center md:text-sm md:h-16 md:py-6 md:px-24' +
    ' md:w-full md:rounded-none md:static md:opacity-100 md:visible md:bg-black'.concat(
      showMobileMenu ? ' opacity-100 visible' : ' opacity-0 invisible'
    );

  const Menu = getMenuDefault();

  return (
    <nav className={navStyles}>
      {<HomeButton styles={{ display: isMobileView() ? 'none' : 'block' }} />}

      {Menu.map((parent) => {
        return (
          <NavLink name={parent.name} key={parent.name}>
            {parent.children.map((child) => {
              const onChildClick = (event: MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                router.push(child.href);

                !isMobileView() ? resetActiveLink() : hideMobileMenuSlowly();
              };

              return (
                <Link
                  key={child.name}
                  href={child.href}
                  className="flex gap-4 items-start text-slate-800 w-96 hover:text-cyan-600 md:w-full"
                  onClick={onChildClick}
                >
                  {child.icon !== undefined && child.icon}
                  <span className="flex flex-col items-start gap-2">
                    {child.name}
                    {child.desc && (
                      <span className="text-xs">{child.desc}</span>
                    )}
                  </span>
                </Link>
              );
            })}
          </NavLink>
        );
      })}
    </nav>
  );
}

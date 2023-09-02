'use client';
import { NavLink } from '@Components/Structure/Header/NavLink';
import {
  getHomeButton,
  getMenuDefault
} from '@Components/Structure/Header/Utils/StandardMenu';
import { useDevice } from '@Contexts/useDevice';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { MobileActions } from './MobileActions';
import { IActiveLink } from './types';

interface IResponsive {
  getMenu: () => JSX.Element;
}

export const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const { getMenu } = useResponsive(showMobileMenu, setShowMobileMenu);

  function onClickMobile(e: any) {
    e.preventDefault();
    setShowMobileMenu((previousValue: boolean) => !previousValue);
  }

  const MobileMenu = useMemo(() => {
    return (
      <MobileActions showMobileMenu={showMobileMenu} onClick={onClickMobile} />
    );
  }, [showMobileMenu]);

  return (
    <>
      <div className="flex flex-col justify-between bg-white">
        {MobileMenu}
        {getMenu()}
      </div>
    </>
  );
};

function useResponsive(
  showMobileMenu: boolean,
  setShowMobileMenu: (value: boolean) => void
): IResponsive {
  const { isMobileView } = useDevice();
  const [activeLink, setActiveLink] = useState<IActiveLink>({});

  const getMenu = useCallback(getRenderedMenu, [
    isMobileView,
    showMobileMenu,
    setShowMobileMenu,
    activeLink
  ]);

  function getRenderedMenu() {
    const menu = getMenuDefault();

    return (
      <nav
        className={
          'w-11/12 flex flex-col absolute items-start self-center top-16 gap-12' +
          ' z-10 py-8 px-2 rounded-2xl bg-black text-white transition-all delay-75' +
          ' md:flex md:flex-row md:gap-12 md:items-center md:text-sm md:h-16 md:py-6 md:px-24' +
          ' md:w-full md:rounded-none md:static md:opacity-100 md:visible'.concat(
            showMobileMenu ? ' opacity-100 visible' : ' opacity-0 invisible'
          )
        }
      >
        {!isMobileView() && getHomeButton()}
        {menu.map((parent) => (
          <NavLink
            name={parent.name}
            key={parent.name}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
          >
            {parent.children.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                className="flex gap-4 items-start text-white md:text-slate-800 hover:text-cyan-600"
                onClick={() => setShowMobileMenu(false)}
              >
                {child.icon !== undefined && child.icon}
                <span className="flex flex-col items-start gap-2">
                  {child.name}
                  <span className="text-xs text-gray-300 md:text-inherit">
                    {child.desc}
                  </span>
                </span>
              </Link>
            ))}
          </NavLink>
        ))}
      </nav>
    );
  }

  return { getMenu };
}

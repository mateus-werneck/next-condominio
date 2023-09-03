'use client';
import { NavLink } from '@Components/Structure/Header/NavLink';
import {
  getHomeButton,
  getMenuDefault
} from '@Components/Structure/Header/Utils/StandardMenu';
import { useDevice } from '@Contexts/useDevice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { MobileActions } from './MobileActions';
import { IActiveLink } from './types';

interface IResponsive {
  getMenu: () => JSX.Element;
  getMobileActions: () => JSX.Element;
}

export const Header = () => {
  const { getMenu, getMobileActions } = useResponsive();

  return (
    <>
      <div className="flex flex-col justify-between bg-white">
        {getMobileActions()}
        {getMenu()}
      </div>
    </>
  );
};

function useResponsive(): IResponsive {
  const router = useRouter();
  const { isMobileView } = useDevice();

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<IActiveLink>({});

  function getMenu() {
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
                className="flex gap-4 items-start text-white w-96 hover:text-cyan-600 md:text-slate-800 md:w-full"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(child.href);

                  !isMobileView() &&
                    setActiveLink((previousValue: IActiveLink) => ({
                      ...previousValue,
                      [parent.name]: false
                    }));

                  setTimeout(() => {
                    setShowMobileMenu((previousValue: boolean) => {
                      return !previousValue;
                    });
                    setActiveLink((previousValue: IActiveLink) => ({
                      ...previousValue,
                      [parent.name]: false
                    }));
                  }, 800);
                }}
              >
                {child.icon !== undefined && child.icon}
                <span className="flex flex-col items-start gap-2">
                  {child.name}
                  {child.desc && <span className="text-xs">{child.desc}</span>}
                </span>
              </Link>
            ))}
          </NavLink>
        ))}
      </nav>
    );
  }

  function getMobileActions() {
    /* eslint-disable */
    const MobileMenu = useMemo(() => {
      function onClickMobile(e: any) {
        e.preventDefault();
        setShowMobileMenu((previousValue: boolean) => !previousValue);
      }
      return (
        <MobileActions
          showMobileMenu={showMobileMenu}
          onClick={onClickMobile}
        />
      );
    }, []);

    return MobileMenu;
  }

  return { getMenu, getMobileActions };
}

'use client';

import { NavLink } from '@Components/Structure/Header/NavLink';
import {
  StyledLink,
  StyledNavBar
} from '@Components/Structure/Header/NavLink/style';
import { getMenuDefault } from '@Components/Structure/Header/Utils/StandardMenu';
import { useDevice } from '@Contexts/useDevice';
import { CSSProperties, useCallback, useState } from 'react';
import { MobileActions } from './MobileActions';

interface IResponsive {
  getMenu: () => JSX.Element;
}
export interface IActiveLink {
  [name: string]: boolean;
}

export const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const { getMenu } = useResponsive(showMobileMenu);

  function onClickMobile(e: any) {
    e.preventDefault();
    setShowMobileMenu((previousValue: boolean) => !previousValue);
  }

  return (
    <div className="flex flex-col justify-between bg-white">
      <MobileActions onClick={onClickMobile} />
      {getMenu()}
    </div>
  );
};

function useResponsive(showMobileMenu: boolean): IResponsive {
  const { isMobileView } = useDevice();

  const [activeLink, setActiveLink] = useState<IActiveLink>({});

  const getMenu = useCallback(getRenderedMenu, [
    isMobileView,
    showMobileMenu,
    activeLink,
    getRenderedMenu,
    getStyledNavBarCustomStyle,
    getStyledNavBarName
  ]);

  function getRenderedMenu() {
    return (
      <StyledNavBar
        className={getStyledNavBarName()}
        style={getStyledNavBarCustomStyle()}
      >
        {getRenderedNavMenu()}
      </StyledNavBar>
    );
  }

  function getStyledNavBarName(): string {
    let customStyle =
      'flex gap-12 items-center bg-black text-white text-sm h-16 py-6 px-24';

    if (isMobileView())
      customStyle =
        'flex flex-col absolute items-start self-center top-16 gap-8' +
        ' z-10 py-8 px-2 rounded-2xl bg-black text-white';

    return customStyle;
  }

  function getStyledNavBarCustomStyle(): CSSProperties {
    if (!isMobileView()) return {};

    return {
      opacity: showMobileMenu ? 1 : 0,
      visibility: showMobileMenu ? 'visible' : 'hidden'
    };
  }

  function getRenderedNavMenu() {
    const menu = getMenuDefault();

    return menu.map((parent) => (
      <NavLink
        name={parent.name}
        key={parent.name}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      >
        {parent.children.map((child) => (
          <StyledLink
            key={child.name}
            href={child.href}
            className="flex gap-2 items-center"
          >
            {child.icon !== undefined && child.icon}
            {child.name}
          </StyledLink>
        ))}
      </NavLink>
    ));
  }

  return { getMenu };
}

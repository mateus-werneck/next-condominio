'use client';
import { IActiveLink } from '@Components/Structure/Header/NavMenu/types';
import React, { useContext, useState } from 'react';

interface IMobileMenuContext {
  showMobileMenu: boolean;
  setShowMobileMenu: (value: (previousValue: boolean) => boolean) => void;
  activeLink: IActiveLink;
  setActiveLink: (value: (previousValue: IActiveLink) => IActiveLink) => void;
  resetActiveLink: () => void;
}

interface IMobileMenuProvider {
  children: React.ReactNode;
}

export const MobileMenuContext = React.createContext<IMobileMenuContext>(
  {} as IMobileMenuContext
);

export function MobileMenuProvider({ children }: IMobileMenuProvider) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<IActiveLink>({} as IActiveLink);

  function resetActiveLink() {
    setActiveLink({} as IActiveLink);
  }

  return (
    <MobileMenuContext.Provider
      value={{
        showMobileMenu,
        setShowMobileMenu,
        activeLink,
        setActiveLink,
        resetActiveLink
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}

export const useMobileMenu = () => {
  return useContext(MobileMenuContext);
};

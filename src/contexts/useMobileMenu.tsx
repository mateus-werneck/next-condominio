'use client';
import { IActiveLink } from '@Components/Structure/Header/NavMenu/types';
import React, { useContext, useState } from 'react';

interface IMobileMenuContext {
  showMobileMenu: boolean;
  setShowMobileMenu: (value: (previousValue: boolean) => boolean) => void;
  activeLink: IActiveLink;
  setActiveLink: (value: (previousValue: IActiveLink) => IActiveLink) => void;
  isActiveLink: (name: string) => boolean;
  setCurrentLink: (name: string, enabled: boolean) => void;
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
    setActiveLink((previousValue: IActiveLink) => {
      const newActiveLink = { ...previousValue };

      Object.keys(newActiveLink).forEach((key) => {
        newActiveLink[key] = false;
      });

      return newActiveLink;
    });
  }

  function isActiveLink(name: string) {
    return activeLink[name];
  }

  function setCurrentLink(name: string, enabled: boolean) {
    setActiveLink((prev) => ({ ...prev, [name]: enabled }));
  }

  return (
    <MobileMenuContext.Provider
      value={{
        showMobileMenu,
        setShowMobileMenu,
        activeLink,
        setActiveLink,
        isActiveLink,
        setCurrentLink,
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

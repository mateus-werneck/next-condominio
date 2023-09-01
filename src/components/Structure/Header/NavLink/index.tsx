'use client';
import { useDevice } from '@Contexts/useDevice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { ReactNode, useCallback } from 'react';
import { IActiveLink } from '../types';

interface INavLink {
  name: string;
  activeLink: IActiveLink;
  setActiveLink: (value: any) => void;
  children?: ReactNode;
}

export const NavLink = (props: INavLink) => {
  const { getMobile, getDesktop } = useResponsive(props);
  const { isMobileView } = useDevice();

  const getNavLink = useCallback(
    () => (isMobileView() ? getMobile() : getDesktop()),
    [isMobileView, getDesktop, getMobile]
  );

  return getNavLink();
};

function useResponsive({
  name,
  activeLink,
  setActiveLink,
  children
}: INavLink) {
  function getMobile(): JSX.Element {
    return (
      <button
        className="flex flex-col w-full text-lg"
        style={{
          height: isActiveLink() ? 'auto' : '20px'
        }}
        onClick={() =>
          setActiveLink((previousValue: IActiveLink) => ({
            ...previousValue,
            [name]: !previousValue[name]
          }))
        }
      >
        <span className="flex px-10 items-center justify-between">
          {name}
          {isActiveLink() ? <KeyboardArrowDownIcon /> : <KeyboardArrowRight />}
        </span>
        <nav
          className="flex flex-col p-12 gap-12 text-white text-sm"
          style={{
            opacity: isActiveLink() ? 1 : 0,
            visibility: isActiveLink() ? 'visible' : 'hidden'
          }}
        >
          {children}
        </nav>
      </button>
    );
  }

  function getDesktop(): JSX.Element {
    return (
      <button
        className="flex flex-col gap-2"
        onMouseEnter={() =>
          setActiveLink((previousValue: IActiveLink) => ({
            ...previousValue,
            [name]: true
          }))
        }
        onMouseLeave={() =>
          setActiveLink((previousValue: IActiveLink) => ({
            ...previousValue,
            [name]: false
          }))
        }
      >
        <span
          style={{
            color: isActiveLink() ? 'var(--orange)' : 'inherit'
          }}
        >
          {name}{' '}
          {isActiveLink() ? <KeyboardArrowDownIcon /> : <KeyboardArrowRight />}
        </span>
        <nav
          className="flex flex-col gap-4 p-6 absolute z-10 mt-8 w-1/5 origin-top-right rounded-md shadow-lg bg-white text-gray-700 text-md"
          style={{
            opacity: isActiveLink() ? 1 : 0,
            visibility: isActiveLink() ? 'visible' : 'hidden',
            transition: 'all 0.5s linear'
          }}
        >
          {children}
        </nav>
      </button>
    );
  }

  function isActiveLink() {
    return activeLink[name] == true;
  }

  return { getMobile, getDesktop };
}

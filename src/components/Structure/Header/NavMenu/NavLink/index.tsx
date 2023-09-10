'use client';
import { useDevice } from '@Contexts/useDevice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { ReactNode, useState } from 'react';
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

  if (isMobileView()) {
    return getMobile();
  }

  return getDesktop();
};

function useResponsive({
  name,
  activeLink,
  setActiveLink,
  children
}: INavLink) {
  function getMobile(): JSX.Element {
    /* eslint-disable */
    const [navStyle, setNavStyle] = useState<string>('opactity-0 invisible');

    return (
      <>
        <button
          className="flex flex-col w-full text-lg min-h-[48px]"
          style={{
            height: isActiveLink() ? 'auto' : '20px'
          }}
          onClick={(e) => {
            e.preventDefault();
            setActiveLink((previousValue: IActiveLink) => {
              const isActive = !previousValue[name];

              setNavStyle(() =>
                isActive ? 'opactity-1 visible' : 'opactity-0 invisible'
              );

              return {
                ...previousValue,
                [name]: isActive
              };
            });
          }}
        >
          <span className="flex px-10 items-center justify-between">
            {name}

            <KeyboardArrowDownIcon
              fontSize="large"
              style={{ display: isActiveLink() ? 'block' : 'none' }}
            />

            <KeyboardArrowRight
              fontSize="large"
              style={{ display: isActiveLink() ? 'none' : 'block' }}
            />
          </span>
        </button>
        {isActiveLink() && (
          <nav
            className={`flex flex-col px-12 gap-8 text-white text-sm ${navStyle}`}
          >
            {children}
          </nav>
        )}
      </>
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

'use client';
import { useDevice } from '@Contexts/useDevice';
import { useMobileMenu } from '@Contexts/useMobileMenu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { MouseEvent, ReactNode, useState } from 'react';
import { IActiveLink } from '../types';

interface INavLink {
  name: string;
  children?: ReactNode;
}

export const NavLink = (props: INavLink) => {
  const { isMobileView } = useDevice();

  const { getMobile, getDesktop } = useResponsive(props);

  if (isMobileView()) {
    return getMobile();
  }

  return getDesktop();
};

function useResponsive({ name, children }: INavLink) {
  const { setActiveLink, isActiveLink, setCurrentLink } = useMobileMenu();

  function getMobile(): JSX.Element {
    /* eslint-disable */
    const [navStyle, setNavStyle] = useState<string>('opactity-0 invisible');

    const onMobileClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

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
    };

    return (
      <>
        <button
          className="flex flex-col w-full text-lg min-h-[48px]"
          style={{
            height: isActiveLink(name) ? 'auto' : '20px'
          }}
          onClick={onMobileClick}
        >
          <span className="flex px-10 items-center justify-between">
            {name}

            <KeyboardArrowDownIcon
              fontSize="large"
              style={{ display: isActiveLink(name) ? 'block' : 'none' }}
            />

            <KeyboardArrowRight
              fontSize="large"
              style={{ display: isActiveLink(name) ? 'none' : 'block' }}
            />
          </span>
        </button>
        {isActiveLink(name) && (
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
        onMouseEnter={() => setCurrentLink(name, true)}
        onMouseLeave={() => setCurrentLink(name, false)}
      >
        <span
          style={{
            color: isActiveLink(name) ? 'var(--orange)' : 'inherit'
          }}
        >
          {name}{' '}
          {isActiveLink(name) ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowRight />
          )}
        </span>
        <nav
          className="flex flex-col gap-4 p-6 absolute z-10 mt-8 w-1/5 origin-top-right rounded-md shadow-lg bg-white text-gray-700 text-md"
          style={{
            opacity: isActiveLink(name) ? 1 : 0,
            visibility: isActiveLink(name) ? 'visible' : 'hidden',
            transition: 'all 0.5s linear'
          }}
        >
          {children}
        </nav>
      </button>
    );
  }

  return { getMobile, getDesktop };
}

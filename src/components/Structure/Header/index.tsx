'use client';
import { useDevice } from '@Contexts/useDevice';
import { useMobileMenu } from '@Contexts/useMobileMenu';
import { useEffect, useRef } from 'react';
import NavMenu from './NavMenu';
import { Mobile } from './NavMenu/Mobile';

export const Header = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isMobileView } = useDevice();
  // const { setShowMobileMenu, resetActiveLink } = useMobileMenu();

  // const handleOutsideClick = (e: any) => {
  //   e.stopImmediatePropagation();
  //   e.stopPropagation();

  //   if (!ref.current) return;
  //   if (ref.current?.contains(e.target)) return;

  //   setShowMobileMenu(() => false);
  //   resetActiveLink();
  // };

  // useEffect(() => {
  //   window.addEventListener('click', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick);
  //   };
  // });

  return (
    <div
      className="flex flex-col justify-between bg-white"
      id="header"
      ref={ref}
    >
      {isMobileView() && <Mobile />}
      <NavMenu />
    </div>
  );
};

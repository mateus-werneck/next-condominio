'use client';
import { useEffect, useState } from 'react';
import { useDevice } from '@Contexts/useDevice';
/* eslint-disable @typescript-eslint/no-unused-vars */

export const Footer = () => {
  const { isMobileView } = useDevice();
  const [isMobile, setMobile] = useState<boolean>(isMobileView());

  useEffect(() => {
    window.addEventListener('resize', () => {
      setMobile(window.innerWidth <= 1280);
    });
  }, []);

  return (
    <footer className="w-full flex flex-col items-start justify-center gap-8 bg-black text-white p-16" />
  );
};

'use client';
import React, { useContext, useEffect, useState } from 'react';

interface IDeviceContext {
  isMobile: boolean;
  isMobileView: () => boolean;
}

interface IDeviceProvider {
  children: React.ReactNode;
  isMobileDevice: boolean;
}

export const DeviceContext = React.createContext<IDeviceContext>(
  {} as IDeviceContext
);

export function DeviceProvider({ children, isMobileDevice }: IDeviceProvider) {
  const [isMobile, setIsMobile] = useState<boolean>(isMobileDevice);

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', () => {
        setIsMobile(() => window.innerWidth <= 640);
      });
    }
  }, []);

  function isMobileView(): boolean {
    return isMobile;
  }

  return (
    <DeviceContext.Provider value={{ isMobile, isMobileView }}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevice = () => {
  return useContext(DeviceContext);
};

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: ReactNode }) {
  const containerStyle =
    'flex flex-col absolute top-[20%] md:top-1/4 self-center z-10 h-full mt-4 lg:mt-12 overflow-auto';
  const Modal = () => <div className={containerStyle}>{children}</div>;

  return createPortal(<Modal />, document.getElementsByTagName('main')[0]);
}

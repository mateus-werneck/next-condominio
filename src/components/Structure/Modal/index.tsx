import { ReactNode, RefObject, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  children: ReactNode;
  setShowModal: (value: (previousValue: boolean) => boolean) => void;
  parentRef?: RefObject<any>;
}

export default function Modal({ children, setShowModal, parentRef }: IModal) {
  const ref = useResponsive(setShowModal, parentRef);

  const main = document.getElementById('main-root');

  if (!main) return <></>;

  const containerStyle =
    'flex flex-col absolute top-[20%] md:top-1/4 self-center z-10 h-full mt-4 lg:mt-12 overflow-auto';

  return createPortal(
    <div className={containerStyle} id="root-portal" ref={ref}>
      {children}
    </div>,
    main
  );
}

function useResponsive(
  setShowModal: (value: (previousValue: boolean) => boolean) => void,
  parentRef?: RefObject<any>
) {
  const ref = useRef<HTMLDivElement>(null);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowModal(() => false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscape, false);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleOutsideClick = (e: any) => {
    e.stopPropagation();
    if (!ref.current || ref.current.contains(e.target)) return;
    if (parentRef?.current && parentRef.current.contains(e.target)) return;

    setShowModal(() => false);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick, false);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  return ref;
}

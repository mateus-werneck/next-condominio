import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  children: ReactNode;
  callback?: () => void;
  parentRef?: RefObject<any>;
}

export default function Modal({ children, callback, parentRef }: IModal) {
  const [showModal, setShowModal] = useState<boolean>(true);
  const ref = useDynamic(setShowModal, callback, parentRef);

  if (!showModal) return <></>;

  const main = document.getElementById('main-root');

  if (!main) return <></>;

  const containerStyle =
    'flex flex-col absolute self-center justify-between z-10 h-3/4 w-3/4 mt-4 lg:mt-12 overflow-auto';

  return createPortal(
    <div className={containerStyle} id="root-portal" ref={ref}>
      {children}
    </div>,
    main
  );
}

function useDynamic(
  setShowModal: (value: boolean) => void,
  callback?: () => void,
  parentRef?: RefObject<any>
) {
  const ref = useRef<HTMLDivElement>(null);

  const handleEscape = (e: KeyboardEvent) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (e.key === 'Escape') {
      setShowModal(false);
      callback && callback();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleOutsideClick = (e: any) => {
    e.stopPropagation();
    if (!ref.current || ref.current.contains(e.target)) return;
    if (parentRef?.current && parentRef.current.contains(e.target)) return;

    setShowModal(false);
    callback && callback();
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick, false);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  return ref;
}

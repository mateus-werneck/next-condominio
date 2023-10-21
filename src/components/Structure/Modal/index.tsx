'use client';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  children: ReactNode;
  onClose?: () => void;
  isVisible?: boolean;
}

export default function Modal({ children, onClose, isVisible }: IModal) {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(
    () => setShowModal((previousValue: boolean) => isVisible ?? previousValue),
    [isVisible]
  );

  useEffect(() => {
    const portal = document.getElementById('portal');
    portal && setPortal(portal);
  }, []);

  const handleEscape = (e: KeyboardEvent) => {
    e.stopImmediatePropagation();
    e.stopPropagation();

    if (!showModal) return;

    if (e.key === 'Escape') {
      setShowModal(false);
      onClose && onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  if (!portal) return <></>;

  const containerStyle =
    'flex flex-col fixed top-0 z-50 w-screen h-screen overflow-auto backdrop-blur-lg bg-black/4 p-8' +
    ` ${showModal ? 'visible' : 'invisible'}`;

  return createPortal(
    <div
      className={containerStyle}
      style={{
        transition: 'scale(1)',
        animation: 'fadeIn .5s cubic'
      }}
    >
      {' '}
      <button
        className="text-white bg-slate-700 rounded-xl w-8 h-8 self-center mt-4 hover:shadow-button hover:translate -translate-x-1 hover:bg-gradient-to-r from-slate-700 to-slate-500"
        onClick={() => {
          setShowModal(false);
          onClose && onClose();
        }}
      >
        <CloseIcon fontSize="small" />
      </button>
      {showModal ? children : <></>}
    </div>,
    portal
  );
}

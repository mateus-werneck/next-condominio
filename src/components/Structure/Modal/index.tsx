import CloseIcon from '@mui/icons-material/Close';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  children: ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: IModal) {
  const [showModal, setShowModal] = useState<boolean>(true);

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

  const portal = document.getElementById('portal');

  if (!portal) return <></>;

  const containerStyle =
    'flex flex-col fixed left-0 top-0 z-50 w-screen h-screen overflow-auto backdrop-blur-lg bg-black/4 p-8';

  return showModal ? (
    createPortal(
      <div className={containerStyle}>
        {' '}
        <button
          className="text-white hover:brightness-75 bg-slate-500 rounded-xl w-8 h-8 self-center mt-4"
          onClick={() => {
            setShowModal(false);
            onClose && onClose();
          }}
        >
          <CloseIcon fontSize="small" />
        </button>
        {children}
      </div>,
      portal
    )
  ) : (
    <></>
  );
}

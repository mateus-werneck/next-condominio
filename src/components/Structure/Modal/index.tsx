import CloseIcon from '@mui/icons-material/Close';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  children: ReactNode;
  forceHide?: () => void;
}

export default function Modal({ children, forceHide }: IModal) {
  const [showModal, setShowModal] = useState<boolean>(true);
  const ref = useDynamic(setShowModal, forceHide);

  if (!showModal) return <></>;

  const main = document.getElementById('portal');

  if (!main) return <></>;

  const containerStyle =
    'flex flex-col fixed left-0 top-0 z-50 w-screen h-screen overflow-auto backdrop-blur-lg bg-black/4 p-8';

  return createPortal(
    <div className={containerStyle} id="root-portal" ref={ref}>
      {' '}
      <button
        className="text-white hover:brightness-75 bg-slate-500 rounded-xl w-8 h-8 self-center mt-4"
        onClick={() => {
          setShowModal(false);
          forceHide && forceHide();
        }}
      >
        <CloseIcon fontSize="small" />
      </button>
      {children}
    </div>,
    main
  );
}

function useDynamic(
  setShowModal: (value: boolean) => void,
  forceHide?: () => void
) {
  const ref = useRef<HTMLDivElement>(null);

  const handleEscape = (e: KeyboardEvent) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (e.key === 'Escape') {
      setShowModal(false);
      forceHide && forceHide();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  return ref;
}

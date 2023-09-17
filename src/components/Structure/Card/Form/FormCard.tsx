import Button from '@Components/Structure/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinkIcon from '@mui/icons-material/Link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IFormCard {
  id: string;
  hashTag?: string;
  title: string;
  children: ReactNode;
}
export default function FormCard({ id, hashTag, title, children }: IFormCard) {
  const [showCheckIcon, setShowCheckIcon] = useState<boolean>(false);
  const path = usePathname();

  const route = `${path}/edit?id=${id}`;

  const notifyClipboard = () => {
    toast('Copiado para a área de trabalho.', {
      position: 'bottom-center',
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      autoClose: 2000
    });
    setShowCheckIcon(true);
    setTimeout(() => setShowCheckIcon(false), 1200);
  };

  return (
    <>
      <div className="pt-4" />
      <div className="flex flex-col self-center justify-center bg-slate-100 rounded-lg gap-4">
        <Button
          className="self-start font-bold pt-6 pl-4 hover:text-blue max-w-fit"
          route={route}
        >
          <div className="flex gap-2 text-small sm:text-base">
            <span>
              {title} #{hashTag ?? id}
            </span>
            <div>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  const url =
                    String(process.env.NEXT_PUBLIC_SYSTEM_URL) + route;
                  try {
                    navigator.clipboard.writeText(url);
                    notifyClipboard();
                  } catch (error) {
                    toast('Falha ao copiar para área de trabalho.', {
                      position: 'bottom-center',
                      closeButton: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      hideProgressBar: true,
                      autoClose: 2000,
                      type: 'error'
                    });
                  }
                }}
              >
                {!showCheckIcon ? (
                  <LinkIcon className="hover:text-slate-400 w-6 h-6 invisible sm:visible" />
                ) : (
                  <CheckCircleIcon
                    className="mr-8 w-6 h-6 animate-pulse"
                    color="success"
                  />
                )}
              </span>
            </div>
          </div>
        </Button>
        <div className="p-4 self-center bg-slate-200">{children}</div>
        <ToastContainer />
      </div>
    </>
  );
}

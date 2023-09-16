'use client';

import Button from '@Components/Structure/Button';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import { usePathname } from 'next/navigation';

export default function ErrorPage() {
  const path = usePathname();
  return (
    <div className="absolute top-1/3 flex flex-col gap-4 self-center items-center">
      <div className="flex flex-col items-center m-4 p-4 z-50 bg-white rounded-xl md:w-full">
        <ErrorIcon
          className="self-center"
          style={{ width: '100px', height: '100px' }}
        />
        <h2>Oops!</h2>
        <p>Alguma coisa deu errado.</p>
      </div>
      <Button route={path ?? '/'} variant="contained">
        <RefreshIcon fontSize="small" />
      </Button>
      <Button route="/" variant="contained">
        Voltar ao Início
      </Button>
    </div>
  );
}

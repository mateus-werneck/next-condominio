'use client';

import DefaultButton from '@Components/Structure/Button';
import ErrorIcon from '@mui/icons-material/Error';

export default function GlobalError() {
  return (
    <html>
      <body>
        <div className="absolute top-1/3 flex flex-col self-center items-center">
          <div className="flex flex-col items-center m-4 p-4 z-50 bg-white rounded-xl md:w-full">
            <ErrorIcon
              className="self-center"
              style={{ width: '100px', height: '100px' }}
            />
            <h2>Oops!</h2>
            <p>Alguma coisa deu errado.</p>
          </div>
          <DefaultButton route="/" variant="contained" color="secondary">
            Voltar ao Início
          </DefaultButton>
        </div>
      </body>
    </html>
  );
}

'use client';
import DefaultButton from '@Components/Structure/Button';
import { useDevice } from '@Contexts/useDevice';
import ErrorIcon from '@mui/icons-material/Error';

export default function Custom404() {
  const { isMobileView } = useDevice();

  if (isMobileView()) {
    return (
      <div className="absolute top-1/3 gap-8 flex flex-col self-center items-center h-full">
        <div className="flex flex-col items-center gap-4 m-4 p-4 z-50 bg-white rounded-xl h-fit w-fit">
          <ErrorIcon
            fontSize="large"
            className="self-center"
            style={{ width: 288, height: 288 }}
          />
          <h2 className="text-6xl">Página não encontrada</h2>
        </div>
        <DefaultButton
          styles={{
            fontSize: '48px',
            width: '80%',
            height: 150,
            borderRadius: '1rem'
          }}
          route="/"
          variant="contained"
          color="secondary"
        >
          Voltar ao Início
        </DefaultButton>
      </div>
    );
  }

  return (
    <div className="absolute top-1/3 flex flex-col self-center items-center">
      <div className="flex flex-col items-center m-4 p-4 z-50 bg-white rounded-xl w-full">
        <ErrorIcon fontSize="large" className="self-center" />
        <h2 className="text-bold">Página não encontrada</h2>
      </div>
      <DefaultButton route="/" variant="contained" color="secondary">
        Voltar ao Início
      </DefaultButton>
    </div>
  );
}

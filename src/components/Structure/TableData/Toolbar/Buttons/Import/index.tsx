import ImportForm, { TImportFileInfo } from '@Components/Forms/Import';
import Button from '@Components/Structure/Button';
import FormCard from '@Components/Structure/Card/Form/FormCard';
import Modal from '@Components/Structure/Modal';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';

type IImport = {
  route: string;
  fileInfo: TImportFileInfo;
  onSuccess?: () => void;
};

export default function Import({
  route,
  fileInfo,
  onSuccess
}: IImport): JSX.Element {
  const [showImportForm, setShowImportForm] = useState<boolean>(false);

  return (
    <>
      <Modal
        onClose={() => setShowImportForm(false)}
        isVisible={showImportForm}
      >
        <FormCard id="uploadFile" title="Importar Dados">
          <ImportForm
            route={route}
            fileInfo={fileInfo}
            onSubmitCallback={onSuccess}
          />
        </FormCard>
      </Modal>
      <Button
        className="bg-transperent text-black hover:bg-light-blue/4"
        onClickFunction={() =>
          setShowImportForm((previousValue: boolean) => !previousValue)
        }
      >
        <div className="flex gap-1">
          <UploadIcon className="font-bold w-6 h-6 pb-0 sm:pb-1" />
          <span className="font-medium sm:font-normal">IMPORTAR</span>
        </div>
      </Button>
    </>
  );
}

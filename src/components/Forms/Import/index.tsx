import Form from '@Components/Structure/FormData';
import { IFormInput } from '@Components/Structure/FormData/types';
import { alertEditFailed, alertEditSuccess } from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import { ZodValidator } from '@Lib/Validators/Zod';
import { ZodType, z } from 'zod';

type IImportForm = {
  route: string;
};

type ISubmitImportData = {
  importFile: File;
};

export default function ImportForm({ route }: IImportForm) {
  const { inputs, validationSchema } = useFormData();

  return (
    <>
      <Form
        inputs={inputs}
        onSubmit={async (data: ISubmitImportData) => {
          const fileData = new FormData();
          fileData.append('file', data.importFile);

          const response = await clientConn.post(route, fileData);
          const imported = response.data?.imported ?? 0;

          if (imported) return alertEditSuccess();

          alertEditFailed();
        }}
        submitButtonText="Enviar"
        validationSchema={validationSchema}
        alignment="center"
        styles={{ display: 'flex' }}
      />
    </>
  );
}

function useFormData() {
  const validExtensions = ['.json', '.xlsx', '.xls', '.odt', '.csv'];

  const inputs: IFormInput[] = [
    {
      name: 'importFile',
      type: 'file',
      accept: validExtensions.join(',')
    }
  ];

  const validationSchema: ZodType = z.object({
    importFile: ZodValidator.file(validExtensions, 50)
  });

  return {
    inputs,
    validationSchema
  };
}

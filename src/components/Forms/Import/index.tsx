import Form from '@Components/Structure/FormData';
import { IFormInput } from '@Components/Structure/FormData/types';
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
        onSubmit={(data: ISubmitImportData) => {
          const fileData = new FormData();

          fileData.append('file', JSON.stringify(data.importFile));

          clientConn.post(route, fileData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
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

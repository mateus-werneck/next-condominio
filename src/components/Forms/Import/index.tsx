import Form from '@Components/Structure/FormData';
import { IFormInput } from '@Components/Structure/FormData/types';
import { alertEditFailed, alertEditSuccess } from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import { ZodValidator } from '@Lib/Validators/Zod';
import { ZodType, z } from 'zod';

type TImportForm = {
  route: string;
  onSubmitCallback?: () => void;
};

type TSubmitImportData = {
  importFile: File;
};

export default function ImportForm({ route, onSubmitCallback }: TImportForm) {
  const { inputs, validationSchema } = useFormData();

  return (
    <>
      <Form
        inputs={inputs}
        onSubmit={async (data: TSubmitImportData) => {
          const fileData = new FormData();
          fileData.append('file', data.importFile);

          const response = await clientConn.post(route, fileData);
          const imported = response.data?.imported ?? 0;

          if (!imported) return alertEditFailed();

          alertEditSuccess();
          onSubmitCallback && onSubmitCallback();
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
      accept: validExtensions.join(','),
      fileInfo: {
        message: 'A planilha deve seguir o padrão abaixo:',
        fields: [
          'Nome',
          'Valor Total',
          'Data de Vencimento',
          'Tipo',
          'Tipo de Pagamento',
          'Parcelas'
        ]
      }
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

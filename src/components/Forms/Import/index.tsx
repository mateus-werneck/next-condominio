import FormData from '@Components/Structure/FormData';
import { IFormInput } from '@Components/Structure/FormData/types';
import { ZodType, z } from 'zod';

export default function ImportForm() {
  const { inputs, validationSchema } = useFormData();

  return (
    <>
      <FormData
        inputs={inputs}
        onSubmit={(data) => console.log(data)}
        submitButtonText="Enviar"
        validationSchema={validationSchema}
        alignment="center"
        styles={{ display: 'flex' }}
      />
    </>
  );
}

function useFormData() {
  const inputs: IFormInput[] = [
    {
      name: 'importFile',
      type: 'file',
      accept: '.json,.xlsx,.xls,.odt'
    }
  ];

  const validationSchema: ZodType = z.object({
    importFile: z.object(
      {
        name: z.string(),
        size: z.number(),
        type: z.string(),
        lastModified: z.number()
      },
      {
        required_error: 'Nenhum arquivo selecionado.',
        invalid_type_error: 'Arquivo enviado inválido.'
      }
    )
  });

  return {
    inputs,
    validationSchema
  };
}

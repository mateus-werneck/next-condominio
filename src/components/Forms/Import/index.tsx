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
        submitButtonText="Importar"
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
      type: 'file'
    }
  ];

  const validationSchema: ZodType = z.object({
    importFile: z.object({}).optional()
  });

  return {
    inputs,
    validationSchema
  };
}

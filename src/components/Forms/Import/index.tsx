import FormData from '@Components/Structure/FormData';
import { IFormInput } from '@Components/Structure/FormData/types';
import { ZodValidator } from '@Lib/Validators/Zod';
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
    importFile: ZodValidator.file(['json', 'xlsx', 'xls', 'odt'])
  });

  return {
    inputs,
    validationSchema
  };
}

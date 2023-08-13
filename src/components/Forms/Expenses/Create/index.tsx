/* eslint-disable camelcase */
'use client';
import { z } from 'zod';
import { StandardForm, StandardInput } from '@Components/Structure/Form';

export default function CreateExpenseForm() {
  const { inputs, validationSchema } = useFormData();

  const onFormSubmit = (data: any) => {
    return data;
  };

  return (
    <>
      <StandardForm
        inputs={inputs}
        validationSchema={validationSchema}
        onSubmit={onFormSubmit}
        submitButtonText="Salvar"
      />
    </>
  );
}

function useFormData() {
  const inputs: StandardInput[] = [
    {
      name: 'name',
      placeHolder: 'Nome'
    },
    {
      name: 'value',
      placeHolder: 'Valor'
    },
    {
      name: 'dueDate',
      placeHolder: 'Data de Vencimento',
      type: 'date' as const
    }
  ];

  const validationSchema = z.object({
    name: z.string().min(1, 'Campo obrigatório'),
    value: z.number().min(1, 'Campo obrigatório'),
    dueDate: z.date({ required_error: 'Campo obrigatório' })
  });

  return { inputs, validationSchema };
}
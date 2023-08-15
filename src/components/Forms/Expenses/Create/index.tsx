/* eslint-disable camelcase */
'use client';
import { StandardForm } from '@Components/Structure/Form';
import { IStandardInput } from '@Components/Structure/Form/Input/types';
import { z } from 'zod';

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
  const inputs: IStandardInput[] = [
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
    },
    {
      name: 'expenseType',
      placeHolder: 'Tipo',
      type: 'select',
      options: [
        {
          id: 'Seguro',
          label: 'insurance'
        }
      ]
    }
  ];

  const validationSchema = z.object({
    name: z.string().min(1, 'Campo obrigatório'),
    value: z.number().min(1, 'Campo obrigatório'),
    dueDate: z.date({ required_error: 'Campo obrigatório' })
  });

  return { inputs, validationSchema };
}

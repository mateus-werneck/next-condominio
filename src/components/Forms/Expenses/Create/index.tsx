/* eslint-disable camelcase */
'use client';
import { StandardForm } from '@Components/Structure/Form';
import { IStandardInput } from '@Components/Structure/Form/Input/types';
import { DateUtil } from '@Lib/Treat/Date';
import { ExpenseType } from '@prisma/client';
import { z } from 'zod';

interface IExpenseForm {
  expenseTypes: ExpenseType[];
}

export default function ExpenseForm({ expenseTypes }: IExpenseForm) {
  const { inputs, validationSchema } = useFormData(expenseTypes);

  const onFormSubmit = (data: any) => {
    console.log(data);
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

function useFormData(expenseTypes: ExpenseType[]) {
  const inputs: IStandardInput[] = [
    {
      name: 'name',
      label: 'Nome'
    },
    {
      name: 'value',
      label: 'Valor'
    },
    {
      name: 'dueDate',
      label: 'Data de Vencimento',
      type: 'date' as const
    },
    {
      name: 'expenseType',
      label: 'Tipo',
      type: 'select',
      options: expenseTypes
    }
  ];

  const validationSchema = z.object({
    name: z
      .string({ required_error: 'Campo Obrigatório.' })
      .min(5, 'O campo deve conter no mínimo 5 caracteres.'),
    value: z
      .string({ required_error: 'Valor informado inválido' })
      .min(2, 'O valor informado deve ser maior que 1.'),
    dueDate: z
      .date({
        required_error: 'Campo Obrigatório',
        invalid_type_error: 'Data informada inválida.'
      })
      .refine((value: any) => DateUtil.isoDateFromPtBr(value as string)),
    expenseType: z.object(
      {
        id: z.string({ required_error: 'Valor selecionado inválido.' }),
        name: z.string({ required_error: 'Valor selecionado inválido.' }),
        label: z.string({ required_error: 'Valor selecionado inválido.' })
      },
      {
        invalid_type_error: 'Valor selecionado inválido.',
        required_error: 'Campo obrigatório.'
      }
    )
  });
  return { inputs, validationSchema };
}

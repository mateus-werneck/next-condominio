'use client';
import FormData from '@Components/Structure/FormData';
import { IFormInput } from '@Components/Structure/FormData/types';
import { ZodValidator } from '@Lib/Validators/Zod';
import { ExpenseType } from '@prisma/client';
import { z } from 'zod';

interface ISearchParams {
  startAt?: string;
  endAt?: string;
  name?: string;
  expenseTypes?: string;
}

interface IFilterExpensesForm {
  searchParams?: ISearchParams;
  expenseTypes: ExpenseType[];
  onFormSubmit: (data: any) => void;
}

export default function FilterExpensesForm({
  searchParams,
  expenseTypes,
  onFormSubmit
}: IFilterExpensesForm) {
  const { inputs, validationSchema } = useFormData({
    searchParams,
    expenseTypes
  });

  return (
    <>
      <FormData
        inputs={inputs}
        validationSchema={validationSchema}
        onSubmit={onFormSubmit}
        submitButtonText="Filtrar"
      />
    </>
  );
}

type IFormData = Omit<IFilterExpensesForm, 'onFormSubmit'>;

function useFormData({ searchParams, expenseTypes }: IFormData) {
  const inputs: IFormInput[] = [
    {
      name: 'startAt',
      label: 'Data Inicial',
      initialValue: searchParams?.startAt,
      required: true,
      type: 'date' as const
    },
    {
      name: 'endAt',
      label: 'Data Final',
      initialValue: searchParams?.endAt,
      required: true,
      type: 'date' as const
    },
    {
      name: 'name',
      label: 'Despesa',
      initialValue: searchParams?.name,
      placeHolder: 'Nome da Despesa',
      type: 'text'
    },
    {
      name: 'expenseTypes',
      label: 'Tipo',
      type: 'select',
      multiSelect: true,
      options: expenseTypes
    }
  ];
  /* eslint-disable camelcase */
  const validationSchema = z
    .object({
      name: z.string().optional(),
      startAt: ZodValidator.date(),
      endAt: ZodValidator.date(),
      expenseTypes: ZodValidator.multiSelect().optional().nullable()
    })
    .refine(
      (schema) => {
        const initialDate = new Date(schema.startAt);
        const finalDate = new Date(schema.endAt);
        return initialDate.getTime() <= finalDate.getTime();
      },
      {
        message: 'Período informado inválido.',
        path: ['startAt']
      }
    );

  return { inputs, validationSchema };
}

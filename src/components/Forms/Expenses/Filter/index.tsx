'use client';

import FormData from '@Components/Structure/FormData';
import { IFormInput } from '@Components/Structure/FormData/types';
import {
  IExpenseQueryParams,
  IExpensesFilters
} from '@Components/Views/Expenses/types';
import { ZodValidator } from '@Lib/Validators/Zod';
import { ExpenseType } from '@prisma/client';
import { z } from 'zod';

interface IFilterExpensesForm {
  filters?: IExpenseQueryParams;
  expenseTypes: ExpenseType[];
  onFormSubmit: (filters: IExpensesFilters) => Promise<void>;
}

export default function FilterExpensesForm({
  filters,
  expenseTypes,
  ...props
}: IFilterExpensesForm) {
  const { inputs, validationSchema } = useFormData({
    filters,
    expenseTypes
  });

  return (
    <>
      <FormData
        inputs={inputs}
        validationSchema={validationSchema}
        onSubmit={props.onFormSubmit}
        submitButtonText="Filtrar"
      />
    </>
  );
}

type IFormData = Omit<IFilterExpensesForm, 'onFormSubmit'>;

function useFormData({ filters, expenseTypes }: IFormData) {
  const inputs: IFormInput[] = [
    {
      name: 'startAt',
      label: 'Data Inicial',
      initialValue: filters?.startAt,
      required: true,
      type: 'date' as const
    },
    {
      name: 'endAt',
      label: 'Data Final',
      initialValue: filters?.endAt,
      required: true,
      type: 'date' as const
    },
    {
      name: 'name',
      label: 'Despesa',
      initialValue: filters?.name,
      placeHolder: 'Nome da Despesa',
      type: 'text'
    },
    {
      name: 'expenseTypes',
      label: 'Tipo',
      type: 'select',
      multiSelect: true,
      options: expenseTypes,
      initialValue: filters?.expenseTypes
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

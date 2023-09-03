'use client';
import StandardForm from '@Components/Structure/Form';
import { IStandardInput } from '@Components/Structure/Form/Input/utils/types';
import { DateUtil, MonthRange } from '@Lib/Treat/Date';
import { ZodValidator } from '@Lib/Validators/Zod';
import { ExpenseType } from '@prisma/client';
import { z } from 'zod';

interface IListExpensesForm {
  monthRange: MonthRange;
  expenseTypes: ExpenseType[];
  onFormSubmit: (data: any) => void;
}

export default function ListExpensesForm({
  monthRange,
  expenseTypes,
  onFormSubmit
}: IListExpensesForm) {
  const { inputs, validationSchema } = useFormData({
    monthRange,
    expenseTypes
  });

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

type IFormData = Omit<IListExpensesForm, 'onFormSubmit'>;

function useFormData({
  monthRange: { startAt, endAt },
  expenseTypes
}: IFormData) {
  const inputs: IStandardInput[] = [
    {
      name: 'startAt',
      label: 'Data Inicial',
      initialValue: DateUtil.fromDateToIsoString(startAt),
      required: true,
      type: 'date' as const
    },
    {
      name: 'endAt',
      label: 'Data Final',
      initialValue: DateUtil.fromDateToIsoString(endAt),
      required: true,
      type: 'date' as const
    },
    {
      name: 'name',
      label: 'Despesa',
      placeHolder: 'Nome da Despesa',
      type: 'text'
    },
    {
      name: 'expenseTypes',
      label: 'Tipo',
      type: 'select',
      multiSelect: true,
      options: expenseTypes,
      initialValue: []
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

'use client';
import { StandardForm } from '@Components/Structure/Form';
import { IStandardInput } from '@Components/Structure/Form/Input/types';
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
        align="self-start"
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
      initialValue: DateUtil.toIsoStringDate(startAt),
      required: true,
      type: 'date' as const
    },
    {
      name: 'endAt',
      label: 'Data Final',
      initialValue: DateUtil.toIsoStringDate(endAt),
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
      options: expenseTypes
    }
  ];
  /* eslint-disable camelcase */
  const validationSchema = z
    .object({
      name: z.string().optional(),
      startAt: ZodValidator.date(),
      endAt: ZodValidator.date(),
      expenseTypes: z
        .array(
          z.object(
            {
              id: z.string(),
              name: z.string(),
              label: z.string()
            },
            { invalid_type_error: 'Valor selecionado inválido' }
          )
        )
        .optional()
        .nullable()
    })
    .refine((schema) => {
      const initialDate = new Date(schema.startAt);
      const finalDate = new Date(schema.endAt);
      return initialDate.getTime() <= finalDate.getTime();
    }, 'Período informado inválido.');

  return { inputs, validationSchema };
}

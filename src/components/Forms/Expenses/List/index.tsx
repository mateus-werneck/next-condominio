'use client';
import { StandardForm } from '@Components/Structure/Form';
import { IStandardInput } from '@Components/Structure/Form/Input/types';
import { DateUtil, MonthRange } from '@Utils/Date';
import { z } from 'zod';

interface IListExpensesForm {
  monthRange: MonthRange;
  onFormSubmit: (data: any) => void;
}

export default function ListExpensesForm({
  monthRange,
  onFormSubmit
}: IListExpensesForm) {
  const { inputs, validationSchema } = useFormData(monthRange);

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

function useFormData({ startAt, endAt }: MonthRange) {
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
      options: [
        {
          id: 1,
          name: 'insurance',
          label: 'Seguro'
        },
        {
          id: 2,
          name: 'power',
          label: 'Conta de Luz'
        }
      ]
    }
  ];
  /* eslint-disable camelcase */
  const validationSchema = z.object({
    name: z.string().optional(),
    startAt: z
      .string({ required_error: 'Campo Obrigatório.' })
      .min(1, 'Campo Obrigatório'),
    endAt: z
      .string({ required_error: 'Campo Obrigatório.' })
      .min(1, 'Campo Obrigatório'),
    expenseTypes: z
      .array(
        z.object(
          {
            id: z.number().or(z.string()),
            name: z.string(),
            label: z.string()
          },
          { invalid_type_error: 'Valor selecionado inválido' }
        )
      )
      .optional()
      .nullable()
  });

  return { inputs, validationSchema };
}

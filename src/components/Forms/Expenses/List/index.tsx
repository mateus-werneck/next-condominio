'use client';
import { z } from 'zod';
import { StandardForm, StandardInput } from '@Components/Structure/Form';
import { DateUtil, MonthRange } from '@Utils/Date';

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
  const inputs: StandardInput[] = [
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
      .min(1, 'Campo Obrigatório')
  });

  return { inputs, validationSchema };
}

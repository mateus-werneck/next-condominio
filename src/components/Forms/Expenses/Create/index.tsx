'use client';
import { StandardForm } from '@Components/Structure/Form';
import { IStandardInput } from '@Components/Structure/Form/Input/types';
import { ZodValidator } from '@Lib/Validators/Zod';
import { ExpenseType } from '@prisma/client';
import { z } from 'zod';

interface IExpenseForm {
  expenseTypes: ExpenseType[];
}

interface IExpenseSubmit {
  name: string;
  value: string;
  dueDate: string;
  expenseType: ExpenseType;
}

export default function ExpenseForm({ expenseTypes }: IExpenseForm) {
  const { inputs, validationSchema } = useFormData(expenseTypes);

  const onFormSubmit = (data: any) => {
    console.log(data);
    // const expense: CreateExpense = {
    //   name: data.name,
    //   value: MoneyUtil.toFloat(data.value),
    //   dueDate: new Date(data.dueDate),
    //   type: data.expenseType.id
    // };
    // fetch(`${process.env.NEXT_PUBLIC_SYSTEM_URL}/api/expenses`, {
    //   method: 'POST',
    //   body: JSON.stringify(expense)
    // })
    //   .then((value) => value.json().then((response) => console.log(response)))
    //   .catch((reason) => console.log(reason));
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
      label: 'Valor',
      type: 'number'
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

  /* eslint-disable camelcase */
  const validationSchema = z.object({
    name: z
      .string({ required_error: 'Campo Obrigatório.' })
      .min(5, 'O campo deve conter no mínimo 5 caracteres.'),
    value: ZodValidator.currency(),
    dueDate: ZodValidator.date(),
    expenseType: z
      .object(
        {
          id: z.string({ required_error: 'Campo Obrigatório.' }),
          name: z.string({ required_error: 'Campo Obrigatório.' }),
          label: z.string({ required_error: 'Campo Obrigatório.' })
        },
        {
          invalid_type_error: 'Valor selecionado inválido.',
          required_error: 'Campo obrigatório.'
        }
      )
      .transform(({ id }) => id)
  });
  return { inputs, validationSchema };
}

'use client';
import { Alert } from '@Components/Structure/Alert';
import { StandardForm } from '@Components/Structure/Form';
import { IStandardInput } from '@Components/Structure/Form/Input/types';
import { DateUtil } from '@Lib/Treat/Date';
import { appendQueryParams } from '@Lib/Treat/Request';
import { ZodValidator } from '@Lib/Validators/Zod';
import { CreateExpense, ExpenseDto } from '@Types/Expense/types';
import { Expense, ExpenseType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

interface IExpenseForm {
  expense: ExpenseDto;
  expenseTypes: ExpenseType[];
}

interface IExpenseSubmit {
  name: string;
  value: number;
  dueDate: string;
  expenseType: string;
}

export default function ExpenseForm(props: IExpenseForm) {
  const { inputs, validationSchema } = useFormData(props);
  const router = useRouter();

  const onFormSubmit = async (submitData: IExpenseSubmit) => {
    const data: CreateExpense = {
      name: submitData.name,
      value: submitData.value,
      dueDate: new Date(submitData.dueDate),
      type: submitData.expenseType
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SYSTEM_URL}/api/expenses`,
        {
          method: 'POST',
          body: JSON.stringify(data)
        }
      );

      const createdExpense: Expense = await response.json();

      Alert({
        message: 'Alterações salvas com sucesso.',
        variant: 'success',
        timer: 1500,
        callbackFunction: () => {
          const url = appendQueryParams('/expenses/edit', {
            id: createdExpense.id
          });
          router.push(url);
        }
      });
    } catch (error) {
      Alert({
        title: 'Falha no cadastro',
        message: 'Verifique os dados informados.',
        variant: 'error',
        allowOutsideClick: true,
        allowEscapeKey: true
      });
      Promise.resolve();
    }
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

function useFormData({ expense, expenseTypes }: IExpenseForm) {
  const inputs: IStandardInput[] = [
    {
      name: 'name',
      label: 'Nome',
      initialValue: expense.name
    },
    {
      name: 'value',
      label: 'Valor',
      type: 'number',
      initialValue: expense.value
    },
    {
      name: 'dueDate',
      label: 'Data de Vencimento',
      type: 'date' as const,
      initialValue: expense.dueDate
        ? DateUtil.fromPtBrStringToIsoString(expense.dueDate)
        : expense.dueDate
    },
    {
      name: 'expenseType',
      label: 'Tipo',
      type: 'select',
      options: expenseTypes,
      initialValue: expense.expenseType
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

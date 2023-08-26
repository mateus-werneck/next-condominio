'use client';
import StandardForm from '@Components/Structure/Form';
import { IStandardInput } from '@Components/Structure/Form/Input/utils/types';
import { ISubmitForm } from '@Components/Structure/Form/utils/types';
import { alertEditFailed, alertEditSuccess } from '@Lib/Alerts/customActions';
import { publicAPI } from '@Lib/Client/api';
import { Masks } from '@Lib/Input/masks';
import { DateUtil } from '@Lib/Treat/Date';
import { ZodValidator } from '@Lib/Validators/Zod';
import { CreateExpense, ExpenseDto } from '@Types/Expense/types';
import { ExpenseType } from '@prisma/client';
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

  const onFormSubmit: ISubmitForm = async (
    submitData: IExpenseSubmit,
    { reset }
  ) => {
    const data: CreateExpense = {
      name: submitData.name,
      value: submitData.value,
      dueDate: new Date(submitData.dueDate),
      type: submitData.expenseType
    };

    try {
      props.expense.id
        ? await publicAPI.put('expenses', { id: props.expense.id, ...data })
        : await publicAPI.post('expenses', data);
      alertEditSuccess(props.expense.id ? undefined : reset);
    } catch (error) {
      alertEditFailed();
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
      initialValue: expense.value,
      mask: Masks.BRL
    },
    {
      name: 'dueDate',
      label: 'Data de Vencimento',
      mask: Masks.DATE,
      placeHolder: 'DD/MM/YYYY',
      initialValue: expense.dueDate
        ? DateUtil.toLocalePtBr(expense.dueDate)
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
    value: ZodValidator.brl(),
    dueDate: ZodValidator.ptBrDate(),
    expenseType: ZodValidator.select()
  });
  return { inputs, validationSchema };
}

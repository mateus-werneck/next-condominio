'use client';
import FormData from '@Components/Structure/FormData';
import { IFormInput, ISubmitForm } from '@Components/Structure/FormData/types';
import { alertEditFailed, alertEditSuccess } from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import Masks from '@Lib/Masks/Masks';
import { DateUtil } from '@Lib/Treat/Date';
import { ZodValidator } from '@Lib/Validators/Zod';
import { CreateExpense, ExpenseDto } from '@Types/Expense/types';
import { Expense, ExpenseType } from '@prisma/client';
import { useQuery } from 'react-query';
import { z } from 'zod';

interface IExpenseForm {
  expense: ExpenseDto;
  expenseTypes?: ExpenseType[];
  formSubmitCallback?: (value: Expense) => void;
  alignment?: 'start' | 'center' | 'end';
}

interface IExpenseSubmit {
  name: string;
  value: number;
  dueDate: string;
  expenseType: string;
}

export default function ExpenseForm(props: IExpenseForm) {
  const { data } = useQuery({
    queryKey: ['expenseTypes'],
    cacheTime: 60 * 60 * 24,
    queryFn: () =>
      props.expenseTypes ??
      clientConn.get('/expenses/types').then((response) => response.data)
  });

  const { inputs, validationSchema, onFormSubmit } = useFormData({
    expense: props.expense,
    expenseTypes: data ?? []
  });

  return (
    <>
      <FormData
        inputs={inputs}
        validationSchema={validationSchema}
        onSubmit={onFormSubmit}
        submitButtonText="Salvar"
        alignment={props.alignment}
      />
    </>
  );
}

function useFormData({
  expense,
  expenseTypes,
  formSubmitCallback
}: IExpenseForm) {
  const inputs: IFormInput[] = [
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
    name: ZodValidator.string(),
    value: ZodValidator.brl(),
    dueDate: ZodValidator.ptBrDate(),
    expenseType: ZodValidator.select()
  });

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
      const response = expense.id
        ? await clientConn.put('expenses', { id: expense.id, ...data })
        : await clientConn.post('expenses', data);
      alertEditSuccess(expense.id ? undefined : reset);
      formSubmitCallback && formSubmitCallback(response.data);
    } catch (error) {
      alertEditFailed();
      Promise.resolve();
    }
  };

  return { inputs, validationSchema, onFormSubmit };
}

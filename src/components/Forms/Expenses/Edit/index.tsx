'use client';
import FormData from '@Components/Structure/FormData';
import { IStandardInput } from '@Components/Structure/FormData/Input/utils/types';
import { ISubmitForm } from '@Components/Structure/FormData/utils/types';
import { alertEditFailed, alertEditSuccess } from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import Masks from '@Lib/Masks/Masks';
import { DateUtil } from '@Lib/Treat/Date';
import { ZodValidator } from '@Lib/Validators/Zod';
import { CreateExpense, ExpenseDto } from '@Types/Expense/types';
import { ExpenseType } from '@prisma/client';
import { useEffect, useState } from 'react';
import { z } from 'zod';

interface IExpenseForm {
  expense: ExpenseDto;
  expenseTypes?: ExpenseType[];
}

interface IExpenseSubmit {
  name: string;
  value: number;
  dueDate: string;
  expenseType: string;
}

export default function ExpenseForm(props: IExpenseForm) {
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>(
    props.expenseTypes ?? []
  );
  const { inputs, validationSchema } = useFormData({
    expense: props.expense,
    expenseTypes
  });

  const getExpenseTypes: () => Promise<void> = async (): Promise<void> => {
    const response = await clientConn.get('/expenses/types');
    const expenseTypes = (await response.data) as ExpenseType[];
    setExpenseTypes(expenseTypes);
  };

  useEffect(() => {
    if (!props.expenseTypes) {
      getExpenseTypes();
    }
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
      props.expense.id
        ? await clientConn.put('expenses', { id: props.expense.id, ...data })
        : await clientConn.post('expenses', data);
      alertEditSuccess(props.expense.id ? undefined : reset);
    } catch (error) {
      alertEditFailed();
      Promise.resolve();
    }
  };

  return (
    <>
      <FormData
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
    name: ZodValidator.string(),
    value: ZodValidator.brl(),
    dueDate: ZodValidator.ptBrDate(),
    expenseType: ZodValidator.select()
  });
  return { inputs, validationSchema };
}

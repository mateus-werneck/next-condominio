'use client';
import FormData from '@Components/Structure/FormData';
import { IFormInput, ISubmitForm } from '@Components/Structure/FormData/types';
import { alertEditFailed, alertEditSuccess } from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import { getExpenseEditData } from '@Lib/Data/Expense/submit';
import Masks from '@Lib/Masks/Masks';
import { createOrUpdate } from '@Lib/Requests/expenses';
import { getPaymentTypeId, paymentTypes } from '@Lib/Select/PaymentOptions';
import { DateUtil } from '@Lib/Treat/Date';
import { ZodValidator } from '@Lib/Validators/Zod';
import { ExpenseDto } from '@Types/Expense/types';
import { useQuery } from 'react-query';
import { ZodType, z } from 'zod';
import { IExpenseForm, IExpenseSubmit } from './types';

export default function ExpenseForm(props: IExpenseForm) {
  const formData = useFormData(props);

  const formSubmitCallback = (expense: ExpenseDto, type: 'create' | 'update') =>
    props.formSubmitCallback && props.formSubmitCallback(expense, type);

  const onSubmit: ISubmitForm<IExpenseSubmit> = async (
    submitData: IExpenseSubmit,
    { reset }
  ) => {
    try {
      const data = getExpenseEditData(submitData);
      const expense = await createOrUpdate(data, props.expense.id);
      formSubmitCallback(expense, props.expense.id ? 'update' : 'create');
      alertEditSuccess(props.expense.id ? undefined : reset);
    } catch (error) {
      alertEditFailed();
      Promise.resolve();
    }
  };

  return (
    <>
      <FormData
        {...formData}
        submitButtonText="Salvar"
        alignment={props.alignment}
        onSubmit={onSubmit}
      />
    </>
  );
}

function useFormData({ expense, expenseTypes }: IExpenseForm) {
  const { data } = useQuery({
    queryKey: ['expenseTypes'],
    cacheTime: 60 * 60 * 24,
    queryFn: () =>
      expenseTypes ??
      clientConn.get('/expenses/types').then((response) => response.data)
  });

  const validationSchema: ZodType = z.object({
    name: ZodValidator.string(),
    value: ZodValidator.brl(),
    dueDate: ZodValidator.ptBrDate(),
    paymentType: ZodValidator.select(),
    installments: ZodValidator.number(),
    expenseType: ZodValidator.select()
  });

  const inputs: IFormInput[] = [
    {
      name: 'name',
      label: 'Nome',
      initialValue: expense.name
    },
    {
      name: 'value',
      label: 'Valor',
      initialValue: expense.value,
      mask: Masks.BRL
    },
    {
      name: 'dueDate',
      label: 'Data de Vencimento',
      mask: Masks.DATE,
      placeHolder: 'DD/MM/YYYY',
      initialValue: DateUtil.toLocalePtBr(expense.dueDate)
    },
    {
      name: 'paymentType',
      label: 'Pagamento',
      type: 'select',
      options: paymentTypes,
      initialValue: getPaymentTypeId(expense.paymentType) ?? '1'
    },
    {
      name: 'installments',
      label: 'Parcelas',
      mask: Masks.INSTALLMENT,
      initialValue: String(expense.installments) ?? '1'
    },
    {
      name: 'expenseType',
      label: 'Tipo',
      type: 'select',
      options: data ?? [],
      initialValue: expense.type
    }
  ];

  return { inputs, validationSchema };
}

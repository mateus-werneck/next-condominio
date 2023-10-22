import { IExpenseSubmit } from '@Components/Forms/Expenses/Edit/types';
import { getPaymentType } from '@Lib/Select/PaymentOptions';
import { CreateExpense } from '@Types/Expense/types';

export function getExpenseEditData(submitData: IExpenseSubmit): CreateExpense {
  const { name, value, dueDate, expenseType } = submitData;

  return {
    name,
    value,
    dueDate: new Date(dueDate),
    type: expenseType,
    paymentType: getPaymentType(submitData.paymentType) as string,
    installments: Number(submitData.installments)
  };
}

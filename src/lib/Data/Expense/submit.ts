import { IExpenseSubmit } from '@Components/Forms/Expenses/Edit/types';
import { getPaymentType } from '@Lib/Select/PaymentOptions';
import { CreateExpense } from '@Types/Expense/types';

export function getExpenseEditData(submitData: IExpenseSubmit): CreateExpense {
  return {
    ...submitData,
    dueDate: new Date(submitData.dueDate),
    type: submitData.expenseType,
    paymentType: getPaymentType(submitData.paymentType) as string,
    installments: Number(submitData.installments)
  };
}

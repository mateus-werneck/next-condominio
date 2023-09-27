import { IExpenseSubmit } from '@Components/Forms/Expenses/Edit/types';
import { CreateExpense } from '@Types/Expense/types';

export function getExpenseEditData(submitData: IExpenseSubmit): CreateExpense {
  return {
    name: submitData.name,
    value: submitData.value,
    dueDate: new Date(submitData.dueDate),
    type: submitData.expenseType,
    paymentType: submitData.paymentType,
    installments: submitData.installments
  };
}

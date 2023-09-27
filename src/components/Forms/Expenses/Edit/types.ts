import { ExpenseDto } from '@Types/Expense/types';
import { ExpenseType } from '@prisma/client';

export interface IExpenseForm {
  expense: ExpenseDto;
  expenseTypes?: ExpenseType[];
  formSubmitCallback?: (value: ExpenseDto, type: 'create' | 'update') => void;
  alignment?: 'start' | 'center' | 'end';
}

export interface IExpenseSubmit {
  name: string;
  value: number;
  dueDate: string;
  expenseType: string;
  paymentType: 'À Vista' | 'Parcelado';
  installments: number;
}

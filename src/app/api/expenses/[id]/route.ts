import { safelyExecute } from '@Lib/Database/Helpers/queryHandler';
import { prisma } from '@Lib/Database/prisma';
import { treatOne } from '@Lib/Treat/Entity/Expense';
import { ExpenseDto } from '@Types/Expense/types';
import { Expense } from '@prisma/client';

import { NextRequest } from 'next/server';

export interface IExpenseParams {
  params: {
    id: string;
  };
}

export async function GET(_: NextRequest, { params: { id } }: IExpenseParams) {
  return await safelyExecute(async (): Promise<ExpenseDto> => {
    const expense: Expense = await prisma.expense.findFirstOrThrow({
      where: { id }
    });

    return treatOne(expense);
  });
}

export async function DELETE(
  _: NextRequest,
  { params: { id } }: IExpenseParams
) {
  return await safelyExecute(async (): Promise<object> => {
    await prisma.expense.delete({
      where: { id }
    });
    return {};
  });
}

import { safelyExecute } from '@Lib/Database/Helpers/queryHandler';
import { prisma } from '@Lib/Database/prisma';
import { Expense } from '@prisma/client';

import { NextRequest } from 'next/server';

export interface IExpenseParams {
  params: {
    id: string;
  };
}

export async function GET(
  req: NextRequest,
  { params: { id } }: IExpenseParams
) {
  return await safelyExecute(async (): Promise<Expense> => {
    const expense: Expense = await prisma.expense.findFirstOrThrow({
      where: { id }
    });
    return expense as Expense;
  });
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: IExpenseParams
) {
  return await safelyExecute(async (): Promise<object> => {
    await prisma.expense.delete({
      where: { id }
    });
    return {};
  });
}

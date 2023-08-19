import { prisma } from '@Lib/Database/prisma';
import { Expense } from '@prisma/client';

import { NextRequest, NextResponse } from 'next/server';

export interface IExpenseParams {
  params: {
    id: string;
  };
}

export async function GET(
  req: NextRequest,
  { params: { id } }: IExpenseParams
) {
  const expense: Expense = await prisma.expense.findFirstOrThrow({
    include: { expenseType: true },
    where: { id }
  });

  return NextResponse.json(expense);
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: IExpenseParams
) {
  await prisma.expense.delete({
    where: { id }
  });

  return NextResponse.json({});
}

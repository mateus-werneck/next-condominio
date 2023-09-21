import { safelyExecute } from '@Lib/Database/Helpers/queryHandler';
import { prisma } from '@Lib/Database/prisma';
import { CreateExpense, ExpenseDto } from '@Types/Expense/types';
import { Expense, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const conditions = getConditions(searchParams);
  const expenses = await prisma.expense.findMany(conditions);

  return NextResponse.json(expenses as ExpenseDto[]);
}
export async function POST(request: NextRequest) {
  const data = await request.json();
  const expense = data as CreateExpense;

  return await safelyExecute(async (): Promise<Expense> => {
    const createdExpense = await prisma.expense.create({ data: expense });
    return createdExpense;
  });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const expense = data as Expense;

  return await safelyExecute(async (): Promise<Expense> => {
    const updatedExpense = await prisma.expense.update({
      where: { id: expense.id },
      data: expense,
      include: { expenseType: true }
    });

    return updatedExpense;
  });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const expenseIds: string | null = searchParams.get('ids');

  if (!expenseIds) return NextResponse.json({});

  await prisma.expense.deleteMany({
    where: { id: { in: expenseIds.split(',') } }
  });

  return NextResponse.json({});
}

function getConditions(searchParams: URLSearchParams) {
  if (!searchParams.size) return {};

  const filters: Prisma.ExpenseFindManyArgs<DefaultArgs> = {
    include: { expenseType: true },
    where: {}
  };

  const startAt = String(searchParams.get('startAt'));
  const endAt = searchParams.get('endAt') ?? startAt;
  const name = searchParams.get('name');
  const expenseTypes = searchParams.get('expenseTypes');

  if (searchParams.has('startAt')) {
    filters.where = {
      ...filters.where,
      dueDate: {
        gte: new Date(startAt),
        lte: new Date(String(endAt))
      }
    };
  }

  if (name) {
    filters.where = {
      ...filters.where,
      name: { contains: String(searchParams.get('name')) }
    };
  }

  if (expenseTypes)
    filters.where = {
      ...filters.where,
      expenseType: {
        id: { in: String(searchParams.get('expenseTypes')).split(',') }
      }
    };

  return filters;
}

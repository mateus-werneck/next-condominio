import { prisma } from '@Lib/Database/prisma';
import { CreateExpense } from '@Types/Expense/types';
import { Expense, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const conditions = getConditions(searchParams);
  const expenses = await prisma.expense.findMany(conditions);

  return NextResponse.json(expenses);
}
export async function POST(request: NextRequest) {
  const data = await request.json();
  const expense = data as CreateExpense;

  const createdExpense = await prisma.expense.create({ data: expense });

  return NextResponse.json(createdExpense);
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const expense = data as Expense;

  const updatedExpense = await prisma.expense.update({
    where: { id: expense.id },
    data: expense
  });

  return NextResponse.json(updatedExpense);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ids: string | null = searchParams.get('ids');

  if (!ids) return NextResponse.json({});

  await prisma.expense.deleteMany({ where: { id: { in: ids.split(',') } } });

  return NextResponse.json({});
}

function getConditions(searchParams: URLSearchParams) {
  if (!searchParams.size) return {};

  const filters: Prisma.ExpenseFindManyArgs<DefaultArgs> = {
    include: { expenseType: true },
    where: {}
  };

  const startAt = String(searchParams.get('startAt'));
  const endAt = searchParams.has('endAt') ? searchParams.get('endAt') : startAt;
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

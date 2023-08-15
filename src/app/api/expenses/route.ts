import { prisma } from '@Lib/Database/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conditions = getConditions(searchParams);
  const expenses = await prisma.expense.findMany(conditions);

  return NextResponse.json(expenses);
}

function getConditions(searchParams: URLSearchParams) {
  if (!searchParams.size) return {};

  const filters: Prisma.ExpenseFindManyArgs<DefaultArgs> = {
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

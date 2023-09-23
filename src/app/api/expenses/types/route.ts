import { prisma } from '@Lib/Database/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const expenseTypes = await prisma.expenseType.findMany({
    orderBy: { label: 'asc' }
  });
  return NextResponse.json(expenseTypes);
}

import { prisma } from '@Lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const expenseTypes = await prisma.expenseType.findMany();
  return NextResponse.json(expenseTypes);
}

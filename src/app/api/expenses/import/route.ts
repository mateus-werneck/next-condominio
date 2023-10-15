import { prisma } from '@Lib/Database/prisma';
import { importMany } from '@Lib/Import/ImportFile';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) return NextResponse.json({ success: false });

  const props = [
    'name',
    'value',
    'dueDate',
    'type',
    'paymentType',
    'installments'
  ];

  const mapExpense = (entity: Record<string, any>) => {
    const headers = Object.keys(entity);

    return headers.reduce(
      (acc: Record<string, any>, header: string, index: number) => {
        acc[props[index]] = entity[header];
        return acc;
      },
      {}
    );
  };

  const result = await importMany<Prisma.ExpenseDelegate<DefaultArgs>>(
    file,
    prisma.expense,
    mapExpense
  );

  return NextResponse.json(result);
}

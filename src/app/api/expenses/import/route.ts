import { prisma } from '@Lib/Database/prisma';
import { importMany } from '@Lib/Import/ImportFile';
import { DateUtil } from '@Lib/Treat/Date';
import { ExpenseType, Prisma } from '@prisma/client';
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

  const types = await prisma.expenseType.findMany();

  const mapExpense = (entity: Record<string, any>) => {
    const headers = Object.keys(entity);

    return headers.reduce(
      (acc: Record<string, any>, header: string, index: number) => {
        const prop = props[index];

        acc[prop] = entity[header];

        if (prop === 'type') {
          acc[prop] = types.find((e: ExpenseType) => e.label === acc[prop]);
        }

        if (prop === 'dueDate') {
          acc[prop] = DateUtil.toDateObject(acc[prop]);
        }

        return acc;
      },
      {}
    );
  };

  const result = await importMany(file, prisma.expense, props, mapExpense);

  return NextResponse.json(result);
}

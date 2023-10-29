import { ExpenseMap } from '@Lib/Data/Expense/export';
import { prisma } from '@Lib/Database/prisma';
import { importMany } from '@Lib/Import/ImportFile';
import { DateUtil } from '@Lib/Treat/Date';
import { ExpenseType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) return NextResponse.json({ success: false });

  const types = await prisma.expenseType.findMany();

  const mapExpense = (entity: Record<string, any>) => {
    const headers = Object.keys(ExpenseMap);

    return headers.reduce(
      (accumulator: Record<string, any>, header: string) => {
        const propertyName = ExpenseMap[header];

        accumulator[propertyName] = entity[header];

        if (propertyName === 'type') {
          accumulator[propertyName] = types.find(
            (e: ExpenseType) => e.label === accumulator[propertyName]
          )?.id;
        }

        if (propertyName === 'dueDate') {
          accumulator[propertyName] = DateUtil.toISOString(
            accumulator[propertyName]
          );
          accumulator[propertyName] = DateUtil.toDateObject(
            accumulator[propertyName]
          );
        }

        if (propertyName === 'paymentType' && !accumulator[propertyName]) {
          accumulator[propertyName] = 'À Vista';
        }

        if (propertyName === 'installments' && !accumulator[propertyName]) {
          accumulator[propertyName] = 1;
        }

        return accumulator;
      },
      {}
    );
  };

  return await importMany(file, prisma.expense, ExpenseMap, mapExpense);
}

import { safelyExecute } from '@Lib/Database/Helpers/queryHandler';
import { prisma } from '@Lib/Database/prisma';
import { DateUtil } from '@Lib/Treat/Date';
import { isValidUUID } from '@Lib/Treat/String';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) return NextResponse.json({ success: false });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `/tmp/${file.name}`;
  await writeFile(path, buffer);

  return importJsonExpenses(path);
}

async function importJsonExpenses(path: string) {
  const data = readFileSync(path, { encoding: 'utf-8' });
  const expenses = JSON.parse(data);

  return safelyExecute(async () => {
    const result = await prisma.expense.createMany({
      data: expenses.map((e: any) => ({
        name: e.name,
        value: e.value,
        dueDate: DateUtil.toDateObject(e.dueDate),
        type: isValidUUID(e.type) ? e.type : null,
        installments: e.installments ?? 1,
        paymentType: e.paymentType ?? 'À Vista'
      }))
    });

    return { imported: result.count };
  });
}

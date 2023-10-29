import { ExpenseMap } from '@Lib/Data/Expense/export';
import { exportSheet } from '@Lib/Export/ExportFile';
import { ExpenseDto } from '@Types/Expense/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const rows = await request.json();
  const data = rows.map(mapEachExpense);
  const file = await exportSheet(data);

  return NextResponse.json({ file });
}

function mapEachExpense(entity: Record<string, any>) {
  const headers = Object.keys(ExpenseMap);

  return headers.reduce((accumulator: Record<string, any>, header: string) => {
    const propertyName = ExpenseMap[header];

    if (propertyName === 'type') {
      accumulator[header] = entity.expenseType.label;
      return accumulator;
    }

    accumulator[header] = entity[propertyName as keyof ExpenseDto];

    return accumulator;
  }, {});
}

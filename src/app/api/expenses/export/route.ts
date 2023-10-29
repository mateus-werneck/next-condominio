import { ExpenseMap } from '@Lib/Data/Expense/export';
import { exportSheet } from '@Lib/Export/ExcelExport';
import { DateUtil } from '@Lib/Treat/Date';
import { MoneyUtil } from '@Lib/Treat/Money';
import { ExpenseDto } from '@Types/Expense/types';
import { Row } from 'exceljs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const rows = await request.json();
  const data = rows.map(mapEachExpense);

  const applyFormatting = (row: Row) => {
    const amount = row.getCell('B');
    amount.numFmt = '"R$"#.##';

    const dueDate = row.getCell('C');
    dueDate.numFmt = 'dd/mm/yyyy';
  };

  const file = await exportSheet(data, applyFormatting);

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

    if (propertyName === 'value') {
      accumulator[header] = MoneyUtil.toFloat(accumulator[header]);
    }

    if (propertyName === 'dueDate') {
      accumulator[header] = DateUtil.toDateObject(
        DateUtil.toISOString(accumulator[header])
      );
    }

    return accumulator;
  }, {});
}

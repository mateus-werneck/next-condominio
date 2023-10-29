import { TSheetRow, exportSheet } from '@Lib/Export/ExcelExport';
import { Row } from 'exceljs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const rows: TSheetRow[] = await request.json();
  console.log(rows);
  //  const applyFormatting = (row: Row) => {
  //    const amount = row.getCell('B');
  //    amount.numFmt = '"R$"#.##';
  //
  //    const dueDate = row.getCell('C');
  //    dueDate.numFmt = 'dd/mm/yyyy';
  //  };
  //
  //  const file = await exportSheet(rows, applyFormatting);

  return NextResponse.json({});
}

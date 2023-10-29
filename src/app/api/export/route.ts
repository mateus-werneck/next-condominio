import { TSheetRow, exportSheet } from '@Lib/Export/ExcelExport';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const rows: TSheetRow[] = await request.json();
  const file = await exportSheet(rows);

  return NextResponse.json({ file });
}

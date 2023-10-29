import { exportSheet } from '@Lib/Export/ExcelExport';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { extension, data } = await request.json();
  let file = '';

  if (extension === 'xlsx') {
    file = await exportSheet(data);
  }

  return NextResponse.json({ file });
}

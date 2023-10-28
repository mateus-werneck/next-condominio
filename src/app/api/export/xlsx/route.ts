import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function POST(request: NextRequest) {
  const rows = await request.json();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet);
  const base64 = XLSX.write(workbook, { type: 'base64' });

  return NextResponse.json({ file: base64 });
}

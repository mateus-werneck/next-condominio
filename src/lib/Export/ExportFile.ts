import * as XLSX from 'xlsx';

export function exportSheet<T>(data: T[]): string {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet);
  const base64 = XLSX.write(workbook, { type: 'base64' });

  return base64;
}

import * as XLSX from 'xlsx';
import { writeFile } from 'fs/promises';

export async function sheetToJSON(path: string) {
  const workbook = XLSX.readFile(path);
  const worksheets = workbook.Sheets;
  const worksheet = Object.values(worksheets)[0];
  const rawData = XLSX.utils.sheet_to_json(worksheet) as unknown as Record<
    string,
    any
  >[];

  const props = [
    'name',
    'value',
    'dueDate',
    'type',
    'installments',
    'paymentType'
  ];

  const mappedData = rawData.map((newExpense: Record<string, any>) => {
    const headers = Object.keys(newExpense);

    if (headers.length != props.length) return {};

    return headers.reduce(
      (acc: Record<string, any>, header: string, index: number) => {
        acc[props[index]] = newExpense[header];
        return acc;
      },
      {}
    );
  });

  await writeFile(path, JSON.stringify(mappedData));
}

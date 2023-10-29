import { SheetRecord } from '@Lib/Treat/Excel';
import { Alignment, Borders, Font, Workbook, Worksheet, Row } from 'exceljs';

export async function exportSheet<T extends Record<string, any>>(
  data: T[],
  applyFormatting?: (row: Row) => void
): Promise<string> {
  const workbook = new Workbook();

  const worksheet = workbook.addWorksheet('Despesas', {
    properties: {
      defaultColWidth: 25
    }
  });

  const headerRow = worksheet.addRow(Object.keys(data[0]));
  const { font, border, alignment } = getDefaultFormat();

  headerRow.eachCell((cell) => {
    cell.font = { ...font, bold: true };
    cell.border = border;
    cell.alignment = alignment;
  });

  data.forEach((d: SheetRecord) => {
    const row = getEachRow(d, worksheet);
    if (applyFormatting) applyFormatting(row);
  });

  const content = await workbook.xlsx.writeBuffer();
  const buffer = Buffer.from(content);
  return buffer.toString('base64');
}

export function getDefaultFormat() {
  const font: Partial<Font> = {
    color: { argb: '#000000' },
    size: 12
  };

  const border: Partial<Borders> = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  };

  const alignment: Partial<Alignment> = {
    vertical: 'middle',
    horizontal: 'center'
  };

  return { font, border, alignment };
}

function getEachRow(d: SheetRecord, worksheet: Worksheet): Row {
  const row = worksheet.addRow(Object.values(d));
  const { font, border, alignment } = getDefaultFormat();

  row.font = font;
  row.alignment = alignment;

  row.eachCell((cell) => {
    cell.border = border;
  });

  return row;
}

import { DateUtil } from '@Lib/Treat/Date';
import { MoneyUtil } from '@Lib/Treat/Money';
import { Record } from '@prisma/client/runtime/library';
import { Alignment, Borders, Font, Workbook, Worksheet, Row } from 'exceljs';

export type TSheetRow = Record<string, TSheetCell>;

export type TSheetCell = {
  type: string;
  value: any;
};

export async function exportSheet(
  data: TSheetRow[],
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

  data.forEach((d: TSheetRow) => {
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

function getEachRow(d: TSheetRow, worksheet: Worksheet): Row {
  const row = worksheet.addRow([]);
  const { font, border, alignment } = getDefaultFormat();

  row.font = font;
  row.alignment = alignment;

  Object.keys(d).forEach((name: string, index: number) => {
    const cell = row.getCell(index + 1);
    cell.value = d[name].value;

    if (d[name].type == 'date') {
      cell.value = DateUtil.toDateObject(cell.value);
      cell.numFmt = 'dd/mm/yyyy';
    }

    if (d[name].type == 'money') {
      cell.value = MoneyUtil.toFloat(d[name].value);
      cell.numFmt = '"R$"#.##';
    }
  });

  row.eachCell((cell) => {
    cell.border = border;
  });

  return row;
}

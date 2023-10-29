import { Alignment, Borders, Font, Workbook } from 'exceljs';

export async function exportSheet<T extends Record<string, any>>(
  data: T[]
): Promise<string> {
  const workbook = new Workbook();

  const worksheet = workbook.addWorksheet('Despesas', {
    properties: {
      defaultColWidth: 25
    }
  });

  const headerRow = worksheet.addRow(Object.keys(data[0]));

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

  headerRow.eachCell((cell) => {
    cell.font = { ...font, bold: true };
    cell.border = border;
    cell.alignment = alignment;
  });

  data.forEach((expense) => {
    const row = worksheet.addRow(Object.values(expense));

    row.font = font;
    row.border = border;
    row.alignment = alignment;

    const amount = row.getCell('B');
    amount.numFmt = '"R$"#.##0,00';

    const dueDate = row.getCell('C');
    dueDate.numFmt = 'dd/mm/yyyy';
  });

  const content = await workbook.xlsx.writeBuffer();
  const buffer = Buffer.from(content);
  return buffer.toString('base64');
}

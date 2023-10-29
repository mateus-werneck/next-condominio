import { TSheetRow } from '@Lib/Export/ExcelExport';

export type TColExportDef = {
  field: string;
  headerName: string;
  exportType?: string;
};

export function tableToSheet<T extends Record<string, any>>(
  rows: T[],
  columns: TColExportDef[]
): TSheetRow[] {
  return rows.map((row) => mapEachRow(row, columns));
}

function mapEachRow<T extends Record<string, any>>(
  row: T,
  columns: TColExportDef[]
): TSheetRow {
  const treatedRow = columns.reduce(
    (accumulator: TSheetRow, column: TColExportDef) => {
      const propertyName = column.field;

      if (propertyName == 'actions') return accumulator;

      const type = column.exportType ?? 'string';
      const value = row[propertyName];

      const header = column.headerName ?? '';

      return {
        ...accumulator,
        [header]: { type, value }
      };
    },
    {} as TSheetRow
  );

  return treatedRow;
}

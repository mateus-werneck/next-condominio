import { TSheetRow } from '@Lib/Export/ExcelExport';

export type TColDef = {
  field: string;
  headerName: string;
  type: string;
};

export function tableToSheet<T extends Record<string, any>>(
  rows: T[],
  columns: TColDef[]
): TSheetRow[] {
  return rows.map((row) => mapEachRow(row, columns));
}

function mapEachRow<T extends Record<string, any>>(
  row: T,
  columns: TColDef[]
): TSheetRow {
  const treatedRow = columns.reduce(
    (accumulator: TSheetRow, column: TColDef) => {
      const propertyName = column.field;

      if (propertyName == 'actions') return accumulator;

      const type = column.type ?? 'string';
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

import * as XLSX from 'xlsx';
import { writeFile } from 'fs/promises';

export type SheetRecord = Record<string, any>;

export async function sheetToJSON(
  path: string,
  props: string[],
  callbackFn?: (entity: SheetRecord, props: string[]) => SheetRecord
): Promise<string> {
  const workbook = XLSX.readFile(path);
  const worksheets = workbook.Sheets;
  const worksheet = Object.values(worksheets)[0];
  const rawData = XLSX.utils.sheet_to_json(worksheet) as unknown as Record<
    string,
    any
  >[];

  const mapFunction = callbackFn ?? mapStandardData;

  const mappedData = rawData.map((entity: SheetRecord) =>
    mapFunction(entity, props)
  );

  const jsonPath = path.split('.')[0] + '.json';

  await writeFile(jsonPath, JSON.stringify(mappedData));

  return jsonPath;
}

function mapStandardData(entity: SheetRecord, props: string[]): SheetRecord {
  const headers = Object.keys(entity);

  if (headers.length != props.length) return {};

  return headers.reduce(
    (acc: Record<string, any>, header: string, index: number) => {
      acc[props[index]] = entity[header];
      return acc;
    },
    {}
  );
}

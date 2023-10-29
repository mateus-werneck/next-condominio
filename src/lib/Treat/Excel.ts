import * as XLSX from 'xlsx';
import { writeFile, readFile } from 'fs/promises';

export type SheetRecord = Record<string, any>;
export type TSheetCallback<K> = (entity: SheetRecord, props: K) => SheetRecord;

export async function sheetToJSON<T extends Record<string, string>>(
  path: string,
  props: T,
  callbackFn?: TSheetCallback<T>
): Promise<string> {
  const content = await readFile(path);
  const workbook = XLSX.read(content);
  const worksheets = workbook.Sheets;
  const worksheet = Object.values(worksheets)[0];

  const rawData = XLSX.utils.sheet_to_json(
    worksheet
  ) as unknown as SheetRecord[];

  const mapFunction = callbackFn ?? mapStandardData;

  const mappedData = rawData.map((entity: SheetRecord) =>
    mapFunction(entity, props)
  );

  const jsonPath = path.split('.')[0] + '.json';

  await writeFile(jsonPath, JSON.stringify(mappedData));

  return jsonPath;
}

function mapStandardData(
  entity: SheetRecord,
  props: Record<string, string>
): SheetRecord {
  const headers = Object.keys(entity);
  const expectedHeaders = Object.keys(props);

  if (headers.length != expectedHeaders.length) return {};

  return headers.reduce((accumulator: Record<string, any>, header: string) => {
    const property = props[header];
    accumulator[property] = entity[header];
    return accumulator;
  }, {});
}

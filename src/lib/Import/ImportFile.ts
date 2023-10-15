import { safelyExecute } from '@Lib/Database/Helpers/queryHandler';
import { SheetRecord, sheetToJSON } from '@Lib/Treat/Excel';
import { hasExcelExtension } from '@Lib/Treat/File';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

type TRepository = {
  createMany: (args: { data: any }) => any;
};

export type ImportRecords = Record<string, any>[];

export async function importMany<T extends TRepository>(
  file: File,
  repository: T,
  props: string[],
  callbackFn?: (entity: SheetRecord, props: string[]) => SheetRecord
) {
  let path = await writeTempFile(file);

  if (hasExcelExtension(file)) {
    path = await sheetToJSON(path, props, callbackFn);
  }

  const data = getJSONData(path);

  return safelyExecute(async () => {
    const result = await repository.createMany({ data });
    return { imported: result.count };
  });
}

async function writeTempFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `/tmp/${file.name}`;
  await writeFile(path, buffer);

  return path;
}

async function getJSONData(path: string) {
  const content = readFileSync(path, { encoding: 'utf-8' });
  return JSON.parse(content) as unknown as ImportRecords[];
}

import { safelyExecute } from '@Lib/Database/Helpers/queryHandler';
import { sheetToJSON } from '@Lib/Treat/Excel';
import { hasExcelExtension } from '@Lib/Treat/File';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

type TRepository = {
  createMany: (args: { data: any }) => any;
};

export async function importMany<T extends TRepository>(
  file: File,
  repository: T,
  callbackFn: (entity: Record<string, any>) => Record<string, any>
) {
  const path = await writeTempFile(file);

  if (hasExcelExtension(file)) {
    await sheetToJSON(path);
  }

  const data = getJSONData(path, callbackFn);

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

async function getJSONData(
  path: string,
  callbackFn: (entity: Record<string, any>) => Record<string, any>
) {
  const content = readFileSync(path, { encoding: 'utf-8' });
  const rawData = JSON.parse(content) as unknown as T;

  return rawData.map(callbackFn);
}

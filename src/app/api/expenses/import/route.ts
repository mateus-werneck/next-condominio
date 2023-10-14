import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) return NextResponse.json({ success: false });

  console.log(typeof file);

  //  const bytes = await file.stream();
  //  const buffer = Buffer.from(bytes);
  //
  //  const path = `/tmp/${file.name}`;
  //  await writeFile(path, buffer);
  //
  //  console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({});
}

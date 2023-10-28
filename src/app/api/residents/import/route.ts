import { prisma } from '@Lib/Database/prisma';
import { importMany } from '@Lib/Import/ImportFile';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) return NextResponse.json({ success: false });

  const fields: Record<string, string> = {
    Nome: 'name',
    Apartamento: 'apartment',
    Email: 'email',
    Telefone: 'phone'
  };

  const mapEachResident = (entity: Record<string, any>) => {
    const headers = Object.keys(fields);

    return headers.reduce(
      (accumulator: Record<string, any>, header: string) => {
        const propertyName = fields[header];
        accumulator[propertyName] = entity[header];
        return accumulator;
      },
      {}
    );
  };

  return await importMany(file, prisma.resident, fields, mapEachResident);
}

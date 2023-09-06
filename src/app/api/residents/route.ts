import { safelyExecute } from '@Lib/Database/Helpers/queryHandler';
import { prisma } from '@Lib/Database/prisma';
import { CreateResident } from '@Types/Resident/types';
import { Resident } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  let data = await prisma.resident.findMany();

  if (!data) data = [] as Resident[];

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const resident = data as CreateResident;

  return await safelyExecute(async (): Promise<Resident> => {
    const createdResident = await prisma.resident.create({ data: resident });
    return createdResident;
  });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const resident = data as Resident;

  return await safelyExecute(async (): Promise<Resident> => {
    const updateResident = await prisma.resident.update({
      where: { id: resident.id },
      data: resident
    });
    return updateResident;
  });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const residents: string | null = searchParams.get('residents');

  if (!residents) return NextResponse.json({});

  await prisma.resident.deleteMany({
    where: { id: { in: residents.split(',') } }
  });

  return NextResponse.json({});
}

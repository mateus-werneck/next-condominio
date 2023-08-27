import { prisma } from '@Lib/Database/prisma';
import { Resident } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  let data = await prisma.resident.findMany();

  if (!data) data = [] as Resident[];

  return NextResponse.json(data);
}

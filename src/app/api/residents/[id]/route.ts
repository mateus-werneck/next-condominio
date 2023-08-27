import { prisma } from '@Lib/Database/prisma';
import { Resident } from '@prisma/client';

import { NextRequest, NextResponse } from 'next/server';

export interface IResidentParams {
  params: {
    id: string;
  };
}

export async function GET(
  req: NextRequest,
  { params: { id } }: IResidentParams
) {
  const resident: Resident = await prisma.resident.findFirstOrThrow({
    where: { id }
  });

  return NextResponse.json(resident);
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: IResidentParams
) {
  await prisma.resident.delete({
    where: { id }
  });

  return NextResponse.json({});
}

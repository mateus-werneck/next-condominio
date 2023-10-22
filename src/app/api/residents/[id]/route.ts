import { safelyExecute } from '@Lib/Database/Helpers/queryHandler';
import { prisma } from '@Lib/Database/prisma';
import { Resident } from '@prisma/client';

import { NextRequest } from 'next/server';

export interface IResidentParams {
  params: {
    id: string;
  };
}

export async function GET(_: NextRequest, { params: { id } }: IResidentParams) {
  return await safelyExecute(async (): Promise<Resident> => {
    const resident: Resident = await prisma.resident.findFirstOrThrow({
      where: { id }
    });
    return resident;
  });
}

export async function DELETE(
  _: NextRequest,
  { params: { id } }: IResidentParams
) {
  return await safelyExecute(async (): Promise<object> => {
    await prisma.resident.delete({
      where: { id }
    });
    return {};
  });
}

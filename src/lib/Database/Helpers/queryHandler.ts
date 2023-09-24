import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function safelyExecute(callback: () => Promise<any>) {
  try {
    const result = await callback();
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof PrismaClientKnownRequestError ? 404 : 500;
    const message =
      process.env.NODE_ENV != 'production'
        ? error.message
        : error instanceof PrismaClientKnownRequestError
        ? 'Record not found'
        : 'Internal Server Error';

    if (process.env.NODE_ENV != 'production') console.debug(error);

    return NextResponse.json({ message }, { status });
  }
}

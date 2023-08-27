import { Resident } from '@prisma/client';
export type CreateResident = Omit<Resident, 'id'>;

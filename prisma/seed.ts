/* eslint-disable */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await createExpenseTypes();
}

async function createExpenseTypes() {
  const count = await prisma.expenseType.count();

  if (count) return;

  const expenseTypes = await prisma.expenseType.createMany({
    data: [
      {
        name: 'water_bill',
        label: 'Conta de Água'
      },
      {
        name: 'energy_bill',
        label: 'Conta de Luz'
      },
      {
        name: 'natural_gas_bill',
        label: 'Conta de Gás'
      },
      {
        name: 'cleaning_bill',
        label: 'Conservação e Cond.'
      },
      {
        name: 'insurance_bill',
        label: 'Seguro do Prédio'
      },
      {
        name: 'maintenance_fees',
        label: 'Reparos Gerais'
      },
      {
        name: 'garden_maintenance',
        label: 'Manutenção do Jardim'
      },
      {
        name: 'extinguisher_maintenance',
        label: 'Manutenção de Extintores'
      },
      {
        name: 'fumigation_bill',
        label: 'Dedetização e Limpeza'
      },
      {
        name: 'banking_fees',
        label: 'Despesas Bancárias'
      }
    ]
  });

  console.log(expenseTypes);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });

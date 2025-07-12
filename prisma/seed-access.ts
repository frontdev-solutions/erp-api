import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.access.create({
    data: {
      name: 'dashboard',
      description: null,
      action: 'READ',
      resource: 'Dashboard',
    },
  });

  console.log('Access user created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findFirst({
    where: {
      email: 'superadmin@example.com',
    },
  });

  if (existing) {
    console.log('Admin user already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash('P@ssw0rd', 10);

  const user = await prisma.user.create({
    data: {
      firstName: null,
      lastName: null,
      sureName: 'Super Admin',
      address: null,
      birthDate: null,
      birthPlace: null,
      gender: 'MALE',
      email: 'superadmin@example.com',
      password: hashedPassword,
      phoneNumber: '085155460607',
      userImage: null,
      roleId: '06e54297-d367-4ec6-ad33-31baf2e3492e',
      joinAt: null,
      active: true,
    },
  });

  console.log('Admin user created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

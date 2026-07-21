import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/client';

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const alaa = await prisma.user.upsert({
    where: { email: 'alaa.hassan@example.com' },
    update: {},
    create: {
      email: 'alaa.hassan@example.com',
      passwordHash,
      firstName: 'Alaa',
      lastName: 'Hassan',
      phone: '+201001234567',
      nationality: 'Egyptian',
      birthday: new Date('2001-04-12'),
      gender: 'FEMALE',
      studentStatus: 'GRADUATE',
      university: 'Cairo University',
      graduationYear: 2023,
      faculty: 'Faculty of Engineering',
    },
  });

  await prisma.user.upsert({
    where: { email: 'omar.said@example.com' },
    update: {},
    create: {
      email: 'omar.said@example.com',
      passwordHash,
      firstName: 'Omar',
      lastName: 'Said',
      phone: '+201009876543',
      nationality: 'Egyptian',
      birthday: new Date('2000-09-30'),
      gender: 'MALE',
      studentStatus: 'STUDENT',
      university: 'Ain Shams University',
      graduationYear: 2027,
      faculty: 'Faculty of Commerce',
    },
  });

  const existingRequest = await prisma.passwordResetRequest.findFirst({
    where: { userId: alaa.id, status: 'PENDING' },
  });
  if (!existingRequest) {
    await prisma.passwordResetRequest.create({
      data: { userId: alaa.id, status: 'PENDING' },
    });
  }

  console.log('Seed complete: 2 users, 1 pending reset request.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

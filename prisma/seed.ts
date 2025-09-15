import { PrismaClient, Role } from '../generated/prisma';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@local' },
    update: {},
    create: { email: 'admin@local', password: hash, role: Role.ADMIN },
  });
  console.log('Seed OK: admin@local / admin123');
}

main().finally(() => prisma.$disconnect());

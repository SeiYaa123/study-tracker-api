"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new prisma_1.PrismaClient();
async function main() {
    const hash = await bcrypt_1.default.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@local' },
        update: {},
        create: { email: 'admin@local', password: hash, role: prisma_1.Role.ADMIN },
    });
    console.log('Seed OK: admin@local / admin123');
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map
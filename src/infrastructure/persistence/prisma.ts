import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";
const { Pool } = pkg;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: pkg.Pool | undefined;
};

function getPool() {
  if (!globalForPrisma.pool) {
    globalForPrisma.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Don't try to connect during build
      ...(process.env.VERCEL ? { max: 1 } : {}),
    });
  }
  return globalForPrisma.pool;
}

function getPrisma() {
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaPg(getPool());
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.prisma!;
}

export const prisma = getPrisma();

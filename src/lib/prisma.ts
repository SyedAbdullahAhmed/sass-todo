import { PrismaClient } from "@prisma/client";

const prismaClientSingletion = () => {
  return new PrismaClient();
};

type prismaClientSingletion = ReturnType<typeof prismaClientSingletion>;

const globalForPrisma = globalThis as unknown as { 
    prisma: PrismaClient | undefined 
};

const prisma = globalForPrisma.prisma ?? prismaClientSingletion();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;



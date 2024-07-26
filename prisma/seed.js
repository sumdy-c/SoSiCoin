import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.allCoins.upsert({
    where: { id: 1 },
    update: {},
    create: {
        isCheatCoins: 1000000,
        isMakarCoins: 1000000,
        isGLTFCoins: 1000000,
        isYanaCoins: 1500000,
        isSosiskaCoins: 1000000000,
    }
  });
}

seed();

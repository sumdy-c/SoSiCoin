-- CreateTable
CREATE TABLE "AccountDibila" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "coins" INTEGER NOT NULL,
    "achievements" TEXT[] DEFAULT ARRAY['hello']::TEXT[],

    CONSTRAINT "AccountDibila_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllCoins" (
    "id" SERIAL NOT NULL,
    "isCheatCoins" INTEGER NOT NULL,
    "isGLTFCoins" INTEGER NOT NULL,
    "isYanaCoins" INTEGER NOT NULL,
    "isMakarCoins" INTEGER NOT NULL,
    "isSosiskaCoins" INTEGER NOT NULL,

    CONSTRAINT "AllCoins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountDibila_userName_key" ON "AccountDibila"("userName");

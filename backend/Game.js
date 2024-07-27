import { PrismaClient } from "@prisma/client";

class Game {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async hit(person, user) {
    if (!person) {
      return null;
    }

    const targetName = person.person;

    const userCheck = await this.prisma.accountDibila.findUnique({
      where: { userName: user.userName },
    });

    const coins = await this.prisma.allCoins.findUnique({
      where: { id: 1 },
    });

    switch (targetName) {
      case "yana": {
        coins.isYanaCoins = coins.isYanaCoins - userCheck.damage;
        break;
      }
      case "cheat": {
        coins.isCheatCoins = coins.isCheatCoins - userCheck.damage;
        break;
      }
      case "glhf": {
        coins.isGLTFCoins = coins.isGLTFCoins - userCheck.damage;
        break;
      }
      case "mark": {
        coins.isMakarCoins = coins.isMakarCoins - userCheck.damage;
        break;
      }
      case "sosis": {
        coins.isSosiskaCoins = coins.isSosiskaCoins - userCheck.damage;
        break;
      }
    }

    const result = await this.prisma.allCoins.update({
      where: { id: 1 },
      data: {
        isCheatCoins: coins.isCheatCoins,
        isGLTFCoins: coins.isGLTFCoins,
        isMakarCoins: coins.isMakarCoins,
        isSosiskaCoins: coins.isSosiskaCoins,
        isYanaCoins: coins.isYanaCoins,
      },
    });

    userCheck.coins = userCheck.coins + userCheck.damage;

    const resultUser = await this.prisma.accountDibila.update({
        where: {userName: userCheck.userName},
        data: userCheck
    });

    return { newCoins: result, user: resultUser};
  }

  async getCoins() {
    return await this.prisma.allCoins.findUnique({
        where: { id: 1 },
      });
  }
}

export default Game;

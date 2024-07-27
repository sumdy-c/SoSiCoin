import { PrismaClient } from "@prisma/client";

class Auth {
    prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }
    
    async checkAuth(session) {
        if(!session.user) {
            return 'unauth';
        }

        const userCheck = await this.prisma.accountDibila.findUnique({
            where: { userName: session.user.userName },
        });

        return userCheck;
    }

    async auth(name, pass) {
        if(!this.prisma) {
            console.log('нет призмы');
            return;
        }

        try {
            const [ user ] = await this.prisma.accountDibila.findMany({
                where: {
                    userName: name
                }
            });

            if(!user) {
                const regNewUser = await this.prisma.accountDibila.create({
                    data: {
                        coins: 0,
                        password: pass,
                        userName: name,
                        damage: 1,
                        achievements: ['hello'],
                    }
                });

                return {
                    type: 'newUser',
                    data: regNewUser
                };
            }

            if(user.password === pass) {
                return {
                    type: 'oldUser',
                    data: user
                };
            } else {
                return 'invalidPass';
            }
        } catch (error) {
            console.log(error);
        }
    }

    async register(login, userPass) {
        if(!this.prisma){
            console.log('нет призмы');
            return;
        }

        try {
            const user = await this.prisma.accountDibila.create({
                data: {
                    coins: 0,
                    userName: login,
                    password: userPass,
                    achievements: ['hello'],
                }
            });
            console.log(user);
            return user;
        } catch (error) {
            console.log(error);
        }        
    }
}

export default Auth;
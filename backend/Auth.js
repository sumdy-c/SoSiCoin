import { PrismaClient } from "@prisma/client";

class Auth {
    prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }
    
    async checkAuth(session) {
        console.log(session);
        if(!session.user) {
            return 'unauth';
        }
    }

    async auth(name, pass) {
        if(!this.prisma){
            console.log('нет призмы');
            return;
        }

        try {
            const [ user ] = await this.prisma.accountDibila.findMany({
                where: {
                    userName: name
                }
            });

            if(user.password === pass) {
                return user;
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
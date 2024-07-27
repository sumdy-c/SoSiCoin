FROM node:18-alpine3.18 as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start" ]
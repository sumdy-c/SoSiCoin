FROM node:18-alpine3.18 as development

WORKDIR /app

COPY ./ /app/

RUN npm i
RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start" ]
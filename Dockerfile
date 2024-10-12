
FROM node:22.7.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["sh", "-c", "npm run typeorm:run && npm run dev"]

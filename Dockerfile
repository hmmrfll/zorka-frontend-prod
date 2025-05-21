FROM node:alpine as build

# Устанавливаем зависимости для компиляции canvas
RUN apk add --no-cache python3 make g++ pkgconfig pixman-dev cairo-dev pango-dev libjpeg-turbo-dev giflib-dev

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "dev"]
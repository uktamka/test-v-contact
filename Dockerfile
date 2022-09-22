FROM node:14.19.0 AS builder
WORKDIR /app
COPY package*json /app/
RUN npm ci

COPY . /app
RUN npm run build:spa

FROM nginx
RUN mkdir /app
COPY --from=builder /app/dist/spa /app
COPY nginx.conf /etc/nginx/nginx.conf


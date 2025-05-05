# Dockerfile для React-Vite клиента
FROM node:20-alpine as build

WORKDIR usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Установим NODE_ENV и VITE_API_URL, если нужно
ENV NODE_ENV=production

# Собираем приложение
RUN npm run build

# Контейнер для production
FROM nginx:alpine

# Копируем собранное приложение из stage "build"
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Копируем кастомную конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposing port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
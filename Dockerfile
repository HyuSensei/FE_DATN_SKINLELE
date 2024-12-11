FROM node:18-alpine

WORKDIR /app

# Cài đặt các dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Copy source code
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
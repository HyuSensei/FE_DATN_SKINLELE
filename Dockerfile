# Sử dụng image Node.js Alpine làm base image
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React với Vite
RUN npm run build

# Mở cổng 3000 để phục vụ ứng dụng
EXPOSE 8000

# Chạy Vite để phục vụ ứng dụng
CMD ["npm", "run", "dev"]

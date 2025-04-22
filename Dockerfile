FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (hoặc yarn.lock nếu dùng Yarn)
COPY package*.json ./

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Cài đặt các dependencies
RUN npm install

# Sao chép các file build từ container build sang thư mục nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Cài đặt Vite để phục vụ ứng dụng trong môi trường phát triển
EXPOSE 8000

# Chạy Vite để phục vụ ứng dụng
CMD ["npm", "run", "dev"]
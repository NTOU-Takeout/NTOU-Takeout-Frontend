FROM node:20

# 設置工作目錄
WORKDIR /app

# 複製當前目錄的內容到容器中
COPY ../ .

# 安裝依賴
RUN npm install

# 啟動應用
CMD ["npm", "run", "dev"]

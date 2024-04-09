# 使用 Node.js 官方映像作為構建環境
FROM node:14

# 設定工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝應用依賴
RUN npm install

# 複製應用源碼
COPY . .

# 應用綁定的端口
EXPOSE 3000

# 定義容器啟動時執行的命令
CMD ["npm", "start"]

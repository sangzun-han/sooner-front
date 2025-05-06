FROM node:20-alpine

# 작업 디렉토리
WORKDIR /app

# 의존성 복사
COPY package.json yarn.lock ./
RUN yarn install

# 나머지 소스 복사
COPY . .

# 빌드
RUN yarn build

CMD ["yarn", "start"]

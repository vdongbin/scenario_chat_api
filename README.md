# scenario_chat_api

## About

시나리오 기반의 API 서버입니다.

## Basic Setup

설치 과정은 차례에 맞게 진행되어야 합니다.

1. 패키지들을 설치합니다.

```bash
npm install
```

2. config/config.json 파일의 username과 password를 알맞게 수정합니다.

```bash
  "development": {
    "username": "YOUR_DATABASE_USERNAME",
    "password": "YOUR_DATABASE_PASSWORD",
    "database": "scenario_chatbot_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  }
```

3. sequelize cli를 사용하여, 데이터베이스를 생성합니다.

```bash
sequelize db:create
```

오류가 발생한다면, `node_modules/.bin/sequelize db:create` 를 사용하세요.

4. sequelize seeder를 활용하여, 데이터베이스에 가짜 데이터를 생성합니다.

```bash
sequelize db:seed:all
```

오류가 발생한다면, `node_modules/.bin/sequelize db:seed:all` 를 사용하세요.

## Start server

```bash
npm start
```

Basic Setup을 마친 이후에 서버 시작을 해야합니다.

오류가 발생한다면, `node_modules/.bin/nodemon app` 를 사용하세요.

## Test

```bash
npm test
```

마찬가지로, Basic Setup을 마친 이후에 API 테스트를 해야합니다.

오류가 발생한다면, `node_modules/.bin/mocha test` 를 사용하세요.

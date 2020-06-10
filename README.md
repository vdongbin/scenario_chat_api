# scenario_chat_api

## About

시나리오 기반의 API 서버입니다.

## Basic Setup

1. 패키지들을 설치합니다.

```bash
npm install
```

2. sequelize cli를 사용하여, 데이터베이스를 생성합니다.

```bash
sequelize db:create
```

오류가 발생한다면, `node_modules/.bin/sequelize db:create` 를 사용하세요.

3. sequelize seeder를 활용하여, 데이터베이스에 가짜 데이터를 생성합니다.

```bash
sequelize db:seed:all
```

오류가 발생한다면, `node_modules/.bin/sequelize db:seed:all` 를 사용하세요.

## Start server

```bash
npm start
```

## Test

```bash
npm test
```

오류가 발생한다면, `node_modules/.bin/mocha test` 를 사용하세요.

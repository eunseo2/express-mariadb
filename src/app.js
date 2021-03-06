const express = require('express');
const cookieParser = require('cookie-parser');

const { consumeToken, errorHandler } = require('middleware');
const imagesDir = require('lib/images-dir');

const routes = require('./routes');
const missingPath = require('./middleware/missing-path');

// express를 이용한 서버 구현
const app = express();

app.use(cookieParser()); // res.cookie 이용하기 위해
app.use(express.json({ limit: '30mb' })); // res.body 이용하기 위해 body의 크기 설정
app.use('/images', express.static(imagesDir));

app.use(consumeToken);

app.use('/', routes);
app.use(missingPath);
app.use(errorHandler);

module.exports = app;

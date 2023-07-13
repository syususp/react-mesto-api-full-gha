const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../constants/errorStatuses');

const { NODE_ENV, JWT_SECRET } = process.env;


let postmanTKN = {
  'content-type': 'application/json',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGIwNTBlOGUxOTEzNGJhMDBhOGMzYTEiLCJpYXQiOjE2ODkyNzkwNTQsImV4cCI6MTY4OTg4Mzg1NH0.IngraOzLYVm8hnDvTZZ7kzz0MUNaSid3lU1mBiSBy1k',
  'user-agent': 'PostmanRuntime/7.32.3',
  accept: '*/*',
  'postman-token': 'b01b1323-451b-44e7-a8d7-3f612d33520a',
  host: 'localhost:3000',
  'accept-encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  'content-length': '43'
};

let webTKN ={
  host: 'localhost:3000',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0',
  accept: '*/*',
  'accept-language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
  'accept-encoding': 'gzip, deflate, br',
  referer: 'http://localhost:3001/',
  origin: 'http://localhost:3001',
  connection: 'keep-alive',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'if-none-match': 'W/"df-gueo3xvg6pZT425XkPeRQAF2+EY"'
}

const auth = (req, res, next) => {
  const tokenString = req.headers.cookie || req.headers.authorization;
  let token;
  console.log(req.headers);
  console.log('tokenstring', tokenString);
  if (!tokenString) {
    return res.status(UNAUTHORIZED).json({ message: `Ошибка авторизации: ${tokenString}` });
  }

  if (tokenString.startsWith('token=')) {
    token = tokenString.replace('token=', '');
  }

  if (tokenString.startsWith('Bearer ')) {
    token = tokenString.replace('Bearer ', '');
  }
  console.log('token before verify', token);
  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key');
    req.user = payload;
    console.log('req.user or payload', req.user);
    return next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: `Ошибка авторизации: ${error}` });
  }
};

module.exports = auth;

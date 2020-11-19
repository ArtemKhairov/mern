const jwt = require('jsonwebtoken');
const secret = require('../secretJWT');

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }

  try {
    // получение токена авторизации
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    
    // проверка на наличие токена
    if (!token) {
      return res.status(401).json({message:'Нет авторизации '})
    }

    // раскодировка токена
    const decoded = jwt.verify(token, secret.secret)
    req.user = decoded
    next()

  } catch (e) {
    res.status(401).json({message:'Нет авторизации,пункт  ошибка'})
  }

}
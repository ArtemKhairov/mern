var express = require('express');
var AuthRouter = express.Router();
var User = require('../models/User');
var bcrypt = require('bcryptjs');
var { check, validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
var secret = require('../secretJWT');


AuthRouter.post(
  "/register",
  [
    check('email', 'Некорректный email').isEmail(),
    check('password','Минимальная длина пароля 5 символов').isLength({min:5})
  ],
  async (req, res) => {
    try {
      
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message:"Некорректные данные"
        })
      }
      
      const { email, password } = req.body;

      // Проверка на email
      const candidate = await User.findOne({ email: email })

      // Вернём статус 400 если пользователь уже существует
      if (candidate) {
      return res.status(400).json({message:"Такой пользователь уже существует"})
      }

      //Шифруем пароль 
      const hashedPassword = await bcrypt.hash(password, 12);

      // Создаём нового пользователя
      const user = new User({ email: email, password: hashedPassword });

      // Ждём его создания
      await user.save();

      // Отправляем сообщение
      res.status(201).json({message:"Пользователь создан"})

    } catch (e) {
      console.log(e)
      res.status(500).json({message:'Что-то пошло не так,вы получили сообщение об ошибке'})
    }

  }
)


AuthRouter.post(
  "/login",
  [
    check('email', 'Нужно ввести почту').normalizeEmail().isEmail(),
    check('password','Нужно ввести пароль').exists()
  ],
  async (req, res) => {
    try {
      
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message:"Некорректные данные"
        })
      }

      const { email, password } = req.body
      
      // Ищем пользователя
      const user = await User.findOne({ email: email })
      if (!user) {
        return res.status(400).json({
          message:'Такого пользователя не существует'
        })
      }
      
      // Сравниваем пароли
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          message:'Неверный пароль'
        })
      }
      console.log(isMatch)
      // Передаем токен 
      const token = jwt.sign(
        { userId: user.id },
        secret.secret,
        console.log(secret.secret),
        {expiresIn:'3h'}
      )

      res.json({ token, userId: user.id })
      

    } catch (e) {
      console.log(e.message)
      res.status(500).json({message:'Что-то пошло не так,вы получили сообщение об ошибке'})
    }
  
})

module.exports = AuthRouter;
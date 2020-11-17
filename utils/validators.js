const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
  body('email')
      .isEmail()
      .withMessage('Введите коректний емейл')
      .custom(async (value, {req}) => {
        try {
          const user = await User.findOne({email: value})

          if (user) {
            return Promise.reject('Такой емейл уже занят')
          }
        } catch (e) {
          console.log(e)
        }
      })
      .normalizeEmail(),
  body('password', 'Пароль должен бить минимум 6 символов')
      .isLength({min: 6, max: 56})
      .isAlphanumeric()
      .trim(),
  body('confirm')
      .custom((value, {req}) => {
        if (req.body.password !== value) {
          throw new Error('Пароли должни совпадать')
        }
        return true
      })
      .trim(),
  body('name')
      .isLength({min: 3})
      .withMessage('Имя должно бить минимум 3 символа')
      .trim()

]

exports.loginValidators = [
  body('email')
      .isEmail()
      .withMessage('Неверний емейл')
      .normalizeEmail(),
  body('password', 'Неверний пароль')
      .isLength({min: 6, max: 56})
      .isAlphanumeric()
      .trim(),
]

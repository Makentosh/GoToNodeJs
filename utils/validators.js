const {body} = require('express-validator')

exports.registerValidators = [
  body('email').isEmail().withMessage('Введите коректний емейл'),
  body('password', 'Пароль должен бить минимум 6 символов').isLength({min: 6, max: 56}).isAlphanumeric(),
  body('confirm').custom((value, {req}) => {
    if(req.body.password !== value) {
      throw new Error('Пароли должни совпадать')
    }
    return true
  }),
  body('name').isLength({min: 3}).withMessage('Имя должно бить минимум 3 символа')

]

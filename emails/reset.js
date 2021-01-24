const {EMAIL_FROM, BASE_URL} = require('../keys/index')

module.exports = function (email, token) {
  return {
    from: EMAIL_FROM,
    to: email,
    subject: 'Восстановление доступа',
    text: 'Привет',
    html: `
      <h1>Ви забили пароль ?</h1>
      <p>Если нет, то проигнорируйте данное письмо</p>
      <p>Иначе нажмите на ссилку ниже:</p>
      <hr/>
      <a href="${BASE_URL}/auth/password/${token}">Восстановить доступ</a>
    `
  }
}

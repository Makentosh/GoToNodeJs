const {EMAIL_FROM, BASE_URL} = require('../keys/index')

module.exports = function (email, from, html, subject) {
  return {
    from: EMAIL_FROM,
    to: email,
    subject: 'Аккаунт создан',
    text: 'Спасибо за регистрацию',
    html: `
      <h1>Добро пожаловать в наш магазин</h1>
      <p>Ви успешно создали аккаунт ${email}</p>
      <hr/>
      <a href="${BASE_URL}">Магазин курсов</a>
    `
  }
}

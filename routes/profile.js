const {Router} = require('express')
const auth = require('../middlewaer/auth')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    res.render('profile', {
      title: 'Профиль',
      isProfile: true,
      user: req.user.toObject()
    })

  } catch (e) {
    console.log(e)
  }

})

router.post('/', async(req, res) => {
  try {

  } catch (e) {

  }
})


module.exports = router

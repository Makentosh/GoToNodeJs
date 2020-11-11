const {Router} = require('express')
const User = require('../models/user')
const mongoose = require('mongoose')
const router = Router()

router.get('/login', async (req, res) => {

  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true
  })
})

router.post('/login', async (req, res) => {
  let _id = new mongoose.Types.ObjectId('5fa41913a017e55960b09f38');
  let user = await User.findById(_id)
  req.session.user = user
  req.session.isAuthenticated = true
  req.session.save(err => {
    if(err) {
      throw err
    }
    res.redirect('/')
  })
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})


module.exports = router

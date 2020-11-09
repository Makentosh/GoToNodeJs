const { Router } = require('express')
const router = Router()
const Order = require('../models/order')

router.get('/', (req, res) => {
  res.render('orders', {
    title: 'Закази',
    isOrders: true
  })
})

router.post('/', async (req, res) => {


  res.redirect('/orders')
})

module.exports = router

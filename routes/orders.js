const {Router} = require('express')
const auth = require('../middlewaer/auth')
const router = Router()
const Order = require('../models/order')

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({'user.userId': req.user._id}).lean().populate('user.userId')

    res.render('orders', {
      title: 'Закази',
      isOrders: true,
      orders: orders.map(o => ({
        ...o, price: o.courses
            .reduce((total, c) => {
              return total += c.count * c.course.price
            }, 0)
      }))
    })

  } catch (e) {
    console.log(e)
  }

})

router.post('/', auth, async (req, res) => {

  try {
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate()

    const courses = user.cart.items.map(i => ({count: i.count, course: {...i.courseId._doc}}))

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user._id
      },
      courses: courses
    })

    await order.save()
    await req.user.clearCart()

    res.redirect('/orders')

  } catch (e) {
    console.log(e)
  }

})

module.exports = router

const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const path = require('path')
const app = express()
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const User = require('./models/user')
const varMiddelware = require('./middlewaer/variables')
const userMiddelware = require('./middlewaer/user')

const password = 'IezImG4Cp34XpZbg'
const MONGODB_URL = `mongodb+srv://vasylbatig:${password}@cluster0.oslcz.mongodb.net/shop?&w=majority`
const PORT = process.env.PORT || 9000


//configuration handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URL,
})



//register express engine from handlebars
app.engine('hbs', hbs.engine)
//registration handlebars to express from name = hbs
app.set('view engine', 'hbs')
//set default views folder
app.set('views', 'views')


//set express statis folder to css & js files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

//configure session

app.use(session({
  secret: 'some secret code',
  resave: false,
  saveUninitialized: false,
  store,
}))


//add middleware
app.use(varMiddelware)
app.use(userMiddelware)

//routes to page
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)



async function start() {
  try {
    await mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })

    //start express server
    app.listen(PORT, () => {})
  } catch (e) {
    console.log(e)
  }

}

start()







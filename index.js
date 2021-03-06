const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const path = require('path')
const app = express()
const csrf = require('csurf')
const flash = require('connect-flash')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const prfileRoutes = require('./routes/profile')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const varMiddelware = require('./middlewaer/variables')
const userMiddelware = require('./middlewaer/user')
const errorMiddelware = require('./middlewaer/error')
const fileMiddelware = require('./middlewaer/file')
const {MONGODB_URL, SESSION_SECRET}  = require('./keys/index')

const PORT = process.env.PORT || 9000


//configuration handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: require('./utils/hbs-helpers')
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
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended: true}))

//configure session

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
}))


//uploadfile
app.use(fileMiddelware.single('avatar'))

//add middleware
app.use(csrf())
app.use(flash())
app.use(helmet())
app.use(compression())
app.use(varMiddelware)
app.use(userMiddelware)


//routes to page
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)
app.use('/profile', prfileRoutes)

//404 middelware
app.use(errorMiddelware)



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







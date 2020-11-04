const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const mongoose = require('mongoose')

//configuration handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
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
//routes to page
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)

const password = 'IezImG4Cp34XpZbg'
const url = `mongodb+srv://vasylbatig:${password}@cluster0.oslcz.mongodb.net/shop?&w=majority`
const PORT = process.env.PORT || 3000

async function start() {
  try {
    await mongoose.connect(url, {useNewUrlParser: true})
    //start express server
    app.listen(PORT, () => {})
  } catch (e) {
    console.log(e)
  }

}

start()







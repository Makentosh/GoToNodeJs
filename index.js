const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')

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
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
//routes to page
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)


const PORT = process.env.PORT || 3000

//start express server
app.listen(PORT, () => {})

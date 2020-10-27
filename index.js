const express = require('express')
const exphbs = require('express-handlebars')
const app = express()


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



//routes to page

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about')
})

const PORT = process.env.PORT || 3000

//start express server
app.listen(PORT, () => {

})

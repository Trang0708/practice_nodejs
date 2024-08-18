const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const expHandelbars = require('express-handlebars')

//import img files
app.use(express.static(path.join(__dirname,'/public')))

//Template engine
app.engine('hbs',expHandelbars.engine({
  extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/',pageRender('home'))
app.get('/about',pageRender('about'))

//render pages
function pageRender (page){
    console.log(`Rendering: `+ page)
    let renderPage = (req,res) => {
      res.render(page)
    }
    return renderPage
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
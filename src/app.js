import express from 'express'
const app = express()
const port = 3000
import expHandelbars from 'express-handlebars'

import {UserRouters} from './Routes/index.js'

//import static files or folders
app.use(express.static("./src/public"))

//Template engine
app.engine('hbs',expHandelbars.engine({
  extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.set('views', './src/resources/views');

app.get('/',pageRender('home'))
app.get('/about',pageRender('about'))
app.use('/users',UserRouters)

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
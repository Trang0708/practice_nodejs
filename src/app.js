/*IMPORT LIBRARY AND MIDDELWARE*/
import express from 'express'
import expHandelbars from 'express-handlebars'
//import router
import {
  UserRouters,
  ProductRouters
} from './Routes/index.js'
//enviroment config
import * as dotenv from 'dotenv'
dotenv.config()
//import database connection
import connect from './Database/database.js'


const app = express()
const PORT = process.env.PORT || 3000

/*APP SETTING AND CONFIGURATION*/
//Config static files or folders
app.use(express.static("./src/public"))
//Template engine
app.engine('hbs',expHandelbars.engine({
  extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.set('views', './src/resources/views');
//Config app to read json data
app.use(express.json())

/*ROUTERS*/
app.get('/',pageRender('home'))
app.get('/about',pageRender('about'))
app.use('/users',UserRouters)
app.use('/products',ProductRouters)

/*FUNCTIONS*/
//render pages
function pageRender (page){
    console.log(`Rendering: `+ page)
    let renderPage = (req,res) => {
      res.render(page)
    }
    return renderPage
}


app.listen(PORT, async() => {
  await connect()
  console.log(`Example app listening on port ${PORT}`)
})
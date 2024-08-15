const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const expHandelbars = require('express-handlebars')

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Template engine
app.engine('handlebars',expHandelbars.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/',homeRenders)

//seperated functions
//render home handlebars
function homeRenders (req,res,next){
    console.log(`Rendering home.handlebars`)
    return res.render('home')
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
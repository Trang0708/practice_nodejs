const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.get('/',helloWorld)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function helloWorld (req,res){
    console.log(`Example app listening on port ${port}`)
    return res.send('Hello world')
}
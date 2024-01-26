const express = require('express')
const port = 3000
const app = express()
const mainRouter = require('./router/mainRouter')

app.use('/',mainRouter)
app.listen(port,()=>
{
    console.log(`Server is running on port ${port}`)
})
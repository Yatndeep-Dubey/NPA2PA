const express = require('express')
const port = 3000
const app = express()
const database = require('./database/connection')
const mainRouter = require('./router/mainRouter')

app.use('/',mainRouter)

app.listen(port,()=>
{
    database.databaseConnection();
    console.log(`Server is running on port ${port}`)
})

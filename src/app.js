// @ts-check

// const { default: bodyParser } = require('body-parser')
const express = require('express')

const app = express()
const userRouter = require('./routers/user')

app.use(express.json())
app.set('views', 'src/views')
app.set('view engine', 'pug')

app.use('/users', userRouter)
app.use('/public', express.static('src/public'))

// @ts-ignore
//error handler middle ware
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

//middlewareをasyncでするときは必ずtry,catchでする
module.exports = app

// @ts-check

// const { default: bodyParser } = require('body-parser')
const express = require('express')

const app = express()

const userRouter = require('./routers/user')

const PORT = 5000

app.use(express.json())
app.set('views', 'src/views')
app.set('view engine', 'pug')

app.use('/users', userRouter)
app.use('/public', express.static('src/public'))

// @ts-ignore
//error handler middleware
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

app.listen(PORT, () => {
  console.log(`The express server is listening at port: ${PORT}`)
})

// @ts-check

const express = require('express')

const app = express()

const PORT = 5000
app.use('/', (req, res, next) => {
  console.log('middleware 1')
  const requestAt = new Date()
  // @ts-ignore
  req.requestAt = requestAt
  next()
})

app.use((req, res) => {
  console.log('Middleware2')
  // @ts-ignore
  res.send(`Hello, express Requested at ${req.requestAt}`)
})

app.listen(PORT, () => {
  console.log(`The express server is listening at port: ${PORT}`)
})

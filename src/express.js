// @ts-check

// const { default: bodyParser } = require('body-parser')
const express = require('express')

const app = express()

const userRouter = express.Router()

const PORT = 5000

app.use(express.json())
app.use('/public', express.static('src/public'))
app.set('views', 'src/views')
app.set('view engine', 'pug')

userRouter.get('/', (req, res) => {
  console.log('user list')
  res.send(`user list`)
})
const USER = {
  15: {
    nickname: 'foo',
  },
  16: {
    nickname: 'var',
  },
}
userRouter.param('id', (req, res, next, value) => {
  console.log(`id parameter`, value)
  // @ts-ignore
  req.user = USER[value]
  next()
})
userRouter.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      //@ts-ignore
      nickname: req.user.nickname,
    })
  }
})

userRouter.post('/:id/nickname', (req, res) => {
  //Register user
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`user nickname updated : ${nickname}`)
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`The express server is listening at port: ${PORT}`)
})

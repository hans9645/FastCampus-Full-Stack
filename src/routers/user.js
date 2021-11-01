// @ts-check

// const { default: bodyParser } = require('body-parser')
const express = require('express')

const app = express()

const router = express.Router()

const USERS = {
  15: {
    nickname: 'foo',
  },
  16: {
    nickname: 'var',
  },
}

router.get('/', (req, res) => {
  console.log('user list')
  res.send(`user list`)
})

router.param('id', async (req, res, next, value) => {
  try {
    // @ts-ignore
    const user = USERS[value]

    if (!user) {
      const err = new Error('User not found')
      // @ts-ignore
      err.statusCode = 404
      throw err
    }
    // @ts-ignore
    req.user = USER[value]
    next()
  } catch (err) {
    next(err)
  }
})
router.get('/:id', (req, res) => {
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

router.post('/:id/nickname', (req, res) => {
  //Register user
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`user nickname updated : ${nickname}`)
})

module.exports = router

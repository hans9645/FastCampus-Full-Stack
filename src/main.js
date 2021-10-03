// @ts-check
// Formating,Lingting
// Formating: prettier
// Linting: ESLint
// Type checking: TypeScript

// eslint 끄는 주문
/* eslint-disable-next-line */
/* eslint-disable-next-line no-console*/

const http = require('http')
const { routes } = require('./api')

/**
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method == req.method
    )

    if (!req.url || !route) {
      res.statusCode = 404
      res.end('Not found')
      return
    }

    const regexResult = route.url.exec(req.url)

    if (!regexResult) {
      res.statusCode = 404
      res.end('Not found')
      return
    }

    /** @type {Object.<string,*> | undefined} */
    const reqbody =
      (req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve, reject) => {
          req.setEncoding('utf-8')
          req.on('data', (data) => {
            try {
              resolve(JSON.parse(data))
            } catch {
              reject(new Error('Ill-fromed json'))
            }
          })
        }))) ||
      undefined

    console.log(reqbody)

    const result = await route.callback(regexResult, reqbody)
    res.statusCode = result.statusCode

    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(result.body))
    }
  }

  main()
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`The Server is listening at PORT: ${PORT}.`)
})

//if(!cities.find((city)=> person.city ===  city))

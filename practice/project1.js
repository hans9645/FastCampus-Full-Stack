//@ts-check

/**
 *  @typedef Character
 *  @property {string} slug
 */

/**
 * @typedef House
 * @property {string} slug
 * @property {Character[]} members
 */

const https = require('https')

const GOTAPI_PREFIX = 'https://game-of-thrones-quotes.herokuapp.com/v1'

/**
 * @param {string} url
 * @returns { Promise<*> }
 */
async function getHttpsJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let jsonStr = ''
      res.setEncoding('utf-8')
      res.on('data', (data) => {
        jsonStr += data
      })
      res.on('end', () => {
        try {
          const parsed = JSON.parse(jsonStr)
          resolve(parsed)
        } catch {
          reject(new Error('The server response is not valid JSON document.'))
        }
      })
    })
  })
}

/** @returns {Promise<House[]>} */
async function getHouse() {
  //가문들의 정보를 받아오는 코드
  return getHttpsJson(`${GOTAPI_PREFIX}/houses`)
}

// 'sanitize'는 들어가서는 안되는 문자열을 걸러내는 함수명으로 자주 사용됨.
/**
 * @param {string} quote
 * @returns {string}
 */
function sanitizeQuote(quote) {
  return quote.replace(/[^a-zA-Z0-9,.]/g, ' ')
}

/**
 *
 * @param {string} slug
 * @returns {Promise<string>}
 */
async function getMergedQuotesOfCharacter(slug) {
  const character = await getHttpsJson(`${GOTAPI_PREFIX}/character/${slug}`)
  return sanitizeQuote(character[0].quotes.join(' '))
}

async function main() {
  const houses = await getHouse()

  const result = await Promise.all(
    houses
      .map((house) =>
        house.members.map((member) => ({
          house: house.slug,
          member: member.slug,
          quote: getMergedQuotesOfCharacter(member.slug),
        }))
      )
      .flat()
  )

  console.log(result)
}

main()

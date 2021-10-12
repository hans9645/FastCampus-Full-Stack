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

/** @returns {Promise<House[]>} */
async function getHouse() {
  //가문들의 정보를 받아오는 코드
  return new Promise((resolve) => {
    https.get(`${GOTAPI_PREFIX}/houses`, (res) => {
      let jsonStr = ''
      res.setEncoding('utf-8')
      res.on('data', (data) => {
        jsonStr += data
      })
      res.on('end', () => {
        resolve(JSON.parse(jsonStr))
      })
    })
  })
}

/**
 *
 * @param {string} slug
 * @returns {Promise<string>}
 */
async function getMergedQuotesOfCharacter(slug) {
  return new Promise((resolve) => {
    https.get(`${GOTAPI_PREFIX}/character/${slug}`, (res) => {
      let jsonStr = ''
      res.setEncoding('utf-8')
      res.on('data', (data) => {
        jsonStr += data
      })
      res.on('end', () => {
        const json = JSON.parse(jsonStr)
        const mergedQuotes = json[0].quotes
          .join(' ')
          .replace(/[^a-zA-Z0-9]/g, ' ')
        resolve(mergedQuotes)
      })
    })
  })
}

async function main() {
  const houses = await getHouse()
  houses.forEach((house) => {
    house.members.forEach((member) => {
      getMergedQuotesOfCharacter(member.slug).then((quotes) => {
        console.log(house.slug, member.slug, quotes, '\n')
      })
    })
  })
  //console.log(houses)
}

main()

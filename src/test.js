// @ts-check

const fs = require('fs')

fs.readFile('src/test.js', 'utf-8', (err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})
// 위에는 비동기

const results = fs.readFileSync('src/test.js', 'utf-8')
console.log(results)

//동기 처리

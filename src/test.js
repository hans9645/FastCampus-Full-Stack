// @ts-check

const fs = require('fs')

fs.readFile('src/test.js', 'utf-8', (err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})

// @ts-check

const fs = require('fs')

const FILENAME = 'src/test.js'
//call-back style
fs.readFile(FILENAME, 'utf-8', (err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})

// async function t1(){
//     await fs.readFile(FILENAME, 'utf-8', (err, result) => {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(result)
//       }
//     })
// }-> 연습으로 해봄 실제로 이건 비효율적이라서 안하겠지만

// sync style
const results = fs.readFileSync(FILENAME, 'utf-8')
console.log(results)

//동기 처리

// promise style
async function main() {
  const result = await fs.promises.readFile(FILENAME, 'utf-8')
  console.log(result)
}

main()

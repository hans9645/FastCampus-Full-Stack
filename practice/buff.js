//@ts-check

// const bufA = Buffer.from([0])
// const bufB = Buffer.from([3])
// const bufC = Buffer.from([2])
// const bufD = Buffer.from([6])

// const buf = [bufA, bufB, bufC, bufD]

// const result = buf.sort(Buffer.compare)
// console.log(result)

// process.stdin.setEncoding('utf-8')
// process.stdin.on('data', (data) => {
//   console.log(data, data.length)
// })

// process.stdin.pipe(process.stdout)

// console.log(process.argv)
//명령줄 인자를 파싱해서 출력시킨다.

// const dns = require('dns')

// dns.lookup('google.com', (err, address, family) => {
//   console.log('address %j family IPv%s', address, family)
// })

// const os = require('os')
// console.log(
//   ['arch', os.arch()],
//   ['freeman', os.freemem()],
//   ['platform', os.platform()],
//   ['cpus', os.cpus()]
// )

const path = require('path')
const fs = require('fs')

const filepath = path.resolve(__dirname, './test.js')
console.log('filepath', filepath)

const filecontent = fs.readFileSync(filepath, 'utf-8')
console.log(filecontent)

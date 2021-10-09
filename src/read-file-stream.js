//@ts-check

const { log } = console
const fs = require('fs')
const rs = fs.createReadStream('local/big-file', { encoding: 'utf-8' })

let chunkcount = 0

rs.on('data', (data) => {
  log('Event: data', data[0])
  chunkcount += 1
})

rs.on('end', () => {
  log('Event: end')
  log('chunkCount', chunkcount)
})

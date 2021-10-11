//@ts-check
//chunk의 크기에 따라(highwatermark 크기 설정으로 인해) 잘못 잘리게 되었을 때 처리하는 방법에대해서 배우는 장.
const { log } = console

const fs = require('fs')
const { type } = require('os')

const rs = fs.createReadStream('local/jsons', {
  encoding: 'utf-8',
  highWaterMark: 6,
})

let totalsum = 0

let accumulatedJsonStr = ''

rs.on('data', (chunk) => {
  log('Event: data', chunk)

  if (typeof chunk !== 'string') {
    return
  }

  totalsum += chunk
    .split('\n')
    .map((jsonline) => {
      try {
        return JSON.parse(jsonline)
      } catch {
        return undefined
      }
    })
    .filter((json) => json)
    .map((json) => json.data)
    .reduce((sum, curr) => sum + curr, 0)
})

rs.on('end', () => {
  log('Event: end')
  log('totalsum', totalsum)
})

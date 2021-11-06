//@ts-check
//chunk의 크기에 따라(highwatermark 크기 설정으로 인해) 잘못 잘리게 되었을 때 처리하는 방법에대해서 배우는 장.
const { log } = console

const fs = require('fs')
const { type } = require('os')
const { HighlightSpanKind } = require('typescript')

/**@param {number} highWaterMark*/
function processJson(highWaterMark) {
  const rs = fs.createReadStream('local/jsons', {
    encoding: 'utf-8',
    highWaterMark,
  })

  let totalsum = 0

  let accumulatedJsonStr = ''

  rs.on('data', (chunk) => {
    log('Event: data', chunk)

    if (typeof chunk !== 'string') {
      return
    }

    accumulatedJsonStr += chunk
    const lastNewlineIdx = accumulatedJsonStr.lastIndexOf('\n')
    const jsonLinesStr = accumulatedJsonStr.substring(0, lastNewlineIdx) // \n을 포함한 line들
    accumulatedJsonStr = accumulatedJsonStr.substring(lastNewlineIdx) // 남은 뒷부분

    totalsum += jsonLinesStr
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
}

// highWaterMark가 어떠한 크기에도 잘 작동하는지 테스트 하기 위해
for (let watermark = 1; watermark < 50; watermark++) {
  processJson(watermark)
}

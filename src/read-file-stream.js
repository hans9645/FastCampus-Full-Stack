//@ts-check

// aaaaaaabbbbbbbbbbbaaaabbbbbaaaaaaaaaabb 와  같은
// 위와 같은 파일에서 a의 연속구간(a block)의 갯수와, b의 연속 구간 갯수를 세는 프로그램을 stream을 통해 만들어보자.

const { log } = console
const fs = require('fs')
const rs = fs.createReadStream('local/big-file', {
  encoding: 'utf-8',
  highWaterMark: 65536 * 4, //램에 한번에 넣는 chunks의 갯수를 말한다. 기본은 65536개이다.
})

/**
 * @type {Object.<string,number>}
 */
const numBlocksPerCharacter = {
  a: 0,
  b: 0,
}
/**@type {string | undefined} */
let prevCharcter

let chunkcounts = 0

rs.on('data', (data) => {
  chunkcounts += 1
  if (typeof data !== 'string') {
    return
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== prevCharcter) {
      const newCharacter = data[i]

      prevCharcter = newCharacter
      numBlocksPerCharacter[newCharacter] += 1
    }
  }
})

rs.on('end', () => {
  log('Event: end')
  log('chunkcount', chunkcounts)
  log('Block Count', numBlocksPerCharacter)
})

//@ts-check
//stream으로 큰 파일 처리하기

// aaaaaaabbbbbbbbbbbaaaabbbbbaaaaaaaaaabb 와  같은
// 위와 같은 파일에서 a의 연속구간(a block)의 갯수와, b의 연속 구간 갯수를 세는 프로그램을 stream을 통해 만들어보자.

const fs = require('fs')

const ws = fs.createWriteStream('local/big-file')

const NUM_BLCOCKS = 500

/**
 * @type {Object.<string,number>}
 */
const numBlocksPerCharacter = {
  a: 0,
  b: 0,
}

for (let i = 0; i < NUM_BLCOCKS; i++) {
  const block_length = Math.floor(800 + Math.random() * 200)
  const character = i % 2 ? 'a' : 'b'
  ws.write(character.repeat(1024 * block_length))
  numBlocksPerCharacter[character] += 1
}

console.log(numBlocksPerCharacter)

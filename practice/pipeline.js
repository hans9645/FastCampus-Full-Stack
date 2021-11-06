//@ts-check

const { log, error } = console

const fs = require('fs')
const stream = require('stream')
const zlib = require('zlib')
const util = require('util') //util에는 promisify라는 함수가 있다. return값은 promise

async function gzip() {
  return util.promisify(stream.pipeline)(
    fs.createReadStream('local/big-file'),
    zlib.createGzip(),
    fs.createWriteStream('local/big-file.gz')
  )
}

async function gunzip() {
  return util.promisify(stream.pipeline)(
    fs.createReadStream('local/big-file.gz'),
    zlib.createGunzip(),
    fs.createWriteStream('local/big-file.unzipped')
  )
}

async function main() {
  await gzip()
  await gunzip()
}

main()

//참고 블로그 link https://medium.com/harrythegreat/node-promisify로-promise-쉽게-만들게-27e58a211cf2

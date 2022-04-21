import { Worker } from 'worker_threads'
import {
  PassThrough
} from 'stream'

const stream = new PassThrough()
const worker = new Worker('./worker.mjs')

worker.on('message', msg => {
  stream.write(msg)
})

worker.on('exit', code => {
  stream.end()
})

console.log('Start from main')


for await (const data of stream) {
  console.log({ data: data.toString() })
}

console.log('End from main')

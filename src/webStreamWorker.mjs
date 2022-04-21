import { Worker } from 'worker_threads'
import {
  TransformStream
} from 'stream/web'

const {writable, readable} = new TransformStream()
const writer = writable.getWriter()
const worker = new Worker('./worker.mjs')

worker.on('message', msg => {
  writer.write(msg)
})

worker.on('exit', code => {
  writer.releaseLock()
  writable.close()
})

console.log('Start from main')


for await (const data of readable) {
  console.log({ data })
}

console.log('End from main')

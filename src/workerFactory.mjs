import { Worker } from 'worker_threads'
import {
  PassThrough
} from 'stream'

import {
  TransformStream
} from 'stream/web'


export const webStreamFactory = ({fileName, workerData} ) => {
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const worker = new Worker(fileName, {
    workerData,
  })

  worker.on('message', msg => {
    writer.write(msg)
  })
  worker.on('error', err => {
    stream.abort(err)
  })
  worker.on('exit', code => {
    stream.end()
  })
  return stream.readable
}

export const streamFactory = ({fileName, workerData} ) => {
  const stream = new PassThrough()
  const worker = new Worker(fileName, {
    workerData,
  })

  worker.on('message', msg => {
    stream.write(msg)
  })
  worker.on('error', err => {
    stream.write(err)
  })
  worker.on('exit', code => {
    stream.end()
  })
  return stream
}

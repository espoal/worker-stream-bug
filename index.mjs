import { streamFactory } from './src/workerFactory.mjs'

const workerStream = streamFactory({
  fileName: './src/worker.mjs',
})

console.log('Start from main')


for await (const data of workerStream) {
  console.log({ data: data.toString() })
}

console.log('End from main')

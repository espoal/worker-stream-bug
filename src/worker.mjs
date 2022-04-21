import { parentPort } from 'worker_threads'
import {
  setInterval,
} from 'timers/promises'

console.log('Start from worker')

for await (const startTime of setInterval(200, Date.now())) {
  const now = Date.now();
  // parentPort.postMessage(now)
  parentPort.postMessage(now.toString())
  if ((now - startTime) > 1000) break
}

console.log('End from worker')

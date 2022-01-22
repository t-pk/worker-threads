import { parentPort, workerData, threadId } from 'worker_threads';
const { workers } = workerData;

~(async function () {
  console.log("start", threadId, Date.now());
  for (let i = 0; i < 1000000; ++i) {
    await sleep(1000 * Math.random()* i);
    parentPort.postMessage({threadId, index:i });
  }
  console.log("end", threadId, Date.now());
})();


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

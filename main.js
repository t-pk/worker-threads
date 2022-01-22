import { isMainThread, Worker } from 'worker_threads';
import logUpdate from 'log-update';
import * as os from 'os';
const cpuCount = os.cpus().length;
console.log(cpuCount);
const limit = 10000;
const threads = 4;
const namesPerThread = limit / threads;
const outputFile = `./output/data.txt`;
let names = [...Array(cpuCount)].fill(0);

console.time('dbsave');
if(isMainThread) {
  for (let i = 0; i < cpuCount; i++) {
    const port = new Worker('./worker.js', {
      workerData: {
        namesPerThread,
        outputFile,
      },
    });
    port.on('message', (data) => handleMessage(data, i));
    port.on('error', (e) => console.log(e));
    port.on('exit', (code) => console.log(`Exit code: ${code}`));
  }
  
}

function handleMessage(_, index) {
  names[index]++;
  logUpdate(names.map((status, i) => `Thread ${i}: ${status}`).join('\n'));
  const sum = names.reduce((partial_sum, a) => partial_sum + a, 0);
  if(sum === limit) {
    console.timeEnd("dbsave");
  }
}

setInterval(() => {
  console.log(names);
}, 1000);
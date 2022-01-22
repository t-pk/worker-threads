import { Worker } from 'worker_threads';

(async function () {
    const workers = [1,2,3,4].map((item) => runWorker({ workerData: { workers: item } })); // 4 threads/
    Promise.all(workers).then((res) => res);
})();

function runWorker(workerData) {
  return new Promise((resolve, reject) => {

    const worker = new Worker('./sample/child.js', workerData);
    worker.on('message', (msg) => console.log(msg));
    worker.on('error', () => resolve(0));
    worker.on('exit', (code) => resolve(0));
  });
}

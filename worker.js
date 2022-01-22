import { getRandomIndex } from './utils/index.js';
import { parentPort, workerData, threadId } from 'worker_threads';
import fs from 'fs-extra';

import * as firstName from './data/first_name.json';
import * as middleName from './data/middle_name.json';
import * as lastName from './data/last_name.json';

const { namesPerThread, outputFile } = workerData;


const run = async () => {
  console.log("start> ", threadId, new Date());
  for (let i = 0; i < namesPerThread; i++) {
    const data = [firstName, middleName, lastName].map(getRandomIndex).concat('\n').join(' ');
    await fs.appendFile(outputFile, data);
    parentPort.postMessage(data);
  }
  console.log("end> ", threadId, new Date());
}

run().catch(err => console.error(err))
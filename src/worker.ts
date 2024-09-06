import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'my-task-queue'
  });

  console.log('Worker is starting...');
  
  worker.run().catch((err) => {
    console.error("Error in worker: ", err);
    process.exit(1);
  });
}

run().catch((err) => {
  console.error("Error starting worker: ", err);
  process.exit(1);
});

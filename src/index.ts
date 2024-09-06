import { Connection, Client } from '@temporalio/client';
import { greetingWorkflow } from './workflows';

async function run() {
    console.log('Starting Temporal client...');
    
    let connection;
    let client;

    try {
        console.log('Attempting to connect to Temporal server...');
        connection = await Connection.connect();
        console.log('Connected to Temporal server successfully.');
        
        client = new Client({ connection });
        console.log('Temporal client created successfully.');

        console.log('Starting greetingWorkflow...');
        const greetingHandle = await client.workflow.start(greetingWorkflow, {
            args: ['World'],
            taskQueue: 'my-task-queue',
            workflowId: `greeting-workflow-${Date.now()}`,
        });
        console.log(`greetingWorkflow started. WorkflowId: ${greetingHandle.workflowId}`);

        console.log('Checking greetingWorkflow status...');
        const workflowStatus = await greetingHandle.describe();
        console.log('Workflow status:', workflowStatus.status);

        console.log('Waiting for greetingWorkflow result (with 30s timeout)...');
try {
  const greetingResult = await Promise.race([
    greetingHandle.result(),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Workflow timeout')), 30000))
  ]);
  console.log('Greeting Result:', greetingResult);
} catch (error) {
  if (error instanceof Error && error.message === 'Workflow timeout') {
    console.error('greetingWorkflow did not complete within 30 seconds');
    console.log('Terminating workflow due to timeout...');
    await greetingHandle.terminate('Timeout');
    console.log('Workflow terminated.');
  } else {
    console.error('Error while waiting for workflow result:', error);
  }
}
        // Similar pattern for mathWorkflow...

    } catch (error) {
        console.error('Error in Temporal client execution:', error);
        if (error instanceof Error) {
            console.error('Error stack:', error.stack);
        }
    } finally {
        if (connection) {
            console.log('Closing Temporal connection...');
            await connection.close();
            console.log('Temporal connection closed.');
        }
    }
}

run().then(() => {
    console.log('Client script completed successfully.');
}).catch((err) => {
    console.error('Unhandled error in run function:', err);
    if (err instanceof Error) {
        console.error('Error stack:', err.stack);
    }
}).finally(() => {
    console.log('Client script finished execution.');
    process.exit(0);
});
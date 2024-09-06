import { Connection, WorkflowClient } from "@temporalio/client";
import { addWorkflow, greetWorkflow } from "./workflows";

async function run() {

    const connection = await Connection.connect();

    const client = new WorkflowClient({ connection });


    const greetingResult = await client.execute(greetWorkflow, {
        taskQueue: 'new-task-queue',
        args: ['from Raj'],
        workflowId: 'greet-workflow-' + Date.now()
    })

    console.log(greetingResult);


    const addResult = await client.execute(addWorkflow, {
        taskQueue: 'new-task-queue',
        args: [5, 4],
        workflowId: 'add-workflow-' + Date.now()
    })

    console.log(addResult);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
})
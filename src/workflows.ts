import { proxyActivities } from "@temporalio/workflow";
import { log } from "@temporalio/workflow";
import type * as activities from "./activities";

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: "10 seconds",
});

export async function greetingWorkflow(name: string): Promise<string> {
  log.info(`Starting greeting workflow for: ${name}`);
  log.info('About to call greet activity');
  try {
    const greeting = await greet(name);
    log.info(`Greeting workflow completed with result: ${greeting}`);
    return greeting;
  } catch (error) {
    log.error('Error in greetingWorkflow:');
    throw error;
  }
}

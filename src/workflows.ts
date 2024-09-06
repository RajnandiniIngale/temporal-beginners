import { proxyActivities } from "@temporalio/workflow";

import * as activities from "./activities";

const { greet, add } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

export async function greetWorkflow(name: string): Promise<string> {
  const greeting = await greet(name);
  return greeting;
}

export async function addWorkflow(a: number, b: number): Promise<number> {
  const ans = await add(a, b);
  return ans;
}

import { CronJob } from "cron";

const handler = async () => {
  console.log("Hello, World!");
};

export const testCrone = new CronJob("* */30 * * * *", handler);

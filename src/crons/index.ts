import { removeOldPasswords } from "./remove-old-passwords.cron";
import { removeOldTokens } from "./remove-old-tokens.cron";
import { testCrone } from "./test.cron";

export const cronRunner = async () => {
  testCrone.start();
  removeOldTokens.start();
  removeOldPasswords.start();
};

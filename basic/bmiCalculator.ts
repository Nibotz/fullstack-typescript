import { ParseArgumentsToNumbers } from './utils';
import { calculateBmi } from './webBmi';

try {
  const [height, weight] = ParseArgumentsToNumbers(2, process.argv.slice(2));
  const status = calculateBmi(height, weight);
  console.log(status);
} catch (error: unknown) {
  let message = 'error: ';
  if (error instanceof Error) {
    message += error.message;
  }
  console.error(message);
}

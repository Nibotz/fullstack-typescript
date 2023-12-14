import { ParseArgumentsToNumbers } from './utils';
import { calculateExercises } from './webExercises';

try {
  const [targetHours, ...exerciseHours] = ParseArgumentsToNumbers(
    2,
    process.argv.slice(2)
  );
  const exerciseInfo = calculateExercises(targetHours, exerciseHours);
  console.log(exerciseInfo);
} catch (error) {
  let message = 'error: ';
  if (error instanceof Error) {
    message += error.message;
  }
  console.error(message);
}

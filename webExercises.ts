interface ExerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  targetHours: number,
  exerciseHours: number[]
): ExerciseInfo => {
  const trainingDays = exerciseHours.reduce(
    (days, n) => (n !== 0 ? days + 1 : days),
    0
  );
  const avarageHours =
    exerciseHours.reduce((sum, n) => sum + n, 0) / exerciseHours.length;

  const rating =
    avarageHours >= targetHours ? 3 : avarageHours >= targetHours * 0.5 ? 2 : 1;

  const ratingDescription =
    rating == 3
      ? 'Well done, you reached your target'
      : rating == 2
      ? 'not too bad but could be better'
      : 'Wow, you really need to do better than that';

  return {
    periodLength: exerciseHours.length,
    trainingDays: trainingDays,
    success: rating === 3,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: avarageHours
  };
};

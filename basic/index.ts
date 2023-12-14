import express from 'express';
import qs from 'qs';
import { calculateBmi } from './webBmi';
import { calculateExercises } from './webExercises';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const paramString = req.url.slice(req.url.indexOf('?') + 1);
  const params = qs.parse(paramString);

  const height = Number(params.height);
  const weight = Number(params.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.send({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.send({ error: 'parameters missing' });
  } else if (
    isNaN(Number(target)) ||
    !(daily_exercises instanceof Array) ||
    daily_exercises.some(isNaN)
  ) {
    res.send({ error: 'malformatted parameters' });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.send(calculateExercises(target, daily_exercises));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

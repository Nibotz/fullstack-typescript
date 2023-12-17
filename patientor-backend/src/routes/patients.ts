import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getAllNonSensitive());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.get(id);
  if (!patient) {
    res.status(404).end();
  } else {
    res.json(patient);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

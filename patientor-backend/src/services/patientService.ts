import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, PatientNew, PatientNonSensitive } from '../types';

const getAll = (): Patient[] => {
  return patientData;
};

const getAllNonSensitive = (): PatientNonSensitive[] => {
  return patientData.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth
  }));
};

const addPatient = (patient: PatientNew): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
};

export default { getAll, getAllNonSensitive, addPatient };

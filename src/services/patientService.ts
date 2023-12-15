import patients from '../../data/patients';
import { Patient, PatientNonSensitive } from '../types';

const getAll = (): Patient[] => {
  return patients;
};

const getAllNonSensitive = (): PatientNonSensitive[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth
  }));
};

export default { getAll, getAllNonSensitive };

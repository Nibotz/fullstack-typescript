import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, PatientNew, PatientNonSensitive } from '../types';

const toNonSensitive = (patient: Patient): PatientNonSensitive => {
  const { id, name, occupation, gender, dateOfBirth } = patient;
  return { id, name, occupation, gender, dateOfBirth };
};

const getAll = (): Patient[] => {
  return patientData;
};

const getAllNonSensitive = (): PatientNonSensitive[] => {
  return patientData.map(p => toNonSensitive(p));
};

const get = (id: string): Patient | undefined => {
  return patientData.find(p => p.id === id);
};

const addPatient = (patient: PatientNew): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
};

export default { getAll, getAllNonSensitive, get, addPatient };

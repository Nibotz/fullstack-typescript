import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Entry, EntryNew, Patient, PatientNew, PatientNonSensitive } from '../types';

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

const getById = (id: string): Patient | undefined => {
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

const addEntry = (patient: Patient, entry: EntryNew): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getAll, getAllNonSensitive, getById, addPatient, addEntry };

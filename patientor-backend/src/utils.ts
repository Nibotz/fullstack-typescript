import { PatientNew, Gender } from './types';

const isString = (val: unknown): val is string => typeof val === 'string';

const isDate = (val: string): boolean => Boolean(Date.parse(val));

const isGender = (val: unknown): val is Gender =>
  Object.values(Gender).some(g => g.toString() === val);

const parseName = (name: unknown): string => {
  if (!isString(name) || name === '') throw new Error('Incorrect name!');
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || occupation === '')
    throw new Error('Incorrect occupation!');
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isGender(gender)) throw new Error('Incorrect gender!');
  return gender;
};

const parseSsn = (obj: object): string | undefined => {
  if (!('ssn' in obj) || obj.ssn === '') return undefined;
  if (!isString(obj.ssn)) throw new Error('Incorrect ssn!');
  return obj.ssn;
};

const parseDate = (obj: object): string | undefined => {
  if (!('dateOfBirth' in obj) || obj.dateOfBirth === '') return undefined;
  if (!isString(obj.dateOfBirth) || !isDate(obj.dateOfBirth))
    throw new Error('Incorrect date of birth');
  return obj.dateOfBirth;
};

export const toNewPatient = (obj: unknown): PatientNew => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect patient data!');
  }
  if (!('name' in obj) || !('occupation' in obj) || !('gender' in obj)) {
    throw new Error('required fields missing!');
  }
  return {
    name: parseName(obj.name),
    occupation: parseOccupation(obj.occupation),
    gender: parseGender(obj.gender),
    ssn: parseSsn(obj),
    dateOfBirth: parseDate(obj),
    entries: []
  };
};

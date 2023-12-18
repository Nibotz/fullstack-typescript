import { PatientNew, Gender, EntryNew, Diagnosis, HealthCheckRating, BaseEntry, OccupationalHealthcareEntry, HospitalEntry } from './types';

const isString = (val: unknown): val is string => typeof val === 'string';

const isDate = (val: string): boolean => Boolean(Date.parse(val));

const parseDate = (obj: object, name: string): string => {
  if (!(name in obj)) {
    throw new Error(`Missing required field: ${name}`);
  }
  const val = obj[name as keyof object];
  if (!isString(val) || !isDate(val)) {
    throw new Error(`Incorrect value of ${name}: ${val}`);
  }
  return val;
};

const parseString = (obj: object, name: string): string => {
  if (!(name in obj)) {
    throw new Error(`Missing required field: ${name}`);
  }
  const val = obj[name as keyof object];
  if (!isString(val) || val === '') {
    throw new Error(`Incorrect value of ${name}: ${val}`);
  }
  return val;
};


const isGender = (val: unknown): val is Gender =>
  Object.values(Gender).some(g => g.toString() === val);

const parseGender = (obj: object): Gender => {
  if (!('gender' in obj) || !isGender(obj.gender))
    throw new Error('Incorrect or missing field: \'gender\'');
  return obj.gender;
};

const parseSSn = (obj: object): string | undefined => {
  if (!('ssn' in obj)) return undefined;
  return parseString(obj, 'ssn');
};

const parseDateOfBirth = (obj: object): string | undefined => {
  if (!('dateOfBirth' in obj)) return undefined;
  return parseDate(obj, 'dateOfBirth');
};

export const toNewPatient = (obj: unknown): PatientNew => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect patient data!');
  }

  return {
    name: parseString(obj, 'name'),
    occupation: parseString(obj, 'occupation'),
    gender: parseGender(obj),
    ssn: parseSSn(obj),
    dateOfBirth: parseDateOfBirth(obj),
    entries: []
  };
};


const parseDiagnosisCodes = (obj: object): Array<Diagnosis['code']> => {
  if (!('diagnosisCodes' in obj)) {
    return [];
  }
  return obj.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (val: unknown): val is HealthCheckRating =>
  Object.values(HealthCheckRating).some(h => h === val);

const parseHealthCheckRating = (obj: object): HealthCheckRating => {
  if (!("healthCheckRating" in obj) || !isHealthCheckRating(obj.healthCheckRating)) {
    throw new Error('Incorrect or missing field: \'healthCheckRating\'');
  }
  return obj.healthCheckRating;
};

const parseSickLeave = (obj: object): OccupationalHealthcareEntry['sickLeave'] => {
  if (!('sickLeave' in obj)) return undefined;
  if (!obj.sickLeave || typeof obj.sickLeave !== 'object') {
    throw new Error('Incorrect field: \'sickLeave\'');
  }
  return {
    startDate: parseDate(obj.sickLeave, 'startDate'),
    endDate: parseDate(obj.sickLeave, 'startDate')
  };
};

const parseDischarge = (obj: object): HospitalEntry['discharge'] => {
  if (!('discharge' in obj) ||
      !obj.discharge || 
      typeof obj.discharge !== 'object') {
    throw new Error('Incorrect or missing field: \'discharge\'');
  }
  return {
    criteria: parseString(obj.discharge, 'criteria'),
    date: parseDate(obj.discharge, 'date')
  };
};

export const toNewEntry = (obj: unknown): EntryNew => {
  if (!obj || typeof obj !== 'object' || !('type' in obj) || !isString(obj.type)) {
    throw new Error('Incorrect entry data!');
  }
  
  const baseEntry = (): Omit<BaseEntry, 'id'> => ({
    date: parseDate(obj, 'date'),
    description: parseString(obj, 'description'),
    specialist: parseString(obj, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(obj)
  });

  switch (obj.type) {
  case 'HealthCheck':
    return {
      ...baseEntry(),
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(obj)
    };
  case 'OccupationalHealthcare':
    return {
      ...baseEntry(),
      type: 'OccupationalHealthcare',
      employerName: parseString(obj, 'employerName'),
      sickLeave: parseSickLeave(obj)
    };
  case 'Hospital':
    return {
      ...baseEntry(),
      type: 'Hospital',
      discharge: parseDischarge(obj)
    };
  default:
    throw new Error(`Incorrect entry type: ${obj.type}`);
  }
};
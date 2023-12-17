export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientNonSensitive = Omit<Patient, 'ssn' | 'entries'>;

export type PatientNew = Omit<Patient, 'id'>;

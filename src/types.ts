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

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type PatientNonSensitive = Omit<Patient, 'ssn'>;

export type PatientNew = Omit<Patient, 'id'>;

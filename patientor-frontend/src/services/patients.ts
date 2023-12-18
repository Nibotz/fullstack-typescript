import axios from 'axios';
import { Entry, EntryNew, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (id: string, obj: EntryNew) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, obj);
  return data;
};

export default { getAll, getById, create, createEntry };

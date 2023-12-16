import axios from 'axios';
import { DiaryEntry, DiaryEntryNew, DiaryEntryNonSensitive } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const result = await axios.get<DiaryEntry[]>(baseUrl);
  return result.data;
};

const create = async (obj: DiaryEntryNew) => {
  const result = await axios.post<DiaryEntryNonSensitive>(baseUrl, obj);
  return result.data;
};

export default { getAll, create };

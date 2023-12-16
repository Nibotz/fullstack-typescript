export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type DiaryEntryNew = Omit<DiaryEntry, 'id'>;

export type DiaryEntryNonSensitive = Omit<DiaryEntry, 'comment'>;

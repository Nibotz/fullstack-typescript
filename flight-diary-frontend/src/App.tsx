import { useEffect, useState } from 'react';
import { DiaryEntryNew, DiaryEntryNonSensitive } from './types';
import diaryService from './diaryService';
import axios from 'axios';

const RadioButton = ({
  name,
  value,
  setState
}: {
  name: string;
  value: string;
  setState: (value: string) => void;
}) => {
  const id = `${name}-${value}`;
  return (
    <>
      <input type="radio" id={id} name={name} onChange={() => setState(value)} />
      <label htmlFor={id}>{value}</label>
    </>
  );
};

const App = () => {
  const [entries, setEntries] = useState<DiaryEntryNonSensitive[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    diaryService.getAll().then(data => setEntries(data));
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEntry: DiaryEntryNew = {
      date,
      visibility,
      weather,
      comment
    };
    diaryService
      .create(newEntry)
      .then(addedEntry => {
        setEntries(entries.concat(addedEntry));
        setDate('');
        setComment('');
      })
      .catch(error => {
        let message = 'Error: ';
        if (axios.isAxiosError(error)) {
          message += error.response?.data;
        } else if (error instanceof Error) {
          message += error.message;
        } else {
          message += 'unknown';
        }
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(''), 5000);
      });
  };

  const errorStyle = {
    color: 'red',
    fontSize: '1.5rem',
    marginBottom: '1rem'
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <div style={errorStyle}>{errorMessage}</div>

      <form onSubmit={onSubmit}>
        <div>
          date
          <input type="date" value={date} onChange={({ target }) => setDate(target.value)} />
        </div>

        <div>
          visibility:
          <RadioButton name="visibility" value="great" setState={setVisibility} />
          <RadioButton name="visibility" value="good" setState={setVisibility} />
          <RadioButton name="visibility" value="ok" setState={setVisibility} />
          <RadioButton name="visibility" value="poor" setState={setVisibility} />
        </div>

        <div>
          weather:
          <RadioButton name="weather" value="sunny" setState={setWeather} />
          <RadioButton name="weather" value="rainy" setState={setWeather} />
          <RadioButton name="weather" value="cloudy" setState={setWeather} />
          <RadioButton name="weather" value="stormy" setState={setWeather} />
          <RadioButton name="weather" value="windy" setState={setWeather} />
        </div>

        <div>
          comment
          <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>

      <div>
        {entries.map(entry => (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <div>visibility: {entry.visibility}</div>
            <div>weather: {entry.weather}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

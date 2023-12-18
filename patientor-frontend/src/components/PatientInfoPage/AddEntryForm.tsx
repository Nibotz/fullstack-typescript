import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { BaseEntry, Diagnosis, EntryNew, HealthCheckRating } from "../../types";

interface Props {
  addEntry: (entry: EntryNew) => Promise<void>;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ addEntry, diagnoses }: Props) => {
  // useState spam D:
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState('');
  const [healthCheckRating, setHealthSetRating] = useState(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const baseEntry: Omit<BaseEntry, 'id'> = {
      description,
      date,
      specialist,
      diagnosisCodes
    };
    switch (entryType) {
    case 'HealthCheck':
      addEntry({
        ...baseEntry,
        type: entryType,
        healthCheckRating: healthCheckRating
      });
      break;
    case 'OccupationalHealthcare':
      addEntry({
        ...baseEntry,
        type: entryType,
        employerName,
        sickLeave: {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd
        }
      });
      break;
    case 'Hospital':
      addEntry({
        ...baseEntry,
        type: entryType,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      });
      break;
    default:
      addEntry({ ...baseEntry, type: entryType } as EntryNew); // get error from backend
      break;
    }
  };

  const FormStyle = {
    border: '2px black dotted',
    margin: '5px 0px',
    padding: '10px'
  };
  return (
    <form style={FormStyle} onSubmit={onSubmit}>
      <TextField
        fullWidth
        variant="standard"
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        fullWidth
        variant="standard"
        type="date"
        label="Date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        fullWidth
        variant="standard"
        label="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <InputLabel>diagnosis codes</InputLabel>
      <Select
        fullWidth
        multiple
        value={diagnosisCodes}
        onChange={({ target: { value } }) =>
          setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)}
      >
      {diagnoses.map(t =>
        <MenuItem key={t.code} value={t.code}>{t.code}</MenuItem>
      )}
      </Select>
      <InputLabel>entry type</InputLabel>
      <Select
        fullWidth
        value={entryType}
        onChange={({ target }) => setEntryType(target.value)}
      >
      {['HealthCheck', 'OccupationalHealthcare', 'Hospital'].map(t =>
        <MenuItem key={t} value={t}>{t}</MenuItem>
      )}
      </Select>
      {entryType === 'HealthCheck' && (
        <div>
          <InputLabel>Healthcheck rating</InputLabel>
          <Select
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthSetRating(Number(target.value))}
          >
          {Object
            .entries(HealthCheckRating)
            .filter(t => isNaN(Number(t[0])))
            .map(([ name, val ]) =>
            <MenuItem key={val} value={val}>{name}</MenuItem>
          )}
          </Select>
        </div>
      )}
      {entryType === 'OccupationalHealthcare' && (
        <div>
          <TextField
            fullWidth
            variant="standard"
            label="employer name"
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <TextField
            fullWidth
            variant="standard"
            type="date"
            label="sick leave start"
            InputLabelProps={{ shrink: true }}
            value={sickLeaveStart}
            onChange={({ target }) => setSickLeaveStart(target.value)}
          />
          <TextField
            fullWidth
            variant="standard"
            type="date"
            label="sick leave end"
            InputLabelProps={{ shrink: true }}
            value={sickLeaveEnd}
            onChange={({ target }) => setSickLeaveEnd(target.value)}
          />
        </div>
      )}
      {entryType === 'Hospital' && (
        <div>
          <TextField
            fullWidth
            variant="standard"
            label="discharge date"
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            fullWidth
            variant="standard"
            label="discharge criteria"
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </div>
      )}
      <Button variant="contained" color="success" type="submit">add</Button>
    </form>
  );
};

export default AddEntryForm;
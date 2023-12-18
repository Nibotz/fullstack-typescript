import { Favorite, Work, MedicalServices, LocalHospital } from "@mui/icons-material";

import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[]
}
const EntryDetails = ({ entry, diagnoses }: Props) => {
  const EntryStyle = {
    border: '2px black solid',
    borderRadius: '10px',
    marginBottom: '5px',
    padding: '5px'
  };

  const diagnosisText = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return `${code} ${diagnosis?.name || '-'}`;
  };
  const diagnosisCodes = (entry?.diagnosisCodes) ? (
    <ul>
      {entry.diagnosisCodes.map(code => (
        <li key={code}>{diagnosisText(code)}</li>
      ))}
    </ul>
  ) : null;
  const specialist = <div>diagnose by {entry.specialist}</div>;

  switch (entry.type) {
  case 'Hospital':
    return (
      <div style={EntryStyle}>
        <div>{entry.date} <LocalHospital /></div>
        <div><i>{entry.description}</i></div>
        <div>{entry.discharge.date} {entry.discharge.criteria}</div>
        {diagnosisCodes}
        {specialist}
      </div>
    );
  case 'OccupationalHealthcare':
    return (
      <div style={EntryStyle}>
        <div>{entry.date} <Work /> <i>{entry.employerName}</i></div>
        <div><i>{entry.description}</i></div>
        {entry?.sickLeave && (
          <div>
            <strong>sick leave: </strong>
            {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </div>
        )}
        {diagnosisCodes}
        {specialist}
      </div>
    );
  case 'HealthCheck':
    return (
      <div style={EntryStyle}>
        <div>{entry.date} <MedicalServices /></div>
        <div><i>{entry.description}</i></div>
        <Favorite htmlColor={["green", "yellow", "orange", "red"][entry.healthCheckRating]} />
        {diagnosisCodes}
        {specialist}
      </div>
    );
  default:
    const assertNever = (val: never) => val;
    throw new Error(`Unexpected entry: '${JSON.stringify(assertNever(entry))}'`);
  }
};

export default EntryDetails;
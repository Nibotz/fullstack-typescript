import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Female, Male, Transgender } from "@mui/icons-material";

import { Diagnosis, EntryNew, Patient } from "../../types";
import patientService from '../../services/patients';
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { Alert } from "@mui/material";

interface Props {
  diagnoses: Diagnosis[]
}
const PatientInfoPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getById(id || '');
        setPatient(patient);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('axios error:', error.message);
        } else {
          console.error('unknown error:', error);
        }
      }
    };
    void fetchPatient();
  }, [id]);

  if (id === undefined || patient === undefined) {
    return null;
  }

  const addEntry = async (entry: EntryNew) => {
    try {
      const addedEntry = await patientService.createEntry(id, entry);
      setPatient({ ...patient, entries: patient.entries.concat(addedEntry) });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          setErrorMessage(error.response.data);
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        } else {
          console.error('unknown axios error:', error);
        }
      } else {
        console.error('unknown error:', error);
      }
    }
  };

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === 'male'
          ? <Male />
        :patient.gender === 'female'
          ? <Female />
          : <Transgender />}
      </h2>
      <div>ssn: {patient.ssn || '-'}</div>
      <div>occupation: {patient.occupation}</div>
      {errorMessage && <Alert severity="error" >{errorMessage}</Alert>}
      <AddEntryForm addEntry={addEntry} diagnoses={diagnoses} />
      <h3>entries</h3>
      <div>
        {patient.entries.map(entry => 
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        )}
      </div>
    </div>
  );
};

export default PatientInfoPage;
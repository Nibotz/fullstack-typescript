import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Female, Male, Transgender } from "@mui/icons-material";

import { Patient } from "../../types";
import patientService from '../../services/patients';

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();
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

  if (patient === undefined) {
    return null;
  }

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
    </div>
  );
};

export default PatientInfoPage;
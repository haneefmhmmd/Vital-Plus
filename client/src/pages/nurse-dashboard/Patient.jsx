import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Button from "../../components/Button";
import {
  GET_PATIENT_BY_ID,
  GET_VITALS_BY_PATIENT_ID,
} from "../../config/apollo-client";
export default function Patient() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_PATIENT_BY_ID, {
    variables: { id },
  });

  const {
    data: vitals,
    loading: vitalsLoading,
    error: vitalsError,
  } = useQuery(GET_VITALS_BY_PATIENT_ID, {
    variables: { patientId: id },
  });

  useEffect(() => {
    console.log(vitalsLoading);
    if (vitals) {
      console.log(vitals);
    }
  }, [vitals]);

  return (
    <article>
      {error && (
        <div>
          <p>Error occurred while fetching data. Please try again.</p>
        </div>
      )}
      {data && (
        <div>
          <div>
            <h1>
              {data.patient.firstName} {data.patient.lastName}
            </h1>
            <p>
              {data.patient.email} | {data.patient.phoneNumber}
            </p>
          </div>
          <div>
            <Button label="Add Vital" />
            <Button label="Provide Consultation" />
          </div>
        </div>
      )}

      {vitals && (
        <>
          <h3>Vitals</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Body Temperature</th>
                <th>Body Pressure</th>
                <th>Respiratory Rate</th>
                <th>Weight</th>
                <th>Symptoms</th>
              </tr>
            </thead>

            <tbody>
              {vitals.vitalByPatientId.length !== 0 &&
                vitals.vitalByPatientId[0].measurements.map((measurement) => {
                  return (
                    <tr key={uuid()}>
                      <td>{measurement.date}</td>
                      <td>{measurement.bodyTemperature}</td>
                      <td>{measurement.bodyPressure}</td>
                      <td>{measurement.respiratoryRate}</td>
                      <td>{measurement.weight}</td>
                      <td>{measurement.symptoms.join(", ")}</td>
                    </tr>
                  );
                })}
              {vitals.vitalByPatientId.length == 0 && (
                <tr>
                  <td colSpan="6" align="center">
                    No Vital Measurements available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </article>
  );
}

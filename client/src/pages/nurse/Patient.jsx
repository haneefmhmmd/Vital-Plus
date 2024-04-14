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

  if (loading) {
    return (
      <div>
        <p>Loading patient data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error occurred while fetching data. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      <header className="dashboard-header">
        <div className="header__left">
          <img
            className="profile-img"
            src={data.patient.image}
            alt={`Profile image of ${data.patient.firstName}`}
          />
          <div className="header__info">
            <h1 className="title">
              {data.patient.firstName} {data.patient.lastName}
            </h1>
            <p>
              {data.patient.email} | {data.patient.phoneNumber}
            </p>
          </div>
        </div>
        <div className="header__right">
          <Button
            variant="secondary"
            label="Add Vitals"
            elementType="link"
            href="/add-vital"
          />
          <Button
            variant="secondary"
            label="Provide Consultation"
            elementType="link"
            href="/nurse/consultation"
          />
        </div>
      </header>

      {vitalsLoading && (
        <div>
          <p>Loading patient vitals info...</p>
        </div>
      )}
      {vitalsError && (
        <div>
          <p>Error occurred while loading patient vitals. Please try again.</p>
        </div>
      )}
      {vitals && (
        <>
          <h2 className="sub-title mt-4">History</h2>
          <div className="rounded shadow-sm p-2 bg-white table-responsive mt-3">
            <table className="table table-borderless table-hover align-middle">
              <thead>
                <tr className="border-bottom">
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
          </div>
        </>
      )}
    </>
  );
}

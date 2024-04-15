import React from "react";

import { useQuery } from "@apollo/client";
import Button from "../../components/Button";
import { GET_PATIENT_BY_ID, GET_CONSULTATIONS_BY_PATIENT } from "../../config/apollo-client";
import useAuth from "../../utils/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  const patient = useQuery(GET_PATIENT_BY_ID, {
    variables: { id: user.entityId },
  });

  const getConsultationsByPatient = useQuery(GET_CONSULTATIONS_BY_PATIENT, {
    variables: { id: user.entityId },
  });

  if (getConsultationsByPatient.loading || patient.loading) {
    return <div>Loading Consultation data...</div>;
  }

  if (getConsultationsByPatient.error) {
    return <div>Error loading consultation data!!</div>;
  }

  if (patient.error) {
    return <div>Error loading patient data!!</div>;
  }


  const consultationsResponse = getConsultationsByPatient.data.getConsultationsByPatientId;

  console.log("Patient reponse ->" + consultationsResponse);

  const patientResponse = patient.data.patient;

  console.log("Patient reponse ->" + patientResponse);

  return (
    <section>
      <header className="dashboard-header">
        <div className="header__left">
          <img
            className="profile-img"
            src={patientResponse.image}
            alt={`Profile image of ${patientResponse.firstName}`}
          />
          <div className="header__info">
            <h1 className="title">
              {patientResponse.firstName} {patientResponse.lastName}
            </h1>
            <p>
              {patientResponse.email} | {patientResponse.phoneNumber}
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
        </div>
      </header>
      <div className="mt-4">
        <h2 className="sub-title">Your Consultations</h2>

        <div className="rounded shadow-sm p-2 bg-white table-responsive mt-3">
          <table className="table table-borderless table-hover align-middle">
            <thead>
              <tr className="border-bottom">
                <th>Date</th>
                <th>Possible Diagnosis</th>
                <th>Suggestions</th>
              </tr>
            </thead>
            <tbody>
              {consultationsResponse.map((consultation) => (
                <tr key={consultation.id}>
                  <td>{consultation.date}</td>
                  <td>{consultation.possibleDiagnosis}</td>
                  <td>{consultation.suggestions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

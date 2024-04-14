import { useQuery } from "@apollo/client";
import {
  GET_LAST_ADDED_PATIENT,
  GET_NURSE_BY_ID,
  GET_PATIENTS_BY_NURSE_ID,
  GET_PATIENT_COUNT_BY_NURSE_ID,
} from "../../config/apollo-client";
import useAuth from "../../utils/useAuth";

import Button from "../../components/Button";

export default function Members() {
  const { user } = useAuth();

  const patientCountQuery = useQuery(GET_PATIENT_COUNT_BY_NURSE_ID, {
    variables: { id: user.entityId },
  });
  const lastAddedPatient = useQuery(GET_LAST_ADDED_PATIENT);
  const getPatientsByNurse = useQuery(GET_PATIENTS_BY_NURSE_ID, {
    variables: { id: user.entityId },
  });
  const getNurseDetails = useQuery(GET_NURSE_BY_ID, {
    variables: { id: user.entityId },
  });

  if (
    patientCountQuery.loading ||
    lastAddedPatient.loading ||
    getPatientsByNurse.loading ||
    getNurseDetails.loading
  )
    return <p>Loading...</p>;

  if (patientCountQuery.error)
    return <p>Error: {patientCountQuery.error.message}</p>;

  if (lastAddedPatient.error)
    return <p>Error: {lastAddedPatient.error.message}</p>;

  if (getPatientsByNurse.error)
    return <p>Error: {getPatientsByNurse.error.message}</p>;

  if (getNurseDetails.error)
    return <p>Error: {getNurseDetails.error.message}</p>;

  const { count } = patientCountQuery.data.getPatientCountByNurseId;
  const lastAddedPatientResponse = lastAddedPatient.data.getLastAddedPatient;
  const patientsResponse = getPatientsByNurse.data.getPatientsByNurseId;
  const getNurseDetailsResponse = getNurseDetails.data.nurse;

  let patients = [];
  if (patientsResponse && patientsResponse.patients) {
    patients = patientsResponse.patients;
  }

  return (
    <>
      <header className="dashboard-header">
        <div className="header__left">
          <img
            className="profile-img"
            src={getNurseDetailsResponse.image}
            alt={`Profile image of ${getNurseDetailsResponse.firstName}`}
          />
          <div className="header__info">
            <h1 className="title">
              {getNurseDetailsResponse.firstName}{" "}
              {getNurseDetailsResponse.lastName}
            </h1>
            <p>
              {getNurseDetailsResponse.email} |{" "}
              {getNurseDetailsResponse.phoneNumber}
            </p>
          </div>
        </div>
        <div className="header__right">
          <Button
            variant="secondary"
            label="Add Patient"
            elementType="link"
            href="/nurse/add-patient"
          />
        </div>
      </header>
      <div className="highlights-wrapper">
        <div className="highlights">
          <h2 className="highlights__title">{count}</h2>
          <p className="highlights__desc">No.of Patients</p>
        </div>

        <div className="highlights">
          <h2 className="highlights__title">
            {lastAddedPatientResponse.firstName}
          </h2>
          <p className="highlights__desc">Last Added Patient</p>
        </div>
      </div>

      <div>
        <h2 className="sub-title">Currently Montioring Patients</h2>
      </div>

      <div className="rounded shadow-sm p-2 bg-white table-responsive mt-3">
        <table className="table table-borderless table-hover align-middle">
          <thead>
            <tr className="border-bottom">
              <th>ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient._id}</td>
                <td>
                  {patient.firstName} {patient.lastName}
                </td>
                <td>{patient.dateOfBirth}</td>
                <td>{patient.email}</td>
                <td>{patient.phoneNumber}</td>
                <td>
                  {patient.address}. {patient.postalCode}. {patient.country}
                </td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    elementType="link"
                    label="View"
                    href={`/nurse/patient/${patient._id}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

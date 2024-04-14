import {
    GET_PATIENT_COUNT_BY_NURSE_ID,
    GET_LAST_ADDED_PATIENT,
    GET_PATIENTS_BY_NURSE_ID,
    GET_NURSE_BY_ID
} from "../config/apollo-client";
import useAuth from "../utils/useAuth";
import { useQuery } from "@apollo/client";

export default function Members() {

    const { user } = useAuth();

    const patientCountQuery = useQuery(GET_PATIENT_COUNT_BY_NURSE_ID, { variables: { id: user.entityId } });
    const lastAddedPatient = useQuery(GET_LAST_ADDED_PATIENT);
    const getPatientsByNurse = useQuery(GET_PATIENTS_BY_NURSE_ID, { variables: { id: user.entityId } });
    const getNurseDetails = useQuery(GET_NURSE_BY_ID, { variables: { id: user.entityId } });

    if (patientCountQuery.loading || lastAddedPatient.loading || getPatientsByNurse.loading || getNurseDetails.loading) return <p>Loading...</p>;

    if (patientCountQuery.error) return <p>Error: {patientCountQuery.error.message}</p>;

    if (lastAddedPatient.error) return <p>Error: {lastAddedPatient.error.message}</p>;

    if (getPatientsByNurse.error) return <p>Error: {getPatientsByNurse.error.message}</p>;

    if (getNurseDetails.error) return <p>Error: {getNurseDetails.error.message}</p>;

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
            <div>
                <h6>Nurse Bar</h6>
                <p>Name : {getNurseDetailsResponse.firstName} {getNurseDetailsResponse.lastName}</p>
                <p>Details : {getNurseDetailsResponse.email} | {getNurseDetailsResponse.phoneNumber}</p>
                <p>ImageURL : {getNurseDetailsResponse.image}</p>

                <button>Add Patient</button>
            </div>

            <div style={{ marginTop: "30px" }}>
                <h6>Tile #1</h6>
                <h6>No.of Patients</h6>
                <p>Count : {count}</p>
            </div>

            <div style={{ marginTop: "30px" }}>
                <h6>Tile #2</h6>
                <h6>Last Added Patient</h6>
                <p>Name : {lastAddedPatientResponse.firstName} {lastAddedPatientResponse.lastName}</p>
            </div>

            <div style={{ marginTop: "30px" }}>
                <h6>Table #3</h6>
                <h6>All Patients Managed By This Nurse</h6>
                <table style={{ marginTop: "30px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient._id}>
                                <td>{patient._id}</td>
                                <td>{patient.firstName} {patient.lastName}</td>
                                <td>{patient.dateOfBirth}</td>
                                <td>{patient.email}</td>
                                <td>{patient.phoneNumber}</td>
                                <td>{patient.address}. {patient.postalCode}. {patient.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
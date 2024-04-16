import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { fetchFromLS } from "../utils/localStorage.util";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/vitalplus",
});

const authLink = setContext((_, { headers }) => {
  const user = fetchFromLS("user");
  if (user) {
    const token = user.token;
    console.log(`Bearer ${token}`);
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    headers,
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

export const REGISTER_USER = gql`
  mutation AddNurse(
    $firstName: String!
    $lastName: String!
    $dateOfBirth: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $address: String!
    $postalCode: String!
    $country: String!
    $image: String
  ) {
    addNurse(
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      address: $address
      postalCode: $postalCode
      country: $country
      image: $image
    ) {
      id
      firstName
      lastName
      dateOfBirth
      email
      phoneNumber
      address
      postalCode
      country
      image
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      entityId
      userId
      roleId
      token
      email
    }
  }
`;

export const ADD_PATIENT = gql`
  mutation AddPatient(
    $firstName: String!
    $lastName: String!
    $dateOfBirth: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $address: String!
    $postalCode: String!
    $country: String!
    $image: String!
    $emergencyContactName: String!
    $emergencyContactNumber: String!
    $emergencyContactRelationship: String!
  ) {
    addPatient(
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      address: $address
      postalCode: $postalCode
      country: $country
      image: $image
      emergencyContactName: $emergencyContactName
      emergencyContactNumber: $emergencyContactNumber
      emergencyContactRelationship: $emergencyContactRelationship
    ) {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

export const GET_PATIENT_COUNT_BY_NURSE_ID = gql`
  query GetPatientCountByNurseId($id: String!) {
    getPatientCountByNurseId(id: $id) {
      count
    }
  }
`;

export const ASSIGN_PATIENT_TO_NURSE = gql`
  mutation AddPatientsToNurse($nurseId: String!, $patientId: [String!]!) {
    addPatientsToNurse(nurseId: $nurseId, patientIds: $patientId) {
      id
    }
  }
`;

export const GET_LAST_ADDED_PATIENT = gql`
  query GetLastAddedPatient {
    getLastAddedPatient {
      firstName
      lastName
    }
  }
`;

export const GET_PATIENTS_BY_NURSE_ID = gql`
  query GetPatientsByNurseId($id: String!) {
    getPatientsByNurseId(id: $id) {
      patients {
        _id
        firstName
        lastName
        dateOfBirth
        email
        phoneNumber
        address
        postalCode
        country
        image
        emergencyContactName
        emergencyContactNumber
        emergencyContactRelationship
      }
    }
  }
`;

export const GET_NURSE_BY_ID = gql`
  query GetNurseById($id: String!) {
    nurse(id: $id) {
      id
      firstName
      lastName
      dateOfBirth
      email
      phoneNumber
      address
      postalCode
      country
      image
    }
  }
`;

export const GET_PATIENT_BY_ID = gql`
  query GetPatient($id: String!) {
    patient(id: $id) {
      id
      firstName
      lastName
      dateOfBirth
      email
      phoneNumber
      address
      postalCode
      country
      image
      emergencyContactName
      emergencyContactNumber
      emergencyContactRelationship
    }
  }
`;

export const UPDATE_NURSE_BY_ID = gql`
  mutation UpdateNurse(
    $id: String!
    $firstName: String!
    $lastName: String!
    $dateOfBirth: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $address: String!
    $postalCode: String!
    $country: String!
    $image: String
  ) {
    updateNurse(
      id: $id
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      address: $address
      postalCode: $postalCode
      country: $country
      image: $image
    ) {
      id
      firstName
      lastName
      dateOfBirth
      email
      phoneNumber
      address
      postalCode
      country
      image
    }
  }
`;

export const UPDATE_PATIENT_BY_ID = gql`
  mutation UpdatePatient(
    $id: String!
    $firstName: String!
    $lastName: String!
    $dateOfBirth: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $address: String!
    $postalCode: String!
    $country: String!
    $image: String!
    $emergencyContactName: String!
    $emergencyContactNumber: String!
    $emergencyContactRelationship: String!
  ) {
    updatePatient(
      id: $id
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      address: $address
      postalCode: $postalCode
      country: $country
      image: $image
      emergencyContactName: $emergencyContactName
      emergencyContactNumber: $emergencyContactNumber
      emergencyContactRelationship: $emergencyContactRelationship
    ) {
      id
      firstName
      lastName
      dateOfBirth
      email
      phoneNumber
      address
      postalCode
      country
      image
      emergencyContactName
      emergencyContactNumber
      emergencyContactRelationship
    }
  }
`;

export const ADD_VITAL = gql`
  mutation AddPatientVital(
    $id: String!
    $bodyTemperature: Float!
    $bodyPressure: Float!
    $respiratoryRate: Float!
    $weight: Float!
    $symptoms: [String!]!
  ) {
    addVital(
      patientId: $id
      measurements: {
        bodyTemperature: $bodyTemperature
        bodyPressure: $bodyPressure
        respiratoryRate: $respiratoryRate
        weight: $weight
        symptoms: $symptoms
      }
    ) {
      id
      patient
      measurements {
        bodyTemperature
        bodyPressure
        respiratoryRate
        weight
        symptoms
      }
    }
  }
`;

export const GET_VITALS_BY_PATIENT_ID = gql`
  query GetVitalsByPatientId($patientId: ID!) {
    vitalByPatientId(patientId: $patientId) {
      id
      measurements {
        date
        bodyTemperature
        bodyPressure
        respiratoryRate
        weight
        symptoms
      }
    }
  }
`;

export const ADD_CONSULTION = gql`
  mutation AddConsultion(
    $patient: String!
    $nurse: String!
    $possibleDiagnosis: String!
    $suggestions: String!
  ) {
    addConsultation(
      patient: $patient
      nurse: $nurse
      possibleDiagnosis: $possibleDiagnosis
      suggestions: $suggestions
    ) {
      patient
      nurse
      possibleDiagnosis
      suggestions
    }
  }
`;

export const GET_CONSULTATIONS_BY_PATIENT = gql`
  query getConsultationsByPatientId($id: String!) {
    getConsultationsByPatientId(patientId: $id) {
      patient
      nurse
      date
      possibleDiagnosis
      suggestions
    }
  }
`;

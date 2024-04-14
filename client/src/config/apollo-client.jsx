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
  query GetPatientCountByNurseId($email: String!) {
    getPatientCountByNurseId(email: $email) {
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

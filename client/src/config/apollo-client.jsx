import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:3000/vitalplus",
  cache: new InMemoryCache(),
});

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
    $image: String
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
export default client;

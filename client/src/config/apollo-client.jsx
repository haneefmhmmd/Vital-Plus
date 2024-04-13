import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:3000/vitalplus",
  cache: new InMemoryCache(),
});

export const REGISTER_USER = gql`
  mutation AddAdmin(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addAdmin(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export default client;

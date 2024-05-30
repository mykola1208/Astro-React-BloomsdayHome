import { gql } from "@apollo/client";

const GET_PROPERTY = gql`
  query GetProperty {
    properties(limit: 1) {
      address1
      city
      state
      zip5
      id
    }
  }
`;

export { GET_PROPERTY };

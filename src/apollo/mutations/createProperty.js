import { gql } from "@apollo/client";

const CREATE_PROPERTY_MUTATION = gql`
  mutation CreateProperty($object: properties_insert_input = {}) {
    insert_properties_one(object: $object) {
      id
      address1
      city
      state
      zip5
    }
  }
`;

export { CREATE_PROPERTY_MUTATION };

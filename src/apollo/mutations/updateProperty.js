import { gql } from "@apollo/client";

const UPDATE_PROPERTY_MUTATION = gql`
  mutation UpdateProperty($id: uuid = "", $_set: properties_set_input = {}) {
    update_properties_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      address1
      city
      state
      zip5
    }
  }
`;

export { UPDATE_PROPERTY_MUTATION };

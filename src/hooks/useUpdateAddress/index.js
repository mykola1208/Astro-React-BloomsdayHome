import { UPDATE_PROPERTY_MUTATION } from "../../apollo/mutations/updateProperty";
import { createApolloClient } from "../../apollo/client";

export const useUpdateAddress = () => {
  const { createClient } = createApolloClient();

  const updateAddress = async (id, address) => {
    const client = await createClient();

    try {
      const { data } = await client.mutate({
        mutation: UPDATE_PROPERTY_MUTATION,
        variables: {
          id: id,
          _set: {
            address1: address.street,
            city: address.city,
            state: address.state,
            zip5: address.zip_code,
          },
        },
      });
      return data?.update_properties_by_pk?.id
    } catch (err) {
      console.log(err);
    }
  };

  return { updateAddress };
};

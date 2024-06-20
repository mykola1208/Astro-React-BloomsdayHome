import { CREATE_PROPERTY_MUTATION } from "../../apollo/mutations/createProperty";
import { createApolloClient } from "../../apollo/client";

export const useCreateAddress = () => {
  const { createClient } = createApolloClient();

  const createAddress = async (address) => {
    const client = await createClient();

    try {
      const { data } = await client.mutate({
        mutation: CREATE_PROPERTY_MUTATION,
        variables: {
          object: {
            address1: address.street,
            city: address.city,
            state: address.state,
            zip5: address.zip_code,
            active: true,
            address2: "",
          },
        },
      });
      return data?.insert_properties_one?.id;
    } catch (err) {
      throw err;
    }
  };

  return { createAddress };
};

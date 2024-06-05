const query = `
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

export async function getAddress(graphqlEndpoint, token) {
  try {
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data?.data?.properties[0];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const query = `
  query TaskCountsByStage {
    task_counts_by_stage {
      task_stage
      state
      count
    }
  }
`;

export async function getTaskCountsByStage(graphqlEndpoint, token) {
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

    return data?.data?.task_counts_by_stage;
  } catch (error) {
    throw new Error("Error fetching data");
  }
}

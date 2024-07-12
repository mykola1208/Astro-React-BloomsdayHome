import { requestParamIds } from "../../data/data";

const query = `
  query GetDocumentsForCategory($stage: task_stages_enum = get_prepared) {
    tasks(where: {task_stage: {_eq: $stage}}, order_by: {title: asc}) {
      documents_tasks(limit: 1) {
        document {
          filename
          uuid
        }
      }
      task_category
      title
      id
    }
  }
`;

async function fetchDocumentsForCategory(graphqlEndpoint, token, id) {
  try {
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          stage: requestParamIds[id],
        },
      }),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
}

export async function getDocumentsForCategory(graphqlEndpoint, token, id) {
  if (requestParamIds[id] == undefined) {
    return [[], 0];
  }

  let response = await fetchDocumentsForCategory(graphqlEndpoint, token, id);
  const sections = {};

  response.data.tasks.forEach((item) => {
    const { title, task_category } = item;

    if (!sections[task_category]) {
      sections[task_category] = { title: task_category, items: [] };
    }

    sections[task_category].items.push({
      title: title,
      id: item.id,
      document: item.documents_tasks[0]?.document,
    });
  });

  const transformedSections = Object.keys(sections).map((key) => ({
    title: sections[key].title,
    items: sections[key].items,
  }));

  return transformedSections;
}

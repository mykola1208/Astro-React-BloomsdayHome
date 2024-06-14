import { requestParamIds, taskCategories } from "../../data/data";

const query = `
  query GetTasksByStage($task_stage: task_stages_enum = closing) {
    tasks(where: {task_stage: {_eq: $task_stage}}) {
      id
      title
      description
      task_stage
      task_category
      state
    }
    tasks_aggregate(where: {state: {_neq: completed}, task_stage: {_eq: $task_stage}}) {
      aggregate {
        count
      }
    }
  }
`;

async function fetchTasks(graphqlEndpoint, token, id) {
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
          task_stage: requestParamIds[id],
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return [data?.data?.tasks, data?.data?.tasks_aggregate?.aggregate?.count];
  } catch (error) {
    throw error;
  }
}

export async function getTasks(graphqlEndpoint, token, id) {
  if (requestParamIds[id] == undefined) {
    return [[], 0];
  }

  let [tasksResponse, incompleteTasksCount] = await fetchTasks(
    graphqlEndpoint,
    token,
    id
  );

  if (tasksResponse.length > 0) {
    const tasksByCategory = {};

    const structuredTasks = {
      [requestParamIds[id]]: {
        description: "",
        tasks: [],
      },
    };

    tasksResponse.forEach((task) => {
      tasksByCategory[task.task_category] =
        tasksByCategory[task.task_category] || [];
      tasksByCategory[task.task_category].push({
        status: task.state === "completed",
        label: task.title,
      });
    });

    Object.entries(tasksByCategory).forEach(([category, tasks]) => {
      structuredTasks[requestParamIds[id]].tasks.push({
        headerIcon: taskCategories[category]?.headerIcon,
        header: taskCategories[category]?.header,
        checkList: tasks,
      });
    });
    return [structuredTasks, incompleteTasksCount];
  }
  return [];
}

import { gql } from "@apollo/client";

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      task_stage
      task_category
      state
    }
  }
`;

export { GET_TASKS };

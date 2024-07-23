import { gql } from "@apollo/client";

const GET_TASKS_BY_STAGE = gql`
  query GetTasksByStage($task_stage: task_stages_enum = closing) {
    tasks(where: {task_stage: {_eq: $task_stage}}) {
      id
      title
      description
      task_stage
      task_category
      state
      documents_tasks {
        document {
          uuid
          filename
        }
      }
    }
  }
`;

export { GET_TASKS_BY_STAGE };

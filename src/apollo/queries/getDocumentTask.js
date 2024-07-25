import { gql } from "@apollo/client";

const GET_DOCUMENT_TASKS = gql`
  query GetDocumentTasks($uuid: uuid = "") {
    documents_by_pk(uuid: $uuid) {
      documents_tasks {
        task {
          task_stage
          task_category
          title
        }
      }
    }
  }
`;

export { GET_DOCUMENT_TASKS };

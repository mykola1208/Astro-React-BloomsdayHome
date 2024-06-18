import { gql } from "@apollo/client";

const MARK_TASK_COMPLETE = gql`
  mutation MarkTaskComplete($id: uuid = "", $document_id: uuid = "") {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { state: completed }) {
      id
      state
    }
    insert_documents_tasks_one(object: {document_id: $document_id, task_id: $id}) {
     id
    }
  }
`;

export { MARK_TASK_COMPLETE };

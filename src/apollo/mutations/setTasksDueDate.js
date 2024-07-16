import { gql } from "@apollo/client";

const SET_TASKS_DUE_DATE = gql`
  mutation SetTaskDueDate($due_at: timestamptz = "", $id: uuid = "") {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { due_at: $due_at }) {
      id
      due_at
    }
  }
`;

export { SET_TASKS_DUE_DATE };

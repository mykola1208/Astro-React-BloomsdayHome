import { gql } from "@apollo/client";

const MARK_TASK_COMPLETE = gql`
  mutation MarkTaskComplete($id: uuid = "") {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { state: completed }) {
      id
      state
    }
  }
`;

export { MARK_TASK_COMPLETE };

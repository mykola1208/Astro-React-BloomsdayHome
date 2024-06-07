import { gql } from "@apollo/client";

const UPDATE_TASK_STATE = gql`
  mutation UpdateTaskState(
    $id: uuid = ""
    $state: task_states_enum = completed
  ) {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { state: $state }) {
      id
      state
    }
  }
`;

export { UPDATE_TASK_STATE };

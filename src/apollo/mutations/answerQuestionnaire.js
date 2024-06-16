import { gql } from "@apollo/client";

const ANSWER_QUESTIONNAIRE = gql`
  mutation AnswerQuestionnaire(
    $object: onboarding_questionnaire_insert_input = {}
  ) {
    insert_onboarding_questionnaire_one(object: $object) {
      auth_user_id
      id
    }
  }
`;

export { ANSWER_QUESTIONNAIRE };

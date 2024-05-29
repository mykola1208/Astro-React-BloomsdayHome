import { gql } from "@apollo/client";

const INSERT_DOCUMENTS_ONE = gql`
  mutation insertDocumentsOne($object: documents_insert_input!) {
    insert_documents_one(object: $object) {
      id: uuid
      filename
      status
      folderId: folder_id
      updatedAt: updated_at
    }
  }
`;

export { INSERT_DOCUMENTS_ONE };

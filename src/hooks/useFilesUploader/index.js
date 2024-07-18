import { useState, useCallback } from "react";

import uploadFileOnSignedUrl from "../../utils/upload-file-on-signed-url";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { GET_S3_SIGNED_URL } from "../../apollo/queries/getS3SignedUrl";
import { INSERT_DOCUMENTS_ONE } from "../../apollo/mutations/insertDocumentsOne";
import { MARK_TASK_COMPLETE } from "../../apollo/mutations/completeTask";
import { createApolloClient } from "../../apollo/client";

export const useFilesUploader = ({ files, currentUser, id }) => {
  const { createClient } = createApolloClient();

  const [uploadStatus, setUploadStatus] = useState({
    uploading: false,
    completed: false,
  });

  let filename;
  async function uploadFile(file) {
    const client = await createClient();

    const userId = currentUser.id;
    filename = file?.name;
    const contentType = file?.type;

    try {
      const { data } = await client.query({
        query: GET_S3_SIGNED_URL,
        variables: {
          filename: `${userId}/${filename}`,
          contentType: contentType,
        },
      });

      const signedUrl = data.getS3SignedUrl.url;

      const documentData = await client.mutate({
        mutation: INSERT_DOCUMENTS_ONE,
        variables: {
          object: {
            filename,
            auth_user_id: userId,
          },
        },
      });

      await uploadFileOnSignedUrl({ signedUrl, file });
      const taskId = document
        .getElementsByClassName("taskID")[0]
        ?.getAttribute("id");

      if (taskId) {
        await client.mutate({
          mutation: MARK_TASK_COMPLETE,
          variables: {
            id: taskId,
            document_id: documentData.data.insert_documents_one.id,
          },
        });
      }
    } catch (error) {
      throw new Error("Error occurred during file upload");
    }
  }

  const uploadFiles = useCallback(async () => {
    if (files.length === 0) return;

    setUploadStatus({ uploading: true, completed: false });

    try {
      for (const file of files) {
        await uploadFile(file);
      }
      setUploadStatus({ uploading: false, completed: true });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.location.reload();
    } catch (error) {
      setUploadStatus({ uploading: false, completed: false });
    }
  }, [files, uploadFile]);

  return {
    uploadFiles,
    uploadStatus,
  };
};

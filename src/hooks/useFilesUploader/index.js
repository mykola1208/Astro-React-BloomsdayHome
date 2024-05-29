import uploadFileOnSignedUrl from "../../utils/upload-file-on-signed-url";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { GET_S3_SIGNED_URL } from "../../apollo/queries/getS3SignedUrl";
import { INSERT_DOCUMENTS_ONE } from "../../apollo/mutations/insertDocumentsOne";
import { createApolloClient } from "../../apollo/client";

export const useFilesUploader = ({ files, currentUser }) => {
  const { createClient } = createApolloClient();

  async function uploadFile(file) {
    const client = await createClient();

    const userId = currentUser.id;
    const filename = file?.name;
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

      await client.mutate({
        mutation: INSERT_DOCUMENTS_ONE,
        variables: {
          object: {
            filename,
            auth_user_id: userId,
          },
        },
      });

      await uploadFileOnSignedUrl({ signedUrl, file });

      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error occurred during file upload:", error);
    }
  }

  async function uploadFiles() {
    for (const file of files) {
      await uploadFile(file);
    }
    navigate("/progress-tracker/get-approved");
  }

  return {
    uploadFiles,
  };
};

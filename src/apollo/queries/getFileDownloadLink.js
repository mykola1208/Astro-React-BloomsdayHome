import { gql } from "@apollo/client";

const GET_FILE_DOWNLOAD_LINK = gql`
  query GetFileDownloadLink($filename: String = "") {
    getS3SignedUrlForDownload(filename: $filename) {
      url
    }
  }
`;

export { GET_FILE_DOWNLOAD_LINK };

import { gql } from "@apollo/client";

const GET_S3_SIGNED_URL = gql`
  query getS3SignedUrl($filename: String!, $contentType: String!) {
    getS3SignedUrl(filename: $filename, content_type: $contentType) {
      url
    }
  }
`;

export { GET_S3_SIGNED_URL };

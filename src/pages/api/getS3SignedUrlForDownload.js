const query = `
  query GetFileDownloadLink($filename: String = "") {
    getS3SignedUrlForDownload(filename: $filename) {
      url
    }
  }
`;

export async function getS3SignedUrlForDownload(
  graphqlEndpoint,
  token,
  userId,
  filename
) {
  try {
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          filename: `${filename}`,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data?.data?.getS3SignedUrlForDownload.url;
  } catch (error) {
    throw new Error("Error getting s3 url");
  }
}

import axios from "axios";

const uploadFileOnSignedUrl = ({ signedUrl, file }) => {
  const contentType = file.type;

  const headers = {
    headers: {
      "Content-Type": contentType,
    },
  };

  return axios.put(signedUrl, file, headers);
};

export default uploadFileOnSignedUrl;

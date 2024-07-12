import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "./Dropzone";
import ConfirmDialog from "./ConfirmDialog";

interface FileWithPath extends File {
  path: string;
}

const Browse = ({ id, currentUser }) => {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0] || null);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/jpeg": [".jpg"],
      "application/pdf": [".pdf"],
    },
    onDrop,
    noClick: true,
    noKeyboard: true,
    multiple: false, // Only one file at a time
  });

  return (
    <div className="flex flex-col justify-center h-full">
      <Dropzone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        open={open}
        type="single"
      />
      <ConfirmDialog
        file={file}
        id={id}
        setFile={setFile}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Browse;

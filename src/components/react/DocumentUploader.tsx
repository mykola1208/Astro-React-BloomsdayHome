import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ReactSVG } from "react-svg";
import { useFilesUploader } from "../../hooks/useFilesUploader";
import Dropzone from "./Dropzone";

interface FileWithPath extends File {
  path: string;
}

const DocumentUploader = ({ currentUser, mode }) => {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0] || null);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
    },
    onDrop,
    noClick: true,
    noKeyboard: true,
    multiple: false, // Only one file at a time
  });

  const { uploadFiles } = useFilesUploader({
    files: file ? [file] : [],
    currentUser,
  });

  const fileList = file ? (
    <li key={file.path}>
      <div className="flex">
        <div className="grow flex border border-1 bg-cream-light rounded-lg gap-2">
          <ReactSVG src="/icons/image.svg" className="mt-3 ml-2" />
          <p className="grow text-lg font-medium text-darkgreen my-3">
            {file.path}
          </p>
          <ReactSVG src="/icons/completed.svg" className="mt-3 mr-4" />
        </div>
        <div className="shrink-0 ml-2">
          <button onClick={() => setFile(null)}>
            <ReactSVG src="/icons/trash.svg" className="mt-3" />
          </button>
        </div>
      </div>
    </li>
  ) : null;

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <Dropzone
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          open={open}
          type="single"
        />
        <ul className="flex flex-col py-2 gap-3 grow h-12.5">{fileList}</ul>
      </div>
      <button
        className={`flex justify-center items-center ${
          file ? "bg-darkgreen" : "bg-mint"
        } rounded-lg py-2 h-12.5 mt-14`}
        onClick={uploadFiles}
        disabled={!file}
      >
        <span className={`${file ? "text-white" : "text-sage"}`}>
          {mode=="upload" ? "Upload File":"Replace File"}
        </span>
      </button>
    </div>
  );
};

export default DocumentUploader;

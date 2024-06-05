import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ReactSVG } from "react-svg";
import { useFilesUploader } from "../../hooks/useFilesUploader";
import Dropzone from "./Dropzone";

interface FileWithPath extends File {
  path: string;
}

const DocumentsUploader = ({ currentUser }) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevState) => [...prevState, ...acceptedFiles]);
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
    multiple: true,
  });

  const { uploadFiles } = useFilesUploader({ files, currentUser });

  const fileList = files.map((file: FileWithPath) => (
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
          <button
            onClick={() =>
              setFiles((prevState) =>
                prevState.filter((f) => f.path !== file.path)
              )
            }
          >
            <ReactSVG src="/icons/trash.svg" className="mt-3" />
          </button>
        </div>
      </div>
    </li>
  ));

  return (
    <div className="flex flex-col">
      <div className="text-darkgreen text-sm text-right gap-2">
        {files.length} of 4 files uploaded
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col basis-1/2">
          <Dropzone
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            open={open}
            type="multi"
          />
        </div>
        <div className="basis-1/2 flex flex-col justify-between">
          <ul className="flex flex-col py-2 gap-3">{fileList}</ul>
          <button
            className="flex justify-center gap-4 bg-darkgreen rounded-lg py-2 mr-8 mb-3"
            onClick={uploadFiles}
            disabled={files.length === 0}
          >
            <span className="text-white">Submit</span>
            <ReactSVG src="/icons/submit.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsUploader;

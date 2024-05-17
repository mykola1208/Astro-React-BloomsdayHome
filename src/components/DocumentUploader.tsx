import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ReactSVG } from "react-svg";

interface FileWithPath extends File {
  path: string;
}

const DocumentUploader = () => {
  const [files, setFiles] = useState([]);
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
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined,
  });

  const fileList = files.map((file: FileWithPath) => (
    <li key={file.path}>
      <div className="flex">
        <div className="grow flex border border-1 bg-cream-light rounded-lg gap-2">
          <ReactSVG src="../src/icons/image.svg" className="mt-3 ml-2" />
          <p className="grow text-lg font-medium text-darkgreen my-3">
            {file.path}
          </p>
          <ReactSVG src="../src/icons/completed.svg" className="mt-3 mr-4" />
        </div>
        <div className="shrink-0 ml-2">
          <ReactSVG src="../src/icons/trash.svg" className="mt-3" />
        </div>
      </div>
    </li>
  ));

  return (
    <div className="flex flex-col">
      <div className="text-darkgreen text-sm text-right gap-2">
        2 of 4 files uploaded
      </div>
      <div className="flex gap-5">
        <div className="basis-1/2 flex flex-col">
          <div
            {...getRootProps({
              className:
                "dropzone border border-sage bg-cream-light px-10 py-14 rounded-lg",
            })}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-3 ">
              <ReactSVG src="../src/icons/plus.svg" />
              <p className="text-xl font-medium text-darkgreen">
                Drag & drop your files here
              </p>
              <p className="text-sm font-medium text-darkgreen">
                Acceptable File Types: JPG, PNG, PDF, DOC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-4 mb-2">
            <hr className="grow border-t border-sage" />
            <span className="text-darkgreen">Or</span>
            <hr className="grow border-t border-sage" />
          </div>

          <button
            type="button"
            className="font-medium text-darkgreen text-xl"
            onClick={open}
          >
            Browse Your Computer
          </button>
        </div>
        <div className="basis-1/2 flex flex-col justify-between">
          <ul className="flex flex-col py-2 gap-3">{fileList}</ul>
          <button className="flex justify-center gap-4 bg-darkgreen rounded-lg py-2 mr-8 mb-3">
            <span className="text-white">Submit</span>
            <ReactSVG src="../src/icons/arrow-right.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader;

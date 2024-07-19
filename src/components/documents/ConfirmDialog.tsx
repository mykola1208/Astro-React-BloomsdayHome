import React from "react";
import { ReactSVG } from "react-svg";
import Dialog from "./Dialog";
import { useFilesUploader } from "../../hooks/useFilesUploader";

const ConfirmDialog = ({ file, id, setFile, currentUser }) => {
  const { uploadFiles, uploadStatus } = useFilesUploader({
    files: file ? [file] : [],
    currentUser: currentUser,
    id: id,
  });

  async function uploadDocument() {
    await uploadFiles();
  }

  const fileList = file ? (
    <div className="flex">
      <div className="grow flex border border-1 bg-cream-light rounded-lg gap-2">
        {file.path.slice(-3) === "pdf" ? (
          <ReactSVG src="/icons/document.svg" className="mt-3 ml-2" />
        ) : (
          <ReactSVG src="/icons/image.svg" className="mt-3 ml-2" />
        )}
        <p className="grow text-lg font-medium text-darkgreen my-3">
          {file.path}
        </p>
        <ReactSVG src="/icons/completed.svg" className="mt-3 mr-4" />
      </div>
    </div>
  ) : null;

  return (
    <>
      {file != null && (
        <Dialog width="546px" height="500px" setFile={setFile}>
          <div className="flex flex-col items-center justify-center py-2 h-full">
            <p className="text-3xl font-bold text-darkgreen">
              Confirm Document
            </p>
            {uploadStatus.uploading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center mt-24">
                  <ReactSVG
                    src="/icons/uploading.svg"
                    className="mx-auto ml-4 mb-2"
                  />
                  <p className="text-base text-darkgreen not-italic font-medium mt-11">
                    Your file is uploading.
                  </p>
                </div>
              </div>
            ) : uploadStatus.completed ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center mt-24">
                  <ReactSVG
                    src="/icons/uploading-complete.svg"
                    className="mx-auto mb-2"
                  />
                  <p className="text-base text-darkgreen not-italic font-medium mt-11">
                    Upload complete!
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-lg font-medium text-darkgreen leading-6 w-full text-center mt-24">
                  {fileList}
                </div>
                <div className="flex gap-6 mt-28">
                  <button
                    className="py-3 px-14 border-2 border-darkgreen rounded-xl"
                    onClick={() => setFile(null)}
                  >
                    <p className="px-4 text-darkgreen">Cancel</p>
                  </button>
                  <button
                    className="py-3 px-14 bg-darkgreen rounded-xl border-2 border-darkgreen"
                    onClick={uploadDocument}
                  >
                    <p className="px-4 text-white">Confirm</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ConfirmDialog;

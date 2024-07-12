import { ReactSVG } from "react-svg";

const Dropzone = ({ getRootProps, getInputProps, open, type }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <button
          type="button"
          onClick={open}
        >
          <ReactSVG src="/icons/add-file-button.svg"></ReactSVG>
        </button>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="font-medium text-darkgreen text-xl"
            onClick={open}
          >
            Click to upload your document
          </button>
          <p className="text-darkgreen text-sm">
            Acceptable File Types: JPG, PNG, PDF, DOC
          </p>
        </div>
      </div>
    </>
  );
};

export default Dropzone;

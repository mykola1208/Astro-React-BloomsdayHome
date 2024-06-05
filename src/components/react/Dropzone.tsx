import { ReactSVG } from "react-svg";

const Dropzone = ({ getRootProps, getInputProps, open, type }) => {
  return (
    <>
      <div
        {...getRootProps({
          className:
            "dropzone border border-sage bg-cream-light px-10 py-14 rounded-lg",
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3 ">
          <ReactSVG src="/icons/plus.svg" />
          <p className="text-xl font-medium text-darkgreen">
            Drag & drop your files here
          </p>
          {type == "multi" && (
            <p className="text-sm font-medium text-darkgreen">
              Acceptable File Types: JPG, PNG, PDF, DOC
            </p>
          )}
        </div>
      </div>

      <div
        className={`flex items-center gap-1 ${type == "multi" && "mt-4 mb-2"}`}
      >
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
    </>
  );
};

export default Dropzone;

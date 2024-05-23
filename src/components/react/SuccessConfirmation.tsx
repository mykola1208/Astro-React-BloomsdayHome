import { ReactSVG } from "react-svg";

const SuccessConfirmation = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <ReactSVG src="/icons/bloomsday.svg" width={82} height={82} />
      <p className="text-4xl text-darkgreen font-normal mt-9">Success!</p>
      <p className="text-base font-normal mt-3">
        Your documents were securely shared!
      </p>
      <a
        className="text-white bg-darkgreen py-3 px-12 rounded-lg mt-11"
        id="return-to-documents"
        href="/documents/get-approved"
      >
        Return to Documents
      </a>
    </div>
  );
};

export default SuccessConfirmation;

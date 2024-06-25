import React, { type PropsWithChildren } from "react";
import { ReactSVG } from "react-svg";

interface DialogProps {
  width: string;
  height: string;
  hideDialog: () => void;
}

const Dialog: React.FC<PropsWithChildren<DialogProps>> = ({
  children,
  width,
  height,
  hideDialog,
}) => {
  return (
    <div>
      <div
        className="relative z-10 rounded-xl"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        aria-hidden="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              className="modal-content relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all py-16 px-12"
              style={{ width: width, height: height }}
            >
              <div className="absolute bg-white top-8 right-8">
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={hideDialog}
                >
                  <ReactSVG
                    src="/icons/circle-x.svg"
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                </button>
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;

import React from "react";
import PropTypes from "prop-types";
import { confirmable } from "react-confirm";
import Dialog from "./Dialog";

const ConfirmDialog = ({ show, proceed, confirmation, mode, options }) => {
  return (
    <Dialog onHide={false} show={true} width="546px" height="304px">
      <div className="flex flex-col items-center justify-center py-4 h-full">
        <p className="text-3xl font-bold text-darkgreen">
          {confirmation.title}
        </p>
        <p className="text-lg font-medium text-darkgreen mt-2 leading-6 w-full text-center">
          {confirmation.description}
        </p>
        <div className="flex gap-6 mt-7">
          <button
            onClick={() => proceed(false)}
            className="py-3 px-14 border-2 border-darkgreen rounded-xl"
          >
            <p className="px-4 text-darkgreen">Cancel</p>
          </button>
          <button
            onClick={() => proceed(true)}
            className="py-3 px-14 bg-darkgreen rounded-xl border-2 border-darkgreen"
          >
            <p className="px-4 text-white">{mode}</p>
          </button>
        </div>
      </div>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  show: PropTypes.bool,
  proceed: PropTypes.func,
  confirmation: PropTypes.object,
  options: PropTypes.object,
};

export default confirmable(ConfirmDialog);

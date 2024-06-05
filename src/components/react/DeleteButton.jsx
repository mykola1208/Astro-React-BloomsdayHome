import React, { useState } from "react";
import { confirmWrapper } from "./confirm.js";

const DeleteButton = () => {
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    if (
      await confirmWrapper({
        title: "Are you sure?",
        description:
          "Are you sure you want to delete this item? This action cannot be undone.",
      })
    ) {
      setMessage("Delete");
    } else {
      setMessage("Cancel");
    }
  };
  return (
    <div>
      <button
        onClick={() => handleDelete()}
        className="border border-darkgreen text-xl ml-20 rounded-lg"
      >
        Delete
      </button>
      <div className="text-xl ml-20 rounded-lg">{message}</div>
    </div>
  );
};

export default DeleteButton;

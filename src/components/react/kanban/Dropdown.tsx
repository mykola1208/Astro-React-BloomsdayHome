import React, { type PropsWithChildren } from "react";

const Dropdown: React.FC<PropsWithChildren<{ dropdownClassName: string }>> = ({
  children,
  dropdownClassName,
}) => {
  return (
    <div
      className={`z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 pt-5 px-4 pb-4 ${dropdownClassName}`}
      style={{ boxShadow: "0px 0px 20px 0px rgba(28, 72, 53, 0.24)" }}
    >
      {children}
    </div>
  );
};

export default Dropdown;

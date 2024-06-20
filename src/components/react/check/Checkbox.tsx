import React from "react";
import { ReactSVG } from "react-svg";

const Checkbox = ({ name, checked = false, onChange }) => {
  return (
    <label className="flex items-center p-3 gap-3 border border-sage bg-cream-light rounded-[50px]">
      <input
        type="checkbox"
        name={name}
        value={name}
        checked={checked}
        onChange={onChange}
        className="appearance-none relative shrink-0 w-6 h-6 cursor-pointer"
      />
      {name}
      {checked ? (
        <ReactSVG
          src="/icons/radio-on.svg"
          className="absolute shrink-0 pointer-events-none"
        ></ReactSVG>
      ) : (
        <ReactSVG
          src="/icons/radio-off.svg"
          className="absolute shrink-0 pointer-events-none"
        ></ReactSVG>
      )}
    </label>
  );
};
export default Checkbox;

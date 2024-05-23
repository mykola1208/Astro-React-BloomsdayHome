import React from "react";
import { ReactSVG } from "react-svg";

interface CheckboxProps {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, label, onChange }) => {
  const randomId = Math.floor(Math.random() * 9999);

  return (
    <div className="flex relative items-center gap-2" id={`div${randomId}`}>
      <input
        className="appearance-none  peer shrink-0 w-5 min-h-5 cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        id={`checkbox${randomId}`}
      />
      <div className="absolute shrink-0 peer-checked:hidden pointer-events-none">
        <ReactSVG
          src="/icons/checkbox-empty.svg"
          width={20}
          height={20}
        />
      </div>
      <div className="absolute shrink-0 hidden peer-checked:block pointer-events-none">
        <ReactSVG src="/icons/checkbox-on.svg" width={20} height={20} />
      </div>

      <label
        htmlFor={`checkbox${randomId}`}
        className="text-sm font-medium text-darkgreen peer-checked:text-darkgreen"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;

import React from "react";

interface InputProps {
  label: string;
  name: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, name, className }) => {
  return (
    <div className="flex gap-1">
      <label
        htmlFor={name}
        className="text-base text-darkgreen font-medium leading-6 items-start flex"
      >
        {label}
      </label>
      <input
        name={name}
        className={`block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen focus:border-sage focus:bg-white ${className}`}
      />
    </div>
  );
};

export default Input;

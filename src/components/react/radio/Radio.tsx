import React, { forwardRef, type ReactNode, type ChangeEvent } from "react";
import { useRadioGroupContext } from "./RadioGroupContext";
import { ReactSVG } from "react-svg";

interface RadioProps {
  value: string;
  children?: ReactNode;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, children },
  ref
) {
  const { name, selectedValue, defaultValue, onChange } =
    useRadioGroupContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <label className="flex items-center p-3 gap-3 border border-sage bg-cream-light rounded-[50px]">
      <input
        ref={ref}
        type="radio"
        name={name}
        value={value}
        defaultChecked={
          defaultValue !== undefined ? value === defaultValue : undefined
        }
        checked={
          selectedValue !== undefined ? value === selectedValue : undefined
        }
        onChange={handleChange}
        className="appearance-none relative shrink-0 w-6 h-6 cursor-pointer"
      />
      {children}
      {selectedValue !== undefined && value === selectedValue ? (
        <ReactSVG src="/icons/radio-on.svg" className="absolute shrink-0 pointer-events-none"></ReactSVG>
      ) : (
        <ReactSVG src="/icons/radio-off.svg" className="absolute shrink-0 pointer-events-none"></ReactSVG>
      )}
    </label>
  );
});

export default Radio;

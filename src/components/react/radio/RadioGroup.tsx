import React, { useMemo, type ReactNode, type ChangeEvent } from "react";
import { RadioGroupContextProvider } from "./RadioGroupContext";

interface RadioGroupProps {
  name: string;
  children?: ReactNode;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  children,
  defaultValue,
  onChange,
  value: selectedValue
}) => {
  const contextValue = useMemo(
    () => ({
      name,
      selectedValue,
      defaultValue,
      onChange
    }),
    [name, selectedValue, defaultValue, onChange]
  );

  return (
    <RadioGroupContextProvider value={contextValue}>
      {children}
    </RadioGroupContextProvider>
  );
};

export default RadioGroup;

import React, { useContext, type ReactNode } from "react";

interface RadioGroupContextValue {
  name: string;
  selectedValue?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RadioGroupContextProviderProps {
  children: ReactNode;
  value: RadioGroupContextValue;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);

const RadioGroupContextProvider: React.FC<RadioGroupContextProviderProps> = ({ children, value }) => {
  return (
    <RadioGroupContext.Provider value={value}>
      {children}
    </RadioGroupContext.Provider>
  );
};

function useRadioGroupContext(): RadioGroupContextValue {
  const context = useContext(RadioGroupContext);
  if (context === undefined) {
    throw new Error("useRadioGroupContext must be used within a RadioGroupContextProvider");
  }
  return context;
}

export { useRadioGroupContext, RadioGroupContextProvider };

"use Client";

import { useEffect, useState } from "react";

type CurencyInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  RHFvalue: number | undefined;
  RHFonChange: (arg0: number) => void;
};

const DECIMAL_SIZE = 2;

export function CurrencyInput({ RHFvalue, RHFonChange }: CurencyInputProps) {
  const [value, setValue] = useState<number | undefined>(RHFvalue);
  const [displayValue, setDisplayValue] = useState<string>("");

  const handleValue = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");

    if (onlyNumbers.length === 0) {
      setValue(undefined);
      setDisplayValue("");
      return;
    }

    const padded = onlyNumbers.padStart(DECIMAL_SIZE + 1, "0");
    const integerPart = padded.slice(0, -DECIMAL_SIZE);
    const decimalPart = padded.slice(-DECIMAL_SIZE);
    const numeric = Number(`${integerPart}.${decimalPart}`);
    setValue(numeric);
    RHFonChange(numeric);
  };
  useEffect(() => {
    if (value === undefined) {
      setDisplayValue("");
      return;
    }
    setDisplayValue(value.toFixed(DECIMAL_SIZE).replace(".", ","));
  }, [value]);

  return (
    <div className="flex border-2 border-fk-primary/30   text-fk-primary  h-10 rounded-md w-full   placeholder:text-gray-400 pl-2 items-center focus-within:border-fk-primary ">
      <div className="mr-1">
        <span>R$</span>
      </div>
      <input
        type="numeric"
        placeholder="0,00"
        onChange={(e) => {
          handleValue(e.target.value);
        }}
        value={displayValue}
        className="placeholder:text-gray-400 outline-none"
      />
    </div>
  );
}

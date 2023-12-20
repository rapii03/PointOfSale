import React, { type ChangeEvent, useState } from "react";


export interface InputCashProps {
  value: number;
  onChange: (value: number) => void;
}

const InputCash = ({ value, onChange}: InputCashProps) => {
  const [formattedValue, setFormattedValue] = useState(`Rp ${value.toLocaleString("id-ID")}`);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/\D/g, "");
    if (!inputValue) {
      inputValue = "0";
    }
    const numericValue = parseInt(inputValue, 10);

    setFormattedValue(inputValue !== "" ? `Rp ${numericValue.toLocaleString("id-ID")}` : "");
    onChange(numericValue);
  };

  const handleBlur = () => {
    const numericValue = parseInt(formattedValue.replace(/\D/g, ""), 10);
    setFormattedValue(`Rp ${numericValue.toLocaleString("id-ID")}`);
    onChange(numericValue);
  };

  return (
    <div className="">
      <input
        type="text"
        id="InputCash"
        className="mt-1 flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
        value={formattedValue}
        onChange={(e) => {
          handleInputChange(e);
        }}
        onBlur={handleBlur}
        placeholder="Rp."
      />
    </div>
  );
};

export default InputCash;

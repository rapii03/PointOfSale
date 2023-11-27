import React, { useState, ReactNode } from "react";
import { usePinInput } from "react-pin-input-hook";

type Props = {
  children?: ReactNode;
};

function PinInput({ children }: Props) {
  const [values, setValues] = useState(Array(6).fill(" "));
  const [isOpen, setIsOpen] = useState(false);

  const { fields } = usePinInput({
    values,
    onChange: (values) => {
      setValues(values);
      console.log(values);
    },
  });

  const validatePin = (pin) => {
    const array = [1, 2, 3, 4, 5, 6];
    if (pin.length !== 6) {
      return false;
    }
    return pin
      .split("")
      .every((char, index) => array[index] === parseInt(char));
  };

  const handleSubmit = () => {
    const pin = values.join("");
    if (validatePin(pin)) {
      alert("Login Successful");
      console.log(pin);
    } else {
      setIsOpen(!isOpen);
      console.log(pin);
      // alert("Login Failed");
    }
  };

  return (
    <div>
      <div className="flex gap-x-3 items-center justify-center mb-4 rounded-lg">
        {fields.map((propsField, index) => (
          <input
            key={index}
            className="w-14 aspect-square rounded-md text-center text-3xl font-semibold p-1 focus:border-[#FF6B35] focus:ring-[#FF6B35] mt-4"
            {...propsField}
            placeholder="  "
          />
        ))}
      </div>
      {isOpen && (
        <p className="text-center text-red-600 my-2">
          Kode kasir yang di inputkan tidak sesuai!
        </p>
      )}
      {children}
      <button
        className="bg-[#FF6B35] w-full rounded-md p-2 font-semibold text-white"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
}
export default PinInput;

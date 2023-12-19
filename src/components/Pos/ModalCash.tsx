import React, { useState } from "react";
import InputCash from "./InputCash";

export interface ModalProps {
  value: number;
  onChange: (value: number) => void;
  onClose: () => void;
  image: string;
  username: string;
}

const ModalCash = ({ value, onChange, onClose, image, username }: ModalProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (newValue: number) => {
    if (!newValue) {
      onChange(0);
      setInputValue(0);
      return;
    }
    onChange(newValue);
    setInputValue(newValue);
  };

  const handleButtonClick = () => {
    // onChange(inputValue);
    onClose();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-modal absolute">
      <div className="card flex flex-col justify-center items-center bg-white p-5 w-[600px] rounded-[10px] border-2 border-primary">
        <div className="head flex flex-col justify-center items-center mb-3">
          <div className="title text-[35px] font-semibold">Kas Tunai</div>
          <div className="subtit text-[16px] text-gray-500">Masukkan uang tunai di tangan</div>
        </div>
        <div className="wrap-card w-[380px] flex flex-col gap-3 p-3 rounded-md border border-bg-grey">
          <div className="imgcaption mb-2 gap-2 flex items-center">
            <div className="foto">
              <img className="rounded-full w-[40px] h-[40px] object-cover" src={image as string} alt="Kasir" />
            </div>
            <div className="">
              <div className="nama text-[14px] font-semibold">{username}</div>
              <div className=" text-gray-500 kasir text-[12px]">Kasir</div>
            </div>
          </div>
          <div className="input">
            <InputCash value={inputValue} onChange={handleInputChange} />
          </div>
          <button className="btn bg-primary rounded-md text-white text-[14px]  py-2" onClick={handleButtonClick}>
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCash;

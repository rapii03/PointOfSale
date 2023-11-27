import React from "react";

type Props = {
  message: string;
};

const HelperLogin = ({ message }: Props) => (
  <p
    className={
      message !== null ? "font-light text-[#FB1919] my-4 text-center" : "hidden"
    }
  >
    {message}
  </p>
);

export default HelperLogin;

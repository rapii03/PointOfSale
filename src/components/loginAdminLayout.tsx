import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const LoginAdminLayout = ({ children }: Props) => (
  <div className="flex">
    <div className="bgLoginKiri w-1/2 h-screen flex justify-center items-center">
      {children}
    </div>
    <div className="bgLoginKanan w-1/2 h-screen flex flex-col justify-center items-center gap-y-4">
      <p className="text-white font-bold text-8xl text-justify">
        Yang's 
      </p>
      <p className="text-white font-bold text-8xl text-justify ">
        Grosir 
      </p>
    </div>
  </div>
);

export default LoginAdminLayout;

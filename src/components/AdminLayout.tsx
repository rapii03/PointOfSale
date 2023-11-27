// import * as React from "react";
import React, { ReactNode } from "react";
import AdminMenu from "./AdminMenu";
import HeaderAdmin from "./HeaderAdmin";

type Props = {
  children?: ReactNode;
};

const AdminLayout = ({ children }: Props) => (
  <div className="flex bg-[#FF6B35] w-full min-h-screen p-3 gap-x-8 justify-center">
    <div>
      <p className="text-white font-bold text-3xl text-center">Yang's grosir</p>
      <p className="text-white  text-xl text-center mt-2">Poin of Sales</p>
      <AdminMenu></AdminMenu>
    </div>
    <div className="bg-[#FAFAFA] w-4/5 h-7/8 rounded-lg p-8  ">
      <HeaderAdmin></HeaderAdmin>

      {children}
    </div>
  </div>
);

export default AdminLayout;

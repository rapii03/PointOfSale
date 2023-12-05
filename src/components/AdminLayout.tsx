// import * as React from "react";
import checkAuth from "@/hooks/checkAuth";
import redirectLogin from "@/hooks/redirectLogin";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import HeaderAdmin from "./HeaderAdmin";
import loading from "./loading";

type Props = {
  children?: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const [check, setCheck] = useState(false);
  const [username, setUsername] = useLocalStorage("username", "");
  const [nickname, setNickname] = useLocalStorage("nickname", "");
  const [imageProfile, setImageProfile] = useLocalStorage("image", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  
  useEffect(() => {
    const result: boolean = checkAuth(refreshToken);
    redirectLogin(!result || !username || (nickname !== "OPM" && nickname !== "AANG"), router);
    setCheck(result);
  })

  if (!check) {
    return loading();
  }
  
  return (
  <div className="flex bg-[#FF6B35] w-full min-h-screen p-3 gap-x-8 justify-center">
    <div>
      <p className="text-white font-bold text-3xl text-center">Yang's grosir</p>
      <p className="text-white  text-xl text-center mt-2">Poin of Sales</p>
      <AdminMenu></AdminMenu>
    </div>
    <div className="bg-[#FAFAFA] w-4/5 h-7/8 rounded-lg p-8  ">
      <HeaderAdmin profile={{username, nickname, imageProfile}}></HeaderAdmin>

      {children}
    </div>
  </div>
);
  }

export default AdminLayout;

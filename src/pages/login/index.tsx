import React, { useState } from "react";
import Head from "next/head";
import LoginAdminLayout from "../../components/loginAdminLayout";
import Link from "next/link";

export default function LoginKasir() {
  const [isHoveredAdmin, setIsHoveredAdmin] = useState(false);
  const [isHoveredKasir, setIsHoveredKasir] = useState(false);

  const AdminMouseEnter = () => {
    setIsHoveredAdmin(true);
  };

  const AdminMouseLeave = () => {
    setIsHoveredAdmin(false);
  };

  const kasirMouseEnter = () => {
    setIsHoveredKasir(true);
  };

  const kasirMouseLeave = () => {
    setIsHoveredKasir(false);
  };

  const iconAdmin = isHoveredAdmin ? "bgIconAdminHover" : "bgIconAdmin";
  const iconKasir = isHoveredKasir ? "bgIconKasirHover" : "bgIconKasir";

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <LoginAdminLayout>
          <div className="">
            <div className="mb-52">
              <p className="font-bold text-6xl">Selamat Datang</p>
              <p className="font-bold text-2xl text-[#94A3B8] mt-2">
                Login Sebagai
              </p>
            </div>
            <div className="flex space-x-10 items-center">
              <Link
                className={`h-56 w-52 ${iconAdmin}`}
                href="/login/admin"
                onMouseEnter={AdminMouseEnter}
                onMouseLeave={AdminMouseLeave}
              ></Link>
              <Link
                className={`h-56 w-52 ${iconKasir}`}
                href="/login/kasir"
                onMouseEnter={kasirMouseEnter}
                onMouseLeave={kasirMouseLeave}
              ></Link>
            </div>
          </div>
        </LoginAdminLayout>
      </main>
    </div>
  );
}

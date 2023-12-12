import React from "react";
import { useState } from "react";
import Head from "next/head";
import LoginAdminLayout from "../../../components/loginAdminLayout";
import HelperLogin from "@/components/helperLogin";
import OtpInput from "react18-input-otp";

export default function LoginKasir() {
  const [helper, setHelper] = React.useState(
    "Kode kasir yang di inputkan tidak sesuai!"
  );
  const [otp, setOtp] = useState("");

  const handleChange = (enteredOtp: any) => {
    setOtp(enteredOtp);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    // Add your login logic here, using the 'otp' state value
    const kodeKasir = otp;
    console.log("OTP value:", kodeKasir);
    console.log("Tipe Data:", typeof kodeKasir);

    alert(kodeKasir);
    setOtp("");
    // You can replace the console.log with your login API call or other logic
  };

  return (
    <div>
      <Head>
        <title>Kasir</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <LoginAdminLayout>
          <div className="w-2/3">
            <p className="font-semibold text-3xl text-center mb-3">
              Login Sebagai Kasir
            </p>
            <p className="font-thin text-center mb-8">Masukkan Pin Anda</p>
            <form>
              <div className="flex flex-col gap-3 items-center justify-center">
                <OtpInput
                  isInputNum={true}
                  value={otp}
                  onChange={handleChange}
                  numInputs={6}
                  containerStyle="gap-x-3 items-center justify-center mb-2 rounded-lg"
                  inputStyle="w-40 rounded-md aspect-square text-center text-4xl  font-semibold p-4 focus:border-[#FF6B35] focus:ring-[#FF6B35] mt-4 rounded-md"
                  separator={<span> </span>}
                />
                <HelperLogin message={helper} />
                <button
                  className="bg-[#FF6B35] w-full rounded-md p-2 font-semibold text-white"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </LoginAdminLayout>
      </main>
    </div>
  );
}

import React from "react";
import { useState } from "react";
import Head from "next/head";
import LoginAdminLayout from "../../../components/loginAdminLayout";
import HelperLogin from "@/components/helperLogin";
import OtpInput from "react18-input-otp";
import { axiosInstance } from "@/utils/axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

export default function LoginKasir() {
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [imageProfile, setImageProfile] = useLocalStorage("image", "");
  const [username, setUsername] = useLocalStorage("username", "");
  const [nickname, setNickname] = useLocalStorage("nickname", "");
  const [helper, setHelper] = React.useState('');
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();


  const handleChange = (enteredOtp: any) => {
    if (enteredOtp.length === 6) {
      setHelper('');
    }   
    setOtp(enteredOtp);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setHelper("PIN harus 6 digit");
      return;
    }

    try{
      const response = await axiosInstance.post("/auth/cashier/login", { code: otp });
      setAccessToken(response.data.data.access_token);
      setRefreshToken(response.data.data.refresh_token);
      setImageProfile(response.data.data.cashier.image);
      setUsername(response.data.data.cashier.username);
      setNickname("");
      router.push("/pos");
    } catch (e: any) {
      setHelper(e?.response?.data?.message);
      console.log(e);
    }
    setOtp("");
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
                  shouldAutoFocus={true}
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

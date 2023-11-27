import React from "react";
import { useEffect } from "react";
import Head from "next/head";
import LoginAdminLayout from "@/components/loginAdminLayout";
import HelperLogin from "@/components/helperLogin";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { axiosInstance } from "@/utils/axios";

type FormValues = {
  otp: string;
  email: string;
};

export default function Home() {
  const Email: string = "John@gmail.com";
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

  const [helper, setHelper] = React.useState(
    ""
  ); // Isi Message Dari BE

  // const pesan: string = "Kode OTP yang anda masukkan salah";

  const [validate, setValidate] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({ defaultValues: { otp: "" } });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // if (data.otp !== "180313") {
    //   setValidate(true);
    //   // alert("Login Fail");
    //   console.log(data);
    //   console.log("OTP Salah");
    // } else {
    //   // alert("Login Success");
    //   setValidate(false);
    //   console.log(data);
    //   console.log("OTP Benar");
    //   router.push("/login/buat-kata-sandi-baru");
    // }
    try {
      data.email = "string@gmail.com";
      const response = await axiosInstance.post("/auth/admin/otp-verification", data);
      console.log(response.data);
      setRefreshToken(response.data.data.refresh_token);
      setAccessToken(response.data.data.access_token);
      // router.push("/dashboard-admin");
      setHelper(response.data.message);
    } catch (error: any) {
      if(error.response.status === 400) {
        setHelper(error.response.data.message[0].message);
        // console.log(error)
      }else{
        setHelper(error.response.data.message);
      }
      // console.log(error);
    }
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ otp: "" });
    }
  }, [formState, reset]);

  return (
    <div>
      <Head>
        <title>Verifikasi OTP</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <LoginAdminLayout>
          <div className="w-2/3">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <p className="font-semibold text-3xl text-center mb-3">
                Verifikasi
              </p>
              <p className="font-thin text-center mb-2">
                Masukkan kode OTP yang dikirim ke email
              </p>
              <p className="font-semibold text-center mb-5">{Email}</p>
              <div className="flex flex-col mb-2">
                <div className="flex w-full relative">
                  <input
                    // minLength={6}
                    // maxLength={6}
                    type="text"
                    id="otp"
                    className="font-semibold tracking-[1rem] text-center w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-[#FF6B35] focus:border-[#FF6B35] "
                    placeholder="XXXXXX"
                    {...register("otp", {
                      required: true,
                      validate: {
                        minLength: (v) => v.length == 6,
                        maxLength: (v) => v.length == 6,
                        matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v),
                      },
                    })}
                  />
                </div>
              </div>
              <HelperLogin message={helper}></HelperLogin>
              <button
                className="bg-[#FF6B35] w-full rounded-md p-2 font-semibold text-white"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="flex justify-center">
              <Link
                href="/login/admin"
                className="text-center font-thin text-base mb-2 text-[#FF6B35] mt-3"
              >
                Kembali ke Halaman Login
              </Link>
            </div>
          </div>
        </LoginAdminLayout>
      </main>
    </div>
  );
}

// failed call :

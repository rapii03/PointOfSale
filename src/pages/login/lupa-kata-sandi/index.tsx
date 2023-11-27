import React from "react";
import Head from "next/head";
import LoginAdminLayout from "@/components/loginAdminLayout";
import HelperLogin from "@/components/helperLogin";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axios";
import useLocalStorage from "@/hooks/useLocalStorage";

type FormValues = {
  email: string;
};

const otp = "a7p2bk";

export default function Home() {
  const [helper, setHelper] = React.useState(""); //Isi Message Dari BE

  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

  const [validate, setValidate] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({ defaultValues: { email: "" } });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // if (data.email !== "admin@gmail.com") {
    //   setValidate(true);
    //   console.log(data);
    //   alert("Email Tidak Valid");
    //   console.log("Email Tidak Valid");
    // } else {
    //   setValidate(false);
    //   console.log(data);
    //   alert("Email Valid");
    //   console.log("Email Valid");
    //   router.push("/login/verifikasi-otp");
    // }
    try {
      const response = await axiosInstance.post(
        "/auth/admin/forget-password",
        data
      );
      // console.log(response.data);
      setRefreshToken(response.data.data.refresh_token);
      setAccessToken(response.data.data.access_token);
      setHelper(response.data.message);
      // router.push("/dashboard-admin");
    } catch (error: any) {
      if (error.response.status === 400) {
        setHelper(error.response.data.message[0].message);
        // console.log(error)
      } else {
        setHelper(error.response.data.message);
      }
      // console.log(error);
    }
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: "" });
    }
  }, [formState, reset]);

  return (
    <div>
      <Head>
        <title>Lupa Katasandi</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <LoginAdminLayout>
          <div className="w-2/3">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <p className="font-semibold text-3xl text-center mb-3">
                Lupa Kata Sandi
              </p>
              <p className="font-thin text-center mb-8">
                Masukkan alamat email anda
              </p>
              <div className="flex flex-col mb-2">
                <input
                  type="text"
                  id="email"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                  placeholder="John@gmail.com"
                  {...register("email", {
                    required: "Email is required",
                    validate: {
                      maxLength: (v) =>
                        v.length <= 50 ||
                        "The email should have at most 50 characters",
                      // matchPattern: (v) =>
                      //   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      //   "Email address must be a valid address",
                    },
                  })}
                />
              </div>
              <HelperLogin message={helper}></HelperLogin>
              <button
                className="bg-[#FF6B35] w-full rounded-md p-2 font-semibold text-white"
                type="submit"
              >
                Kirim
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

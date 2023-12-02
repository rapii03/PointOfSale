
import React from "react";
import Head from "next/head";
import Link from "next/link";
import LoginAdminLayout from "@/components/loginAdminLayout";
import HelperLogin from "@/components/helperLogin";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axios";
import useCookies from "@/hooks/useCookies";
import useLocalStorage from "@/hooks/useLocalStorage";

type FormValues = {
  email: string;
  password: string;
};

export default function Home() {
  const [Hide, setHide] = React.useState(true);
  const [helper, setHelper] = React.useState(
    ""
  ); //Isi Message Dari BE

  // const [validate, setValidate] = React.useState(false);

  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [nickname, setNickname] = useLocalStorage("nickname", "");

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({ defaultValues: { email: "", password: "" } });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // if (data.email === "admin@gmail.com" && data.password === "12345678") {
    //   setValidate(false);

    //   console.log(data);
    //   console.log("Login Success");
    //   alert("Login Success");
    //   router.push("/dashboard-admin");
    // } else {
    //   setValidate(true);
    //   console.log(data);
    //   console.log("Login Fail");
    //   alert("Login Fail");
    // }
    try {
      const response = await axiosInstance.post("/auth/admin/login", data);
      console.log(response.data);
      setRefreshToken(response.data.data.refresh_token);
      setAccessToken(response.data.data.access_token);
      setNickname(response.data.data.nickname);
      router.push("/dashboard-admin");
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
      reset({ email: "", password: "" });
    }
  }, [formState, reset]);

  return (
    <div>
      <Head>
        <title>Login Admin</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <LoginAdminLayout>
          <div className="w-2/3">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <p className="font-semibold text-3xl text-center mb-3">
                Login Sebagai Admin
              </p>
              <p className="font-thin text-center mb-2">
                Masukkan data rincian anda.
              </p>
              <div className="flex flex-col mb-2">
                <label htmlFor="email" className="font-thin text-sm mb-2">
                  Email
                </label>
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
              <div className="flex flex-col mb-2">
                <label htmlFor="password" className="font-thin text-sm mb-2">
                  Kata Sandi
                </label>
                <div className="flex w-full relative">
                  <input
                    type={Hide ? "password" : "text"}
                    id="password"
                    placeholder="•••••••••"
                    className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                    {...register("password", {
                      required: true,
                      validate: {
                        // minLength: (v) => v.length >= 6,
                        matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v),
                      },
                    })}
                  />

                  {/* ini gw ubah jadi tag <a></a> karena kalo tag <button/> bakal ngetrigger si fungsi onSubmit  */}

                  <a
                    className="absolute right-3 top-3"
                    onClick={() => setHide(!Hide)}
                  >
                    <svg
                      className={Hide ? "" : "hidden"}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="14"
                      viewBox="0 0 20 14"
                      fill="none"
                    >
                      <path
                        d="M19.3205 6.75C19.297 6.6875 18.633 5.21875 17.1642 3.74219C15.2033 1.78906 12.7267 0.75 10.0002 0.75C7.2736 0.75 4.79704 1.78906 2.8361 3.74219C1.36735 5.21875 0.703291 6.6875 0.679853 6.75C0.644973 6.82873 0.626953 6.91389 0.626953 7C0.626953 7.08611 0.644973 7.17127 0.679853 7.25C0.703291 7.3125 1.36735 8.78125 2.8361 10.2578C4.79704 12.2109 7.2736 13.25 10.0002 13.25C12.7267 13.25 15.2033 12.2109 17.1642 10.2578C18.633 8.78125 19.297 7.3125 19.3205 7.25C19.3554 7.17127 19.3734 7.08611 19.3734 7C19.3734 6.91389 19.3554 6.82873 19.3205 6.75ZM10.0002 12C7.59392 12 5.49235 11.125 3.75798 9.39844C3.04121 8.69253 2.43303 7.88426 1.95329 7C2.43238 6.11298 3.04058 5.30205 3.75798 4.59375C5.49235 2.875 7.59392 2 10.0002 2C12.4064 2 14.508 2.875 16.2424 4.59375C16.9597 5.30205 17.5679 6.11298 18.047 7C17.4845 8.05469 15.0314 12 10.0002 12ZM10.0002 3.25C9.25849 3.25 8.53346 3.46993 7.91678 3.88199C7.30009 4.29404 6.81945 4.87971 6.53562 5.56494C6.25179 6.25016 6.17753 7.00416 6.32222 7.73159C6.46692 8.45902 6.82407 9.1272 7.34852 9.65165C7.87296 10.1761 8.54115 10.5333 9.26858 10.6779C9.99601 10.8226 10.75 10.7484 11.4352 10.4645C12.1205 10.1807 12.7061 9.70007 13.1182 9.08339C13.5302 8.4667 13.7502 7.74168 13.7502 7C13.7502 6.00544 13.3551 5.05161 12.6518 4.34835C11.9486 3.64509 10.9947 3.25 10.0002 3.25ZM10.0002 9.5C9.50571 9.5 9.02236 9.35338 8.61124 9.07867C8.20012 8.80397 7.87969 8.41352 7.69047 7.95671C7.50125 7.49989 7.45174 6.99723 7.5482 6.51227C7.64467 6.02732 7.88277 5.58186 8.2324 5.23223C8.58203 4.8826 9.02749 4.6445 9.51244 4.54804C9.99739 4.45157 10.5001 4.50108 10.9569 4.6903C11.4137 4.87952 11.8041 5.19995 12.0788 5.61107C12.3535 6.0222 12.5002 6.50555 12.5002 7C12.4981 7.66241 12.2341 8.2971 11.7657 8.76549C11.2973 9.23389 10.6626 9.49794 10.0002 9.5Z"
                        fill="#8F8F8F"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="13"
                      viewBox="0 0 18 13"
                      fill="none"
                      className={Hide ? "hidden" : ""}
                    >
                      <path
                        d="M5.83451 1.71838C6.74841 1.31229 7.73739 1.10262 8.73745 1.10294C10.9102 1.10294 12.6411 2.06985 13.9286 3.20882C15.2198 4.35074 16.036 5.64044 16.3602 6.20882C16.3677 6.22103 16.3717 6.23498 16.372 6.24926C16.3717 6.2648 16.3674 6.28001 16.3595 6.29338C16.0289 6.86631 15.6527 7.4117 15.2345 7.92426C15.1859 7.98006 15.1491 8.04505 15.1262 8.11538C15.1032 8.1857 15.0947 8.25993 15.101 8.33363C15.1073 8.40733 15.1285 8.479 15.1631 8.54437C15.1977 8.60975 15.2451 8.6675 15.3025 8.71417C15.3598 8.76085 15.426 8.79551 15.4971 8.81608C15.5681 8.83665 15.6426 8.84272 15.7161 8.83392C15.7895 8.82512 15.8604 8.80163 15.9246 8.76485C15.9888 8.72808 16.0449 8.67877 16.0897 8.61985C16.5462 8.0607 16.9568 7.46563 17.3176 6.84044C17.4207 6.66131 17.4751 6.45827 17.4752 6.25157C17.4753 6.04487 17.4213 5.84176 17.3183 5.6625C16.9617 5.0375 16.0757 3.63529 14.6595 2.38309C13.2404 1.12794 11.261 0 8.73745 0C7.49113 0 6.37348 0.275 5.39039 0.708088C5.25724 0.767451 5.15301 0.877124 5.1005 1.01312C5.04798 1.14912 5.05146 1.30039 5.11016 1.43383C5.16887 1.56728 5.27802 1.67205 5.41376 1.72523C5.5495 1.77842 5.70078 1.77643 5.83451 1.71838Z"
                        fill="#8F8F8F"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.0066 10.6521C12.6551 11.6764 10.8941 12.4999 8.73745 12.4999C6.21392 12.4999 4.23378 11.372 2.81539 10.1176C1.39922 8.86464 0.512453 7.46169 0.15657 6.83669C0.0538554 6.65764 -0.000128785 6.45479 2.30706e-07 6.24836C0.000129246 6.04194 0.054367 5.83915 0.157306 5.66022C0.815323 4.52 1.63706 3.48248 2.59628 2.58081L0.882306 1.36905C0.820892 1.3282 0.768297 1.27545 0.727632 1.21391C0.686967 1.15238 0.659059 1.08331 0.64556 1.0108C0.632062 0.938286 0.633246 0.863803 0.649043 0.791757C0.66484 0.719711 0.694929 0.651566 0.73753 0.591354C0.78013 0.531143 0.834376 0.48009 0.897057 0.441215C0.959738 0.40234 1.02958 0.376434 1.10245 0.36503C1.17532 0.353626 1.24974 0.356956 1.3213 0.374822C1.39286 0.392689 1.46011 0.424729 1.51907 0.469047L16.5926 11.1308C16.654 11.1717 16.7066 11.2244 16.7473 11.2859C16.7879 11.3475 16.8158 11.4165 16.8293 11.4891C16.8428 11.5616 16.8417 11.6361 16.8259 11.7081C16.8101 11.7801 16.78 11.8483 16.7374 11.9085C16.6948 11.9687 16.6405 12.0198 16.5778 12.0586C16.5152 12.0975 16.4453 12.1234 16.3725 12.1348C16.2996 12.1462 16.2252 12.1429 16.1536 12.125C16.082 12.1072 16.0148 12.0751 15.9558 12.0308L14.0066 10.6521ZM3.51834 3.23375C2.24628 4.36684 1.43892 5.64037 1.11539 6.20728C1.10747 6.22039 1.10316 6.23535 1.10289 6.25067C1.10289 6.26169 1.1051 6.27566 1.11466 6.29111C1.43892 6.86022 2.2551 8.14919 3.54628 9.29111C4.83304 10.4301 6.56466 11.397 8.73745 11.397C10.4536 11.397 11.8919 10.794 13.0566 9.98008L10.4713 8.1514C10.0377 8.54721 9.48188 8.78289 8.89596 8.81935C8.31005 8.85581 7.72927 8.69085 7.25 8.35185C6.77072 8.01284 6.42175 7.52017 6.26099 6.95556C6.10022 6.39095 6.13732 5.78835 6.36613 5.24772L3.51834 3.23449V3.23375Z"
                        fill="#8F8F8F"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  href="/login/lupa-kata-sandi"
                  className="text-right font-thin text-sm mb-2 hover:text-[#FF6B35]"
                >
                  Lupa Kata Sandi?
                </Link>
              </div>
              <HelperLogin message={helper}></HelperLogin>
              <button
                className="bg-[#FF6B35] w-full rounded-md p-2 font-semibold text-white"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </LoginAdminLayout>
      </main>
    </div>
  );
}

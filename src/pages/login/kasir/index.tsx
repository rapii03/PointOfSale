import React from "react";
import Head from "next/head";
import LoginAdminLayout from "../../../components/loginAdminLayout";
import PinInput from "@/components/pinInputField";
import HelperLogin from "@/components/helperLogin";

// import PinInput from "react-pin-input";

export default function LoginKasir() {
  const [helper, setHelper] = React.useState('Kode kasir yang di inputkan tidak sesuai!') // Isi Message Dari BE
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
            <form action="">
              <div className="flex gap-3 items-center justify-center">
                <PinInput>
                  <HelperLogin message={helper}/>
                </PinInput>
              </div>
            </form>
          </div>
        </LoginAdminLayout>
      </main>
    </div>
  );
}

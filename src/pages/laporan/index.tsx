/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import laporan from "../../../public/assets/admin/laporanKeuangan.png";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Laporan() {
  const crumbs = [
    { text: "Home", href: "/dashboard-admin" },
    { text: "Transaksi" },
  ];
  const { register, handleSubmit, unregister, reset } = useForm();
  const onSubmit = (data: any) => {
    if (data.tanggal <= data.tanggal1) {
      console.log(data);
      alert("Data Masuk");
    } else {
      console.log("error");
    }
  };
  return (
    <AdminLayout>
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex h-fit justify-between items-center mb-6">
        <div className="flex justify-between items-center gap-x-3 text-sm">
          <div className="flex  text-sm">
            <form
              onChange={handleSubmit(onSubmit)}
              className="flex flex-nowrap justify-between items-center gap-x-3 text-sm"
            >
              <div>
                <input
                  type="date"
                  {...register("tanggal")}
                  className="bg-gray-50 border border-[#FF6B35] text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5 red-500"
                />
              </div>

              <p>to</p>

              <div>
                <input
                  type="date"
                  {...register("tanggal1")}
                  className="bg-gray-50 border border-[#FF6B35] text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                />
              </div>
            </form>
          </div>
        </div>
        <button className="w-auto h-10 bg-[#FF6B35] rounded-md flex items-center justify-center gap-x-2 px-4 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <g clip-path="url(#clip0_275_3478)">
              <path
                d="M16.4733 6.66667H4.80664C3.42331 6.66667 2.30664 7.78333 2.30664 9.16667V14.1667H5.63997V17.5H15.64V14.1667H18.9733V9.16667C18.9733 7.78333 17.8566 6.66667 16.4733 6.66667ZM13.9733 15.8333H7.30664V11.6667H13.9733V15.8333ZM16.4733 10C16.015 10 15.64 9.625 15.64 9.16667C15.64 8.70833 16.015 8.33333 16.4733 8.33333C16.9316 8.33333 17.3066 8.70833 17.3066 9.16667C17.3066 9.625 16.9316 10 16.4733 10ZM15.64 2.5H5.63997V5.83333H15.64V2.5Z"
                fill="#FAFAFA"
              />
            </g>
            <defs>
              <clipPath id="clip0_275_3478">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.639648)"
                />
              </clipPath>
            </defs>
          </svg>
          <p className="text-white">Print </p>
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        {/* <Image src={laporan} alt="laporan" /> */}
      </div>
    </AdminLayout>
  );
}

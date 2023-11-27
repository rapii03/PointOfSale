/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import laporan from "../../../public/assets/admin/laporanKeuangan.png";
// import Searchbar from "@/components/Searchbar";
// import { Pagination } from "flowbite-react";
// import { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";

export default function Laporan() {
  const crumbs = [
    { text: "Home", href: "/dashboard-admin" },
    { text: "Transaksi" },
  ];

  return (
    <AdminLayout>
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex h-fit justify-between items-center mb-6">
        <div className="flex justify-between items-center gap-x-3 text-sm">
          <div className="w-[9.188rem] h-10 bg-white border border-[#FF6B35] rounded-md flex px-2 items-center justify-between ">
            <p>01-07-2023</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M14.25 3H3.75C2.92157 3 2.25 3.67157 2.25 4.5V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V4.5C15.75 3.67157 15.0784 3 14.25 3Z"
                stroke="#FF6B35"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 1.5V4.5"
                stroke="#FF6B35"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 1.5V4.5"
                stroke="#FF6B35"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.25 7.5H15.75"
                stroke="#FF6B35"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <p>to</p>
          <div className="w-[9.188rem] h-10 bg-white border border-[#FF6B35] rounded-md flex items-center justify-between px-2">
            <p>01-07-2023</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M14.25 3H3.75C2.92157 3 2.25 3.67157 2.25 4.5V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V4.5C15.75 3.67157 15.0784 3 14.25 3Z"
                stroke="#FF6B35"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 1.5V4.5"
                stroke="#FF6B35"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 1.5V4.5"
                stroke="#FF6B35"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.25 7.5H15.75"
                stroke="#FF6B35"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
        <Image src={laporan} alt="laporan" />
      </div>
    </AdminLayout>
  );
}

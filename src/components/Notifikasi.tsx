import React, { useState } from "react";
import IconNotif from "./Icons/IconNotif";
import IconClose from "./Icons/IconClose";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";
import { SWRResponse } from "swr";
import useSWR from "swr";
import Link from "next/link";

export interface CounterProps {
  counter?: number | undefined;
}

export interface Cancel {
  id: number;
  invoice: string;
  message: string;
}

export interface Expired {
  id: string;
  nameProduct: string;
  date: string;
  desk: string;
}

let expireds: Expired[] = [
  // {
  //   id: 1,
  //   nameProduct: "Indomie Bawang",
  //   date: "12 - 10 - 2023",
  //   desk: `Produk ini memiliki tersisa tenggat waktu kadaluarsa selama 14 hari lagi.`,
  // },
  // {
  //   id: 2,
  //   nameProduct: "Sarimi",
  //   date: "12 - 10 - 2023",
  //   desk: `Produk ini memiliki tersisa tenggat waktu kadaluarsa selama 14 hari lagi.`,
  // },
];

const Notifikasi = ({ counter = undefined }: CounterProps) => {
  // const cancels: Cancel[] = [
  //   {
  //     id: 1,
  //     invoice: "#INV123",
  //     nameCashier: "Amel Putri",
  //     desk: "Barang yang diinputkan ada yang tidak sesuai dengan konsuumen an ada yang tidak sesuai dengan konsuumen",
  //   },
  //   {
  //     id: 2,
  //     invoice: "#INV431",
  //     nameCashier: "Putri",
  //     desk: "Barang yang diinputkan ada yang tidak sesuai dengan konsuumen an ada yang tidak sesuai dengan konsuumen",
  //   },
  // ];
  const [activeTab, setActiveTab] = useState("notifikasi");
  const [isModalVisible, setModalVisible] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const [accessToken, _] = useLocalStorage("accessToken", "");

  // const {
  //   data,
  //   error,
  //   isLoading,
  // }: SWRResponse<any, any, boolean> = useSWR(
  //   `/notification/invoice-delete-request`,
  //   (url) =>
  //     axiosPrivate
  //       .get(url, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       })
  //       .then((res) => res.data?.data)
  // );

  const { data, error, isLoading }: SWRResponse<any, any, boolean> = useSWR(
    `/notification/product-expired-date`,
    (url) =>
      axiosPrivate
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          expireds = res.data.data.map((item: any) => {
            const date: Date = new Date(item.expired_at);
            const year: string = date.getFullYear().toString();
            const month: string = date.getMonth().toString();
            const day: string = date.getDate().toString();
            const dateNow: Date = new Date();
            return {
              id: item.product.id,
              nameProduct: item.product.name,
              date: `${day} - ${month} - ${year}`,
              desk: `Produk ini memiliki tersisa tenggat waktu kadaluarsa selama ${
                parseInt(day) - dateNow.getDate()
              } hari lagi.`,
            };
          });
          // return res.data?.data
        })
  );

  const { data: dataCancel }: SWRResponse<Cancel[], any, boolean> = useSWR(
    `notification/invoice-delete-request`,
    (url) =>
      axiosPrivate
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data?.data)
  );

  const handleTabClick = (
    tab: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setActiveTab(tab);
  };

  const handleModalToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setModalVisible(!isModalVisible);
  };

  return (
    <div className="inline-block relative " onClick={handleModalToggle}>
      <div className="cursor-pointer">
        {counter !== undefined && (
          <div className="counter absolute text-[6px] w-3 h-3 flex justify-center items-center font-medium p-[1px] rounded-[50%] text-white bg-[#FB1919] right-0 -top-[4px] ">
            {counter}
          </div>
        )}
        <IconNotif />
      </div>
      <div>
        {isModalVisible && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="bg-white w-full md:w-[533px] p-6 rounded-md shadow-md">
              <div className="header mb-3">
                <div className="flex justify-between items-center">
                  <div className="title font-medium text-[16px]">
                    Notifikasi
                  </div>
                  <div className="icon" onClick={handleModalToggle}>
                    <IconClose className="cursor-pointer" />
                  </div>
                </div>
                <div className="w-full h-[1px] bg-[#CBD5E1] mt-2 mb-2"></div>
              </div>
              {/* main */}
              <div className="konten ">
                <div className="w-full">
                  <div className="flex wrap-btn border overflow-hidden border-[#FF6B35] rounded-[8px]">
                    <button
                      className={`${
                        activeTab === "notifikasi"
                          ? "bg-[#FF6B35] text-white"
                          : "bg-white text-[#FF6B35]"
                      } px-4 py-2 rounded-l-[5px] w-[50%] text-[14px]`}
                      onClick={(event) => handleTabClick("notifikasi", event)}
                    >
                      Pembatalan Invoice
                    </button>
                    <button
                      className={`${
                        activeTab === "pesan"
                          ? "bg-[#FF6B35] text-white"
                          : "bg-white text-[#FF6B35]"
                      } px-4 py-2 rounded-r-[5px] w-[50%] text-[14px]`}
                      onClick={(event) => handleTabClick("pesan", event)}
                    >
                      Kadaluarsa Produk
                    </button>
                  </div>
                  {/* isi konten */}
                  <div className="mt-[14px] h-[386px] overflow-y-auto mr-1">
                    {activeTab === "notifikasi" ? (
                      <div className=" notif flex flex-col gap-3">
                        {dataCancel?.map((item) => (
                          <div
                            key={item?.id}
                            className="card py-[6px] px-[11px] rounded-[5px] border-[1px] border-[#FF6B35] bg-white"
                          >
                            <div className="head">
                              <div className="flex justify-between items-center">
                                <div className="inv text-[14px] font-bold text-[#FF6B35]">
                                  {/* {item?.invoice} */}
                                  invoice null
                                </div>
                                <div className="nama text-[12px] font-medium">
                                  *nama kasir belom dari be
                                </div>
                              </div>
                              <div className="garis w-full h-[1px] bg-[#CBD5E1] mt-2 mb-2"></div>
                            </div>
                            <div className="konten">
                              <div className="desk text-[12px] ">
                                {item?.message}
                              </div>
                              <div className="btn flex justify-end mt-2">
                                {/* <button
                                  className="bg-[#FF6B35] text-white px-2 py-1 rounded text-[12px]"
                                  //   onClick={(event) => {
                                  //     event.stopPropagation();
                                  //     // Tambahkan logika untuk menangani klik tombol "Detail" di sini
                                  //   }}
                                >
                                  Detail
                                </button> */}
                                <Link
                                  href={{
                                    pathname: "/transaksi/detail-transaksi",
                                    query: { id: item.id },
                                  }}
                                  className="bg-[#FF6B35] text-white px-2 py-1 rounded text-[12px]"
                                >Detail
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="kadaluarsa flex flex-col gap-3">
                        {expireds.map((expired) => (
                          <div
                            key={expired.id}
                            className="card py-[6px] px-[11px] rounded-[5px] border-[1px] border-[#FF6B35] bg-white"
                          >
                            <div className="head">
                              <div className="flex justify-between items-center">
                                <div className="product text-[14px] font-bold text-[#FF6B35]">
                                  {expired.nameProduct}
                                </div>
                                <div className="tgl text-[12px] text-[#FB1919] font-semibold">
                                  Kadaluarsa : {expired.date}
                                </div>
                              </div>
                              <div className="garis w-full h-[1px] bg-[#CBD5E1] mt-2 mb-2"></div>
                            </div>
                            <div className="konten">
                              <div className="desk text-[12px] ">
                                {expired.desk}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifikasi;

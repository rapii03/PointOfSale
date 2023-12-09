/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import moment from "moment";

export default function Laporan() {
  const crumbs = [
    { text: "Home", href: "/dashboard-admin" },
    { text: "Transaksi" },
  ];

  const { control, handleSubmit, setValue, watch } = useForm();
  const minDate = watch("startDate");
  const startDateValue = watch("startDate");
  const endDateValue = watch("endDate");

  const handleStartDateChange = (value: any) => {
    setValue("startDate", value);
  };

  const handleEndDateChange = (value: any) => {
    setValue("endDate", value);
  };

  const onSubmit = (data: any) => {
    // Menyimpan data atau melakukan tindakan lainnya
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    console.log("Start Date :", startDate);
    console.log("End Date :", endDate);
  };

  // Memonitor perubahan nilai input dan memicu onSubmit
  useEffect(() => {
    if (startDateValue && endDateValue) {
      handleSubmit(onSubmit)();
    }
  }, [startDateValue, endDateValue, handleSubmit, onSubmit]);

  function formattedDate(data1: any, data2: any) {
    const formattedStartDate = moment(data1).format("D MMMM YYYY");
    const formattedEndDate = moment(data2).format("D MMMM YYYY");

    return { formattedStartDate, formattedEndDate };
  }

  const ubahTanggal = formattedDate(startDateValue, endDateValue);

  const awal = ubahTanggal.formattedStartDate;
  const akhir = ubahTanggal.formattedEndDate;

  // const dateA = new Date("25 November 2023");
  // const startDate = moment(dateA).format("D MMMM YYYY");

  // const dateB = new Date("10 December 2023");
  // const endDate = moment(dateB).format("D MMMM YYYY");

  const produk: any = [
    { nama: "Mie", satuan: 123, harga: "Rp.800.000" },
    { nama: "Sabun", satuan: 145, harga: "Rp.30.000" },
    { nama: "Rokok", satuan: 170, harga: "Rp.500.000" },
    { nama: "Minuman", satuan: 146, harga: "Rp.400.000" },
  ];

  const totalPenjualan: any = "3.180.000";
  const totalDiscount: any = "0";

  const jumlahTransaksi: number = 145;
  const jumlahTransaksiSelesai: number = 140;
  const jumlahTransaksiDibatalkan: number = 145;

  const jumlahInvoice: number = 145;
  const jumlahPendapatanInvoice: any = "10.350.000";
  const rataJumlahPendapatanInvoice: any = "230.000";
  const jumlahProdukTerjual: number = 145;

  // function print laporan
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <AdminLayout>
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex h-fit justify-between items-center mb-6">
        <div className="flex justify-between items-center gap-x-3 text-sm">
          <div className="flex  text-sm">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-nowrap justify-between items-center gap-x-3 text-sm"
            >
              <div>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      className="bg-gray-50 border border-[#FF6B35] text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5 red-500"
                      type="date"
                      {...field}
                      onChange={(e) => {
                        handleStartDateChange(e.target.value);
                      }}
                    />
                  )}
                />
              </div>

              <p>to</p>

              <div>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      min={minDate} // Set batas minimum
                      onChange={(e) => {
                        handleEndDateChange(e.target.value);
                      }}
                      className="bg-gray-50 border border-[#FF6B35] text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                    />
                  )}
                />
              </div>
            </form>
          </div>
        </div>
        <button
          className="w-auto h-10 bg-[#FF6B35] rounded-md flex items-center justify-center gap-x-2 px-4 text-sm"
          onClick={handlePrint}
        >
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

      <div
        className="my-2 flex flex-col h-auto items-center py-[37px] px-[55px]     shadow-sm"
        ref={componentRef}
      >
        <div className=" w-full flex flex-col gap-y-[2.313rem]">
          <div className="flex flex-col  items-center gap-[14px] py-4">
            <h1 className="text-2xl font-semibold">Laporan Keuangan</h1>
            <p className="text-sm">
              Periode {awal} - {akhir}
            </p>
          </div>
          <div className="">
            <div className="flex flex-col gap-[14px]">
              <div className="border-dashed border-y-2 py-2 border-[#707275] flex flex-col gap-[14px] text-[#707275]">
                <div className="flex justify-between text-base ">
                  <p>Total Penjualan</p>
                  <p>Rp.{totalPenjualan}</p>
                </div>
                <div className="flex justify-between">
                  <p>Total Discount</p>
                  <p>Rp.{totalDiscount}</p>
                </div>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <h2>Total </h2>
                <p>Rp.{totalPenjualan}</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col gap-[14px] text-[#707275]">
              <h3 className="border-b-2 border-[#E2E8F0] py-2 text-black font-semibold">
                Transaksi
              </h3>
              <div className="flex justify-between text-base ">
                <p>Jumlah Transaksi</p>
                <p>{jumlahTransaksi}</p>
              </div>
              <div className="flex justify-between">
                <p>Jumlah Transaksi Selesai</p>
                <p>{jumlahTransaksiSelesai}</p>
              </div>
              <div className="flex justify-between">
                <p>Jumlah Transaksi Dibatalkan </p>
                <p>{jumlahTransaksiDibatalkan}</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col gap-[14px] text-[#707275]">
              <h3 className="border-b-2 border-[#E2E8F0] py-2 text-black font-semibold">
                Invoice
              </h3>

              <div className="flex justify-between">
                <p>Jumlah Invoice</p>
                <p>{jumlahInvoice}</p>
              </div>
              <div className="flex justify-between">
                <p>Jumlah Pendapatan Invoice</p>
                <p>Rp.{jumlahPendapatanInvoice}</p>
              </div>
              <div className="flex justify-between">
                <p>Rata - Rata Jumlah Pendapatan Invoice </p>
                <p>Rp.{rataJumlahPendapatanInvoice}/Invoice</p>
              </div>
              <div className="flex justify-between">
                <p>Jumlah Produk terjual </p>
                <p>{jumlahProdukTerjual} Produk</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col gap-[14px]">
              <h3 className="border-b-2 border-[#E2E8F0] py-2 text-base font-semibold">
                Penjualan Produk Berdasarkan Kategori
              </h3>
              <div className="flex  justify-between text-[#707275]">
                <div>
                  {produk.map((produk: any) => (
                    <p>{produk.nama}</p>
                  ))}
                </div>

                <div className="flex flex-col">
                  <div>
                    {produk.map((produk: any) => (
                      <div className="flex justify-between gap-x-56">
                        <p>{produk.satuan} </p>
                        <p>{produk.harga}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between  border-dashed border-t-2 py-2 border-[#707275] text-lg font-semibold">
                <p>Total </p>
                <p>Rp.{totalPenjualan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

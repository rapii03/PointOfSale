import React from "react";
import NameProductLaporan from "./NameProductLaporan";
import JumlahdanHargaProdukLaporan from "./JumlahdanHargapProdukLaporan";

type Props = {
  children?: any;
  children1?: any;
};

const LaporanLayout = () => {
  return (
    <div className="my-2 flex flex-col h-auto items-center py-[37px] px-[55px]     shadow-sm">
      <div className=" w-full flex flex-col gap-y-[2.313rem]">
        <div className="flex flex-col  items-center gap-[14px] py-4">
          <h1 className="text-2xl font-semibold">Laporan Keuangan</h1>
          <p className="text-sm">Periode 1 April 2023 - 30 April 2023</p>
        </div>
        <div className="">
          <div className="flex flex-col gap-[14px]">
            <div className="border-dashed border-y-2 py-2 border-[#707275] flex flex-col gap-[14px] text-[#707275]">
              <div className="flex justify-between text-base ">
                <p>Total Penjualan</p>
                <p>Rp.3.180.000</p>
              </div>
              <div className="flex justify-between">
                <p>Total Discount</p>
                <p>Rp.0</p>
              </div>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <h2>Total </h2>
              <p>Rp.3.180.000</p>
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
              <p>145</p>
            </div>
            <div className="flex justify-between">
              <p>Jumlah Transaksi Selesai</p>
              <p>140</p>
            </div>
            <div className="flex justify-between">
              <p>Jumlah Transaksi Dibatalkan </p>
              <p>5</p>
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
              <p>145</p>
            </div>
            <div className="flex justify-between">
              <p>Jumlah Pendapatan Invoice</p>
              <p>Rp.10.350.000</p>
            </div>
            <div className="flex justify-between">
              <p>Rata - Rata Jumlah Pendapatan Invoice </p>
              <p>Rp.230.000/Invoice</p>
            </div>
            <div className="flex justify-between">
              <p>Jumlah Produk terjual </p>
              <p>980 Produk</p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex flex-col gap-[14px]">
            <h3 className="border-b-2 border-[#E2E8F0] py-2 text-base font-semibold">
              Penjualan Produk Berdasarkan Kategori
            </h3>
            <div className="flex justify-between text-[#707275]">
              <div>
                <p>Sabun</p>
                <p>Mie Instan</p>
                <p>Rokok</p>
                <p>Minuman</p>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between gap-x-56">
                  <p>145 </p>
                  <p>Rp.800.000</p>
                </div>
                <div className="flex justify-between gap-x-56">
                  <p>123 </p>
                  <p>Rp.480.000</p>
                </div>
                <div className="flex justify-between gap-x-56">
                  <p>145 </p>
                  <p>Rp.765.000</p>
                </div>
                <div className="flex justify-between gap-x-56">
                  <p>221 </p>
                  <p>Rp.287.000</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between  border-dashed border-t-2 py-2 border-[#707275] text-lg font-semibold">
              <p>Total </p>
              <p>Rp.3.180.000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanLayout;

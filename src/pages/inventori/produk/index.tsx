/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Searchbar from "@/components/Searchbar";
import React, { useState } from "react";
import { Pagination } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";

interface IDataForm {
  nama: string;
  kategori: string;
  tanggal: string;
  gambar: string;
  satuan: string;
  stok: number;
  harga: number;
}

interface ITableData {
  value: any;
  type: string;
}

interface ITableDatas {
  No: ITableData[];
  Nama: ITableData[];
  Kategori: ITableData[];
  Aksi: ITableData[];
}

export default function Product() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  const columns = ["No", "Nama Produk", "Kategori", "Aksi"];

  interface Produk {
    id?: number;
    nama: string;
    kategori: string[];
  }
  //Format Data Buat Produk
  const dataProduk: Produk[] = [
    { id: 1, nama: "Indomie", kategori: ["Makanan", "Mie"] },
    { id: 2, nama: "Indomie", kategori: ["Makanan", "Mie"] },
    { id: 3, nama: "Indomie", kategori: ["Makanan", "Mie"] },
    { id: 4, nama: "Indomie", kategori: ["Makanan", "Mie"] },
  ];

  const crumbs = [
    { text: "Home", href: "/dashboard-admin" },
    { text: "Inventori", href: "/inventori/produk" },
    { text: "Produk" },
  ];

  const paginationTheme = {
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px border border-[#FF6B35] rounded-md",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg bg-white py-2 px-1 leading-tight text-gray-500",
        icon: "h-5 w-5 text-[#FF6B35]",
      },
      next: {
        base: "rounded-r-lg bg-white py-2 px-1 leading-tight text-gray-500",
        icon: "h-5 w-5 text-[#FF6B35]",
      },
      selector: {
        base: "w-7 bg-white py-2 leading-tight text-gray-500",
        active: "text-[#FF6B35] hover:text-[#FF6B35] hover:bg-white",
        disabled: "opacity-50 cursor-normal",
      },
    },
  };

  return (
    <AdminLayout>
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex h-fit justify-between items-center mb-6">
        <Searchbar placeholder="Cari Produk" />
        <Link
          href="/inventori/produk/tambah-produk"
          className="bg-[#FF6B35] h-fit px-3 py-1 rounded-md text-white text-md flex justify-center items-center gap-2"
        >
          <svg
            xmlns="http:www.w3.org/2000/svg"
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
          >
            <path
              d="M14.1667 8.83329H0.833333C0.377778 8.83329 0 8.45551 0 7.99996C0 7.5444 0.377778 7.16663 0.833333 7.16663H14.1667C14.6222 7.16663 15 7.5444 15 7.99996C15 8.45551 14.6222 8.83329 14.1667 8.83329Z"
              fill="white"
            />
            <path
              d="M7.50033 15.5C7.04477 15.5 6.66699 15.1222 6.66699 14.6667V1.33333C6.66699 0.877778 7.04477 0.5 7.50033 0.5C7.95588 0.5 8.33366 0.877778 8.33366 1.33333V14.6667C8.33366 15.1222 7.95588 15.5 7.50033 15.5Z"
              fill="white"
            />
          </svg>
          Tambah
        </Link>
      </div>

      <div className="overflow-x-auto  border rounded-md border-[#FF6B35] max-h-[50vh] ">
        <table className="table-auto min-w-full border-collapse ">
          <thead className="sticky top-0">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={
                    column === "No"
                      ? "bg-[#ff6b3546] px-0 font-semibold text-sm text-[#FF6B35] py-2 w-[7%]"
                      : column == "Aksi"
                      ? "bg-[#ff6b3546] px-0 font-semibold text-sm text-[#FF6B35] py-2 text-center"
                      : "bg-[#ff6b3546] px-0 font-semibold text-sm text-[#FF6B35] py-2 text-left"
                  }
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataProduk.map((col, colIndex, id) => (
              <tr>
                <td className="border-collapse  px-0 text-center">
                  <div className="flex justify-center items-center   h-12 border-b">
                    {colIndex + 1}
                  </div>
                </td>
                <td className="border-collapse  px-0 text-left">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.nama}
                  </div>
                </td>
                <td className="border-collapse  px-0 text-center">
                  <div className="flex justify-start items-center gap-x-5 h-12 border-b">
                    <p className="text-white text-md bg-[#FF6B35] h-6 p-2 rounded-md flex justify-center items-center">
                      {col.kategori[0]}
                    </p>
                    <p className="text-white text-md bg-[#FF6B35] h-6 p-2 rounded-md flex justify-center items-center">
                      {col.kategori[1]}
                    </p>
                  </div>
                </td>
                <td className="border-collapse  px-0 text-center">
                  <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                    <Link
                      href={`/inventori/produk/detail-produk-${col.id}`}
                      className="text-md text-blue-700"
                    >
                      Detail
                    </Link>
                    {/* <Link
                      href="/inventori/produk/detail-produk"
                      className="text-md text-blue-700"
                    >
                      Detail
                    </Link> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex overflow-x-auto sm:justify-end">
        <Pagination
          theme={paginationTheme}
          layout="pagination"
          currentPage={currentPage}
          totalPages={10}
          onPageChange={onPageChange}
          previousLabel=""
          nextLabel=""
          showIcons
        />
      </div>
    </AdminLayout>
  );
}

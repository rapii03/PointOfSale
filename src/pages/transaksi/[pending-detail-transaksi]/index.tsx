/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
// import Searchbar from "@/components/Searchbar";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import Link from "next/link";
// import { useForm, SubmitHandler } from "react-hook-form";

export default function PendingDetailTransaksi() {
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
  const crumbs = [
    { text: "Home", href: "/dashboard-admin" },
    { text: "Transaksi", href: "/transaksi" },
    { text: "Detail" },
  ];

  const columns = ["No", "Produk", "Jumlah", "Harga", "Satuan", "Total"];
  interface detailTransaksi {
    id?: number;
    produk: string;
    jumlah: number;
    harga: string;
    satuan: string;
    total: string;
  }
  const dataTransaksi: detailTransaksi[] = [
    {
      id: 1,
      produk: "Indomie",
      jumlah: 5,
      harga: "Rp.87.000",
      satuan: "Pcs",
      total: "Rp.230.000",
    },
    {
      id: 2,
      produk: "Indomie",
      jumlah: 5,
      harga: "Rp.87.000",
      satuan: "Pcs",
      total: "Rp.230.000",
    },
    {
      id: 3,
      produk: "Indomie",
      jumlah: 5,
      harga: "Rp.87.000",
      satuan: "Pcs",
      total: "Rp.230.000",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <Breadcrumbs crumbs={crumbs} />
        <Link
          href="/transaksi"
          className="w-[4.625rem] h-8 bg-[#FF6B35] text-white rounded-md text-sm text-center py-1.5"
        >
          Kembali
        </Link>
      </div>
      <div className="flex h-fit justify-between items-center mb-6 ">
        <div className="flex">
          <div className=" mr-14">
            <p>Invoice</p>
            <p>Tanggal</p>
            <p>Status</p>
            <p className="font-bold">Total Pembelian</p>
          </div>
          <div className="">
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className="mx-4">
            <p>#INV124</p>
            <p>20-10-2020</p>
            <p>sukses</p>
            <p className="font-bold">Rp. 230.000</p>
          </div>
        </div>
        <button className="w-auto h-10 bg-[#FF6B35] rounded-md flex items-center justify-center gap-x-2 px-4 text-sm mt-[3.563rem]">
          <p className="text-white">Konfirmasi Pembatalan</p>
        </button>
      </div>
      <div className="overflow-x-auto  border rounded-md border-[#FF6B35] max-h-[50vh]">
        <table className="table-auto min-w-full border-collapse">
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
            {dataTransaksi.map((col, colIndex) => (
              <tr>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-center items-center   h-12 border-b">
                    {colIndex + 1}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.produk}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.jumlah}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center h-12 border-b">
                    {col.harga}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.satuan}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.total}
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

      {/* Edit Modal */}

      {/* Add Modal */}

      {/* Delete Modal */}
    </AdminLayout>
  );
}

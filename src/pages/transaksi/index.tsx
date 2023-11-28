/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
// import Searchbar from "@/components/Searchbar";
import { Pagination } from "flowbite-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Transaksi() {
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
    { text: "Transaksi" },
  ];

  const columns = [
    "No",
    "Invoice",
    "Tanggal",
    "Produk",
    "Total",
    "Status",
    "Aksi",
  ];
  
  interface kelolaTransaksi {
    id?: number;
    invoice: string;
    tanggal: string;
    produk: string;
    total: number;
    status: string;
  }
  //Format Data Buat Transaksi
  const dataTransaksi: kelolaTransaksi[] = [
    {
      id: 1,
      invoice: "#INV1214",
      tanggal: "10-11-2023",
      produk: "Mie",
      total: 10,
      status: "Sukses",
    },

    {
      id: 2,
      invoice: "#INV1214",
      tanggal: "10-11-2023",
      produk: "Mie",
      total: 10,
      status: "Dibatalkan",
    },

    {
      id: 3,
      invoice: "#INV1214",
      tanggal: "10-11-2023",
      produk: "Mie",
      total: 10,
      status: "Pending",
    },
    {
      id: 4,
      invoice: "#INV1214",
      tanggal: "10-11-2023",
      produk: "Mie",
      total: 10,
      status: "Sukses",
    },
    {
      id: 5,
      invoice: "#INV1214",
      tanggal: "10-11-2023",
      produk: "Mie",
      total: 10,
      status: "Pending",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndtDate] = useState();

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
        <button className="w-[9.21rem] h-10 bg-[#FF6B35] rounded-md flex items-center justify-center gap-x-2 px-2 text-sm">
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
          <p className="text-white">Print Semua</p>
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
                <td className="border-collapse  px-0 text-center">
                  <div className="flex justify-center items-center   h-12 border-b">
                    {colIndex + 1}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.invoice}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.tanggal}
                  </div>
                </td>
                <td className="border-collapse p2 px-0 text-center">
                  <div className="flex justify-start items-center h-12 border-b">
                    {col.produk}
                  </div>
                </td>
                <td className="border-collapse p2 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.total}
                  </div>
                </td>
                <td className="border-collapse p2 px-0 text-center">
                  <div
                    className={
                      col.status === "Sukses"
                        ? "flex justify-start items-center h-12 border-b text-[#10B981]"
                        : col.status === "Dibatalkan"
                        ? "flex justify-start items-center h-12 border-b text-[#FB1919]"
                        : "flex justify-start items-center h-12 border-b "
                    }
                  >
                    {col.status}
                  </div>
                </td>
                {col.status != "Pending" && (
                  <td className="border-collapse p2 px-0 text-center">
                    <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                      <button className="text-[#FF6B35] text-md">Print</button>
                      <Link
                        href="/transaksi/detail-transaksi"
                        className="text-blue-700 text-md"
                      >
                        Detail
                      </Link>
                    </div>
                  </td>
                )}
                {col.status == "Pending" && (
                  <td className="border-collapse p2 px-0 text-center">
                    <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                      <Link
                        href="/transaksi/pending-detail-transaksi"
                        className="text-blue-700 text-md"
                      >
                        Detail
                      </Link>
                    </div>
                  </td>
                )}
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

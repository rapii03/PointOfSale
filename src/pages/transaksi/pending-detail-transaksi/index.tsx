/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
// import Searchbar from "@/components/Searchbar";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SWRResponse, mutate } from "swr";
import useSWR from "swr";
import { useRouter } from "next/router";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";
// import { useForm, SubmitHandler } from "react-hook-form";

interface product {
  sum: number;
  unit: string;
  name: string;
  price: number;
  quantity: number;
}

interface dataDetail {
  id?: string;
  create_at: string;
  status: string;
  code: string;
  sum: string;
  discount: string;
  // cashier: cashier;
  products: product[];
  meta: any;
}

export default function PendingDetailTransaksi() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [accessToken, _] = useLocalStorage("accessToken", "");
  const [currentPage, setCurrentPage] = useState(1);
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

  const {
    data: dataDetail,
    error,
    isLoading,
  }: SWRResponse<dataDetail, any, boolean> = useSWR(
    `/invoice/detail?page=${currentPage}`,
    (url) => {
      if (router.isReady) {
        return axiosPrivate
          .post(
            url,
            {
              id: router.query.id,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data.data);
            return res.data.data;
          });
      }
    }
  );

  useEffect(() => {
    mutate(async () => {
      const data = await axiosPrivate.post(
        `/invoice/detail`,
        {
          id: router.query.id
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(data.data?.data);
      return data.data?.data;
    });
  }, [router.isReady]);

  const onPageChange = (page: number) => setCurrentPage(page);

  const handleKonfirmasi = async () =>{
    await axiosPrivate.put("/invoice/delete-invoice/confirm",{
      id: router.query.id
    },{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    router.push("/transaksi")
  }

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
            <p>{dataDetail?.code}</p>
            <p>{dataDetail?.create_at.split("T")[0]}</p>
            <p>{dataDetail?.status}</p>
            <p className="font-bold">Rp. {dataDetail?.sum}</p>
          </div>
        </div>
        <button onClick={handleKonfirmasi} className="w-auto h-10 text-white bg-[#FF6B35] rounded-md flex items-center justify-center gap-x-2 px-4 text-sm mt-[3.563rem]">
          Konfirmasi Pembatalan
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
            {dataDetail?.products.map((col, colIndex) => (
              <tr>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-center items-center   h-12 border-b">
                    {colIndex + 1}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.name}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.quantity}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center h-12 border-b">
                    {col.price}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.unit}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    Rp. {col.sum}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex overflow-x-auto sm:justify-end">
        {dataDetail?.meta.totalPages > 1 && (
          <Pagination
            theme={paginationTheme}
            layout="pagination"
            currentPage={currentPage}
            totalPages={dataDetail?.meta.totalPages}
            onPageChange={onPageChange}
            previousLabel=""
            nextLabel=""
            showIcons
          />
        )}
      </div>
    </AdminLayout>
  );
}

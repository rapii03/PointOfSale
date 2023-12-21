/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
// import Searchbar from "@/components/Searchbar";
import { Pagination } from "flowbite-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import Invoice from "@/components/Invoice";
import useSWR from "swr";
import { SWRResponse, mutate } from "swr";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";

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

  interface Transaksi {
    id?: string;
    sum: number;
    code: string;
    create_at: string;
    product: number;
    status: string;
  }

  interface DataTransaksi {
    items: Transaksi[];
    meta: any;
    from_date: string;
    to_date: string;
  }

  const axiosPrivate = useAxiosPrivate();
  const [accessToken, _] = useLocalStorage("accessToken", "");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const requestData =
    startDate !== "" && endDate !== "" ? { from: startDate, to: endDate } : {};
    
  const { data, mutate }: SWRResponse<DataTransaksi, any, boolean> = useSWR(
    `/invoice/all?page=${currentPage}`,
    (url) =>
      axiosPrivate
        .post(url, requestData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data?.data)
  );

  // const [data, setData] = useState<DataTransaksi>({
  //   items: [],
  //   meta: {},
  //   from_date: "",
  //   to_date: "",
  // });

  // const fetchWithBody = async () => {
  //   const fetchData = await axiosPrivate.post(
  //     `/invoice/all?page=${currentPage}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       data: {
  //         from: startDate,
  //         to: endDate,
  //       },
  //     });
  //     console.log(fetchData.data?.data);
  // };

  // const fetchWithoutBody = async (): Promise<void> => {
  //   const fetchdata = await axiosPrivate.post(`/invoice/all?page=${currentPage}`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   console.log(fetchdata.data?.data);
  //   const items = fetchdata.data?.data?.items;
  //   setData({
  //     items,
  //     meta: fetchdata.data?.data?.meta,
  //     from_date: fetchdata.data?.data?.from_date,
  //     to_date: fetchdata.data?.data?.to_date,
  //   });
  // };

  // useEffect(() => {
  //   (async () => {
  //     await fetchWithoutBody();
  //   })();
  // }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    mutate();
    // fetchWithoutBody();
  };

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
    if (data.startDate && data.endDate) {
      // Menyimpan data atau melakukan tindakan lainnya
      const startDate = new Date(data.startDate).toISOString();
      const endDate = new Date(data.endDate).toISOString();
      setStartDate(startDate);
      setEndDate(endDate);
      mutate(async () => {
        const data = await axiosPrivate.post(
          `/invoice/all?page=${currentPage}`,
          {
            from: startDate,
            to: endDate,
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
      return;
    }
    mutate();
  };

  // Memonitor perubahan nilai input dan memicu onSubmit
  useEffect(() => {
    if (startDateValue && endDateValue) {
      handleSubmit(onSubmit)();
    }
    if (!startDateValue) {
      setStartDate("");
      setEndDate("");
    }
    if (!endDateValue) {
      setStartDate("");
      setEndDate("");
    }
    if(!startDateValue && !endDateValue){
      mutate();
    }
    console.log(startDate, endDate);
  }, [startDateValue, endDateValue]);

  // function print
  const componentRef = useRef();

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  return (
    <AdminLayout>
      <div className="absolute invisible">
        <Invoice ref={componentRef} />
      </div>
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex h-fit justify-between items-center mb-6">
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
            {/* <button type="submit">Submit</button> */}
          </form>
        </div>
        <button
          className="w-[9.21rem] h-10 bg-[#FF6B35] rounded-md flex items-center justify-center gap-x-2 px-2 text-sm"
          // onClick={handlePrint}
          onClick={() => console.log(data)}
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
            {data?.items?.map((item, index) => (
              <tr>
                <td className="border-collapse  px-0 text-center">
                  <div className="flex justify-center items-center   h-12 border-b">
                    {index + 1}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {item.code}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {item.create_at.split("T")[0]}
                  </div>
                </td>
                <td className="border-collapse p2 px-0 text-center">
                  <div className="flex justify-start items-center h-12 border-b">
                    {item.product}
                  </div>
                </td>
                <td className="border-collapse p2 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    Rp. {item.sum}
                  </div>
                </td>
                <td className="border-collapse p2 px-0 text-center">
                  {item.status === "success" && (
                    <p className="flex justify-start items-center h-12 border-b text-[#10B981]">Sukses</p>
                  )}
                  {item.status === "deleted" && (
                    <p className="flex justify-start items-center h-12 border-b text-[#FB1919]">Dibatalkan</p>
                  )}
                  {item.status !== "success" && item.status !== "deleted" && (
                    <p className="flex justify-start items-center h-12 border-b ">Pending</p>
                  )}
                </td>
                {item.status != "pending" && (
                  <td className="border-collapse p2 px-0 text-center">
                    <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                      <button
                        className="text-[#FF6B35] text-md"
                        // onClick={handlePrint}
                      >
                        Print
                      </button>
                      <Link
                        href={{
                          pathname: "/transaksi/detail-transaksi",
                          query: { id: item.id },
                        }}
                        className="text-blue-700 text-md"
                      >
                        Detail
                      </Link>
                    </div>
                  </td>
                )}
                {item.status == "pending" && (
                  <td className="border-collapse p2 px-0 text-center">
                    <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                      <Link
                        // href={`/transaksi/pending-detail-transaksi`}
                        href={{
                          pathname: "/transaksi/pending-detail-transaksi",
                          query: { id: item.id },
                        }}
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
        {data?.meta?.totalPages > 1 && (
          <Pagination
            theme={paginationTheme}
            layout="pagination"
            currentPage={currentPage}
            totalPages={data?.meta?.totalPages}
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

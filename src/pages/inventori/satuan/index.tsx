/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Searchbar from "@/components/Searchbar";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AxiosRequestConfig } from "axios";
import { Modal, Pagination } from "flowbite-react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useSWR from "swr";
import { SWRResponse, mutate } from "swr";

export default function Satuan() {
  interface Data {
    id?: string;
    name: string;
  }

  interface Satuan {
    items: Data[];
    meta: any;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  //Format Data Buat Satuan

  // const dataSatuan: Satuan[] = [
  //   { id: 1, nama: "Pcs" },
  //   { id: 2, nama: "Dus" },
  //   { id: 3, nama: "Pax" },
  // ];

  const axiosPrivate = useAxiosPrivate();
  const [accessToken, _] = useLocalStorage("accessToken", "");
  const {
    data: dataSatuan,
    error,
    isLoading,
  }: SWRResponse<Satuan, any, boolean> = useSWR(
    `/product/unit/all?page=${currentPage}&search=${search}`,
    (url) =>
      axiosPrivate
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data?.data)
  );

  useEffect(() => {
    // console.log(dataSatuan);
    // console.log(error);
    return () => {};
  }, [isLoading]);

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
    { text: "Inventori", href: "/inventory/produk" },
    { text: "Satuan" },
  ];

  const columns = ["No", "Nama Satuan", "Aksi"];

  const onPageChange = (page: number) => setCurrentPage(page);

  const [openModal, setOpenModal] = useState(false);
  function onCloseModal() {
    setOpenModal(false);
    setInitName("");
    setUpdateId("");
  }
  const [openAddModal, setOpenAddModal] = useState(false);
  function onCloseAddModal() {
    setSatuan("");
    setOpenAddModal(false);
  }

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function onCloseDeleteModal() {
    setOpenDeleteModal(false);
    setInitName("");
    setUpdateId("");
  }

  const { register, handleSubmit } = useForm<Data>();

  const { register: registerEdit, handleSubmit: handleSubmitEdit } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = async (data) => {
    try {
      await axiosPrivate.post("/product/unit/add", data);
    } catch (e: any) {
      let statusText: string | undefined = e?.response?.statusText;
      let msg: string | undefined = e?.response?.data?.message;
      let status: number | undefined = e?.response?.status;
      if (status === 400) {
        msg = e?.response?.data?.message[0]?.message;
      }
      alert(statusText + " : " + status + "\nPesan : " + msg);
    }
    mutate(`/product/unit/all?page=${currentPage}&search=${search}`);
    onCloseAddModal();
  };

  const onSubmitEdit: SubmitHandler<Data> = async (data) => {
    data.id = updateId;
    try {
      await axiosPrivate.put("/product/unit/update", data);
    } catch (e: any) {
      let statusText: string | undefined = e?.response?.statusText;
      let msg: string | undefined = e?.response?.data?.message;
      let status: number | undefined = e?.response?.status;
      if (status === 400) {
        msg = e?.response?.data?.message[0]?.message;
      }
      alert(statusText + " : " + status + "\nPesan : " + msg);
    }
    mutate(`/product/unit/all?page=${currentPage}&search=${search}`);
    onCloseModal();
  };

  const handleDelete = async () => {
    const data: AxiosRequestConfig<any> = {
      data: { id: updateId },
    };
    try {
      await axiosPrivate.delete("/product/unit/delete", data);
    } catch (e: any) {
      let statusText: string | undefined = e?.response?.statusText;
      let msg: string | undefined = e?.response?.data?.message;
      let status: number | undefined = e?.response?.status;
      if (status === 400) {
        msg = e?.response?.data?.message[0]?.message;
      }
      alert(statusText + " : " + status + "\nPesan : " + msg);
    }
    mutate(`/product/unit/all?page=${currentPage}&search=${search}`);
    onCloseDeleteModal();
  };

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const [updateId, setUpdateId] = useState("");
  const [initName, setInitName] = useState("");
  const [satuan, setSatuan] = useState("");

  return (
    <AdminLayout>
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex h-fit justify-between items-center mb-6">
        <Searchbar placeholder="Cari Satuan" onChange={handleSearch} />
        <button
          className="bg-[#FF6B35] h-fit px-3 py-1 rounded-md text-white text-md flex justify-center items-center gap-2"
          onClick={() => setOpenAddModal(true)}
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
            {isLoading && (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  {error?.response?.data?.message}
                </td>
              </tr>
            )}
            {!isLoading &&
              dataSatuan?.items?.map((col, colIndex) => (
                <tr key={colIndex}>
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
                    <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                      <button
                        className="text-[#FF6B35] text-md"
                        onClick={(e) => {
                          setInitName(col.name);
                          setUpdateId(col.id as string);
                          setOpenModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-[#FB1919] text-md"
                        onClick={() => {
                          setUpdateId(col.id as string);
                          setOpenDeleteModal(true);
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex overflow-x-auto sm:justify-end">
        {dataSatuan?.meta?.totalPages > 1 && (
          <Pagination
            theme={paginationTheme}
            layout="pagination"
            currentPage={currentPage}
            totalPages={dataSatuan?.meta?.totalPages}
            onPageChange={onPageChange}
            previousLabel=""
            nextLabel=""
            showIcons
          />
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        dismissible
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
      >
        <Modal.Body className="p-4 border-2 rounded-lg border-[#FF6B35]">
          <div className="space-y-6">
            <form
              className="flex flex-col gap-y-3 "
              onSubmit={handleSubmitEdit(onSubmitEdit)}
            >
              <p className="w-1/3 rounded-lg font-semibold">Edit Satuan</p>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-[#334155] dark:text-white">
                  Nama Satuan
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                  placeholder="Nama Produk"
                  defaultValue={initName}
                  value={initName}
                  onFocus={(e) => (e.target.value = initName)}
                  {...registerEdit("name", {
                    required: true,
                    onChange(event) {
                      setInitName(event.target.value);
                    },
                  })}
                />
              </div>
              <button
                type="submit"
                className="bg-[#FF6B35] w-fit text-white px-4 p-2 self-end rounded-md"
              >
                Simpan
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      {/* Add Modal */}
      <Modal
        dismissible
        show={openAddModal}
        size="md"
        onClose={onCloseAddModal}
        popup
      >
        <Modal.Body className="p-4 border-2 rounded-lg border-[#FF6B35]">
          <div className="space-y-6">
            <form
              className="flex flex-col gap-y-3 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="w-2/3 rounded-lg font-semibold">Tambah Satuan</p>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-[#334155] dark:text-white">
                  Nama Satuan
                </label>
                <input
                  type="text"
                  value={satuan}
                  onFocus={(e) => (e.target.value = satuan)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                  placeholder="Nama Produk"
                  {...register("name", {
                    required: true,
                    onChange(event) {
                      setSatuan(event.target.value);
                    },
                  })}
                ></input>
              </div>
              <button
                type="submit"
                className="bg-[#FF6B35] w-fit text-white px-4 p-2 self-end rounded-md"
              >
                Simpan
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal
        dismissible
        show={openDeleteModal}
        size="md"
        onClose={onCloseDeleteModal}
        popup
      >
        <Modal.Body className="p-4 border-2 rounded-lg border-[#FF6B35]">
          <div className="space-y-6 flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              viewBox="0 0 150 150"
              fill="none"
            >
              <path
                d="M81.25 106.25H68.75V93.75H81.25V106.25ZM81.25 81.25H68.75L68.75 43.75L81.25 43.75L81.25 81.25ZM75 137.5C109.5 137.5 137.5 109.5 137.5 75C137.5 40.5 109.5 12.5 75 12.5C40.5 12.5 12.5 40.5 12.5 75C12.5 109.5 40.5 137.5 75 137.5ZM75 25C102.562 25 125 47.4375 125 75C125 102.562 102.562 125 75 125C47.4375 125 25 102.562 25 75C25 47.4375 47.4375 25 75 25Z"
                fill="#FB1919"
              />
            </svg>
            <p className="rounded-lg font-semibold">
              Anda yakin mau menghapus item ini ?
            </p>
            <div className="flex gap-6">
              <button
                className="bg-[#E2E8F0] w-fit text-black px-4 p-2 self-end rounded-md"
                onClick={onCloseDeleteModal}
              >
                Kembali
              </button>
              <button
                className="bg-[#FF6B35] w-fit text-white px-4 p-2 self-end rounded-md"
                onClick={handleDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
}

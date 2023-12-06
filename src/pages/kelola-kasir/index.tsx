/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Searchbar from "@/components/Searchbar";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Modal, Pagination } from "flowbite-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SWRResponse, mutate } from "swr";
import useSWR from "swr";
import { AxiosRequestConfig } from "axios";
import { useEdgeStore } from "@/lib/edgestore";

export default function KelolaKasir() {
  interface Data {
    id?: string;
    username: string;
    code: string;
    image?: string;
  }

  interface Kasir {
    items: Data[];
    meta: any;
  }

  const axiosPrivate = useAxiosPrivate();
  const [accessToken, _] = useLocalStorage("accessToken", "");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [namaKasir, setNamaKasir] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [initName, setInitName] = useState("");

  const {
    data: dataKasir,
    error,
    isLoading,
  }: SWRResponse<Kasir, any, boolean> = useSWR(
    `/cashier/all?page=${currentPage}&search=${search}`,
    (url) =>
      axiosPrivate
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data?.data)
  );

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

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
    { text: "Kelola Kasir" },
  ];

  const columns = ["No", "Nama Akun Kasir", "Kode Kasir", "Aksi"];

  const onPageChange = (page: number) => setCurrentPage(page);

  const [openModal, setOpenModal] = useState(false);
  function onCloseModal() {
    setOpenModal(false);
    setInitName("");
    setUpdateId("");
  }
  const [openAddModal, setOpenAddModal] = useState(false);
  function onCloseAddModal() {
    setOpenAddModal(false);
    setNamaKasir("");
  }

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  function onCloseDeleteModal() {
    setOpenDeleteModal(false);
  }

  const { register, handleSubmit } = useForm<Data>();
  const { register: registerEdit, handleSubmit: handleSubmitEdit } =
    useForm<Data>();

  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File | null>(null);
  const [path, setPath] = useState("");
  const [updateImg, setUpdateImg] = useState("");

  const handleFileUpload = async (file: File) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          console.log(progress);
        },
      });
      // console.log(res.url);
      setPath(res.url);
    }
  };

  const handleFileReplace = async (file: File, path: string) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: path,
        },
      });
      setPath(res.url);
      // console.log(res.url);
    }
  };

  const handleFileDelete = async (path: string) => {
    await edgestore.publicFiles.delete({
      url: path,
    });
  };

  const onSubmit: SubmitHandler<Data> = async (data) => {
    try {
      await handleFileUpload(file as File);
      data.image = path;
      // console.log(data);
      await axiosPrivate.post("/cashier/add", data);
    } catch (e: any) {
      let statusText: string | undefined = e?.response?.statusText;
      let msg: string | undefined = e?.response?.data?.message;
      let status: number | undefined = e?.response?.status;
      if (status === 400) {
        msg = e?.response?.data?.message[0]?.message;
      }
      alert(statusText + " : " + status + "\nPesan : " + msg);
    }
    mutate(`/cashier/all?page=${currentPage}&search=${search}`);
    onCloseAddModal();
  };

  const onSubmitEdit: SubmitHandler<Data> = async (data) => {
    data.id = updateId;
    try {
      await handleFileReplace(file as File, updateImg);
      data.image = path;
      await axiosPrivate.put("/cashier/update", data);
    } catch (e: any) {
      let statusText: string | undefined = e?.response?.statusText;
      let msg: string | undefined = e?.response?.data?.message;
      let status: number | undefined = e?.response?.status;
      if (status === 400) {
        msg = e?.response?.data?.message[0]?.message;
      }
      alert(statusText + " : " + status + "\nPesan : " + msg);
    }
    mutate(`/cashier/all?page=${currentPage}&search=${search}`);
    onCloseModal();
  };

  const handleDelete = async () => {
    const data: AxiosRequestConfig<any> = {
      data: { id: updateId },
    };
    try {
      await axiosPrivate.delete("/cashier/delete", data);
    } catch (e: any) {
      let statusText: string | undefined = e?.response?.statusText;
      let msg: string | undefined = e?.response?.data?.message;
      let status: number | undefined = e?.response?.status;
      if (status === 400) {
        msg = e?.response?.data?.message[0]?.message;
      }
      alert(statusText + " : " + status + "\nPesan : " + msg);
    }
    mutate(`/cashier/all?page=${currentPage}&search=${search}`);
    onCloseDeleteModal();
  };

  return (
    <AdminLayout>
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex h-fit justify-between items-center mb-6">
        <Searchbar placeholder="Cari Akun Kasir" onChange={handleSearch} />
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
            {dataKasir?.items?.map((col, colIndex) => (
              <tr>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-center items-center   h-12 border-b">
                    {colIndex + 1}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.username}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.code}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                    <button
                      className="text-[#FF6B35] text-md"
                      onClick={(e) => {
                        setInitName(col.username);
                        setUpdateId(col.id as string);
                        setUpdateImg(col.image as string);
                        setOpenModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-[#FB1919] text-md"
                      onClick={() => {
                        setUpdateId(col.id as string);
                        setUpdateImg(col.image as string);
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
        {dataKasir?.meta?.totalPages > 1 && (
          <Pagination
            theme={paginationTheme}
            layout="pagination"
            currentPage={currentPage}
            totalPages={dataKasir?.meta?.totalPages}
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
        size="2xl"
        onClose={onCloseModal}
        popup
      >
        <Modal.Body className="p-4 border-2 rounded-lg border-[#FF6B35]">
          <div className="space-y-6">
            <form
              className="flex flex-col gap-y-3 "
              onSubmit={handleSubmitEdit(onSubmitEdit)}
            >
              <p className="w-2/3 rounded-lg font-semibold">Edit Kasir</p>
              <div className="flex w-full gap-5">
                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nama Kasir
                  </label>
                  <input
                    defaultValue={initName}
                    onFocus={(e) => (e.target.value = initName)}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                    placeholder="Nama Kasir"
                    {...registerEdit("username", {
                      required: true,
                      onChange(event) {
                        setInitName(event.target.value);
                      },
                    })}
                  ></input>
                </div>
                <div className="w-1/2 ">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Foto Kasir
                  </label>
                  <div className="">
                    <div className="p-2 ps-0 flex items-center gap-3">
                      <label
                        htmlFor="file-upload"
                        className="bg-[#FF6B35] text-white rounded-md p-2 px-4 text-md "
                      >
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            setFile(e.target.files?.[0] ?? null);
                          }}
                        />
                        Unggah
                      </label>
                      <p className="text-md text-[#B7B7B7]">
                        {file === null ? "Unggah Gambar" : file?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className=" w-fit bg-[#FF6B35] text-white p-2 rounded-md"
                >
                  + Tambah
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      {/* Add Modal */}
      <Modal
        dismissible
        show={openAddModal}
        size="2xl"
        onClose={onCloseAddModal}
        popup
      >
        <Modal.Body className="p-4 border-2 rounded-lg border-[#FF6B35]">
          <div className="space-y-6">
            <form
              className="flex flex-col gap-y-3 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="w-2/3 rounded-lg font-semibold">Tambah Kasir</p>
              <div className="flex w-full gap-5">
                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nama Kasir
                  </label>
                  <input
                    type="text"
                    value={namaKasir}
                    onFocus={(e) => (e.target.value = namaKasir)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                    placeholder="Nama Kasir"
                    {...register("username", {
                      required: true,
                      onChange(event) {
                        setNamaKasir(event.target.value);
                      },
                    })}
                  ></input>
                </div>
                <div className="w-1/2 ">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Foto Kasir
                  </label>
                  <div className="">
                    <div className="p-2 ps-0 flex items-center gap-3">
                      <label
                        htmlFor="file-upload"
                        className="bg-[#FF6B35] text-white rounded-md p-2 px-4 text-md "
                      >
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            setFile(e.target.files?.[0] ?? null);
                          }}
                        />
                        Unggah
                      </label>
                      <p className="text-md text-[#B7B7B7]">
                        {file === null ? "Unggah Gambar" : file?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className=" w-fit bg-[#FF6B35] text-white p-2 rounded-md"
                >
                  + Tambah
                </button>
              </div>
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

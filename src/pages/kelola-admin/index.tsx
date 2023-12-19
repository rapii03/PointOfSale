/* eslint-disable react/jsx-key */
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import loading from "@/components/loading";
import Searchbar from "@/components/Searchbar";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AxiosRequestConfig } from "axios";
import { Modal, Pagination } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useSWR from "swr";
import { SWRResponse, mutate } from "swr";
import { useEdgeStore } from "@/lib/edgestore";
import ToastComponent from "@/components/Toast";

export default function KelolaAdmin() {
  const [showToast, setShowToast] = useState(false);
  const [showToastFailed, setShowToastFailed] = useState(false);
  const [showToastEdit, setShowToastEdit] = useState(false);
  const [showToastEditFailed, setShowToastEditFailed] = useState(false);
  const [showToastDelete, setShowToastDelete] = useState(false);
  const [showToastDeleteFailed, setShowToastDeleteFailed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [nickname, setNickname] = useLocalStorage("nickname", "");

  useEffect(() => {
    if (nickname === "OPM") {
      setIsAdmin(true);
    } else {
      router.push("/dashboard-admin");
    }
  });

  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File | null>(null);
  const [fileNotReady, setFileNotReady] = useState<boolean>(false);
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
      return res.url;
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
      return res.url;
      // console.log(res.url);
    }
  };

  const handleFileDelete = async (path: string) => {
    await edgestore.publicFiles.delete({
      url: path,
    });
  };

  const axiosPrivate = useAxiosPrivate();
  const [accessToken, _] = useLocalStorage("accessToken", "");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [namaAdmin, setNamaAdmin] = useState("");
  const [kataSandiAdmin, setKataSandiAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [initName, setInitName] = useState("");
  const [initPass, setInitPass] = useState("");
  const [initEmail, setInitEmail] = useState("");

  interface Data {
    id?: string;
    username: string;
    email: string;
    password: string;
    image?: string;
  }

  interface Admin {
    items: Data[];
    meta: any;
  }

  const {
    data: dataAdmin,
    error,
    isLoading,
  }: SWRResponse<Admin, any, boolean> = useSWR(
    `/admin/all?page=${currentPage}&search=${search}`,
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
    { text: "Kelola Admin" },
  ];

  const columns = ["No", "Nama Akun Admin", "Email", "Aksi"];

  //Format Data Buat Kelola Admin

  const onPageChange = (page: number) => setCurrentPage(page);

  const [openModal, setOpenModal] = useState(false);
  function onCloseModal() {
    setOpenModal(false);
  }
  const [openAddModal, setOpenAddModal] = useState(false);
  function onCloseAddModal() {
    setNamaAdmin("");
    setKataSandiAdmin("");
    setEmailAdmin("");
    setOpenAddModal(false);
  }

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  function onCloseDeleteModal() {
    setOpenDeleteModal(false);
  }

  const { register, handleSubmit } = useForm<Data>();
  const { register: registerEdit, handleSubmit: handleSubmitEdit } =
    useForm<Data>();
  const onSubmit: SubmitHandler<Data> = async (data) => {
    if (!file) {
      setFileNotReady(true);
      return;
    }
    try {
      const url = await handleFileUpload(file as File);
      data.image = url;
      await axiosPrivate.post("/admin/add", data);
    } catch (e: any) {
      // let statusText: string | undefined = e?.response?.statusText;
      // let msg: string | undefined = e?.response?.data?.message;
      // let status: number | undefined = e?.response?.status;
      // if (status === 400) {
      //   msg = e?.response?.data?.message[0]?.message;
      // }
      // alert(statusText + " : " + status + "\nPesan : " + msg);
      setShowToastFailed(true);
      return;
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(true);
    }, 2000);
    mutate(`/admin/all?page=${currentPage}&search=${search}`);
    onCloseAddModal();
  };
  const onSubmitEdit: SubmitHandler<Data> = async (data) => {
    data.id = updateId;
    try {
      const url = await handleFileReplace(file as File, updateImg);
      data.image = url;
      await axiosPrivate.put("/admin/update", data);
    } catch (e: any) {
      // let statusText: string | undefined = e?.response?.statusText;
      // let msg: string | undefined = e?.response?.data?.message;
      // let status: number | undefined = e?.response?.status;
      // if (status === 400) {
      //   msg = e?.response?.data?.message[0]?.message;
      // }
      // alert(statusText + " : " + status + "\nPesan : " + msg);
      setShowToastEditFailed(true);
      return;
    }
    setShowToastEdit(true);
    setTimeout(() => {
      setShowToastEdit(false);
    }, 2000);
    mutate(`/admin/all?page=${currentPage}&search=${search}`);
    onCloseModal();
  };
  const handleDelete = async () => {
    const data: AxiosRequestConfig<any> = {
      data: { id: updateId },
    };
    try {
      await axiosPrivate.delete("/admin/delete", data);
    } catch (e: any) {
      // let statusText: string | undefined = e?.response?.statusText;
      // let msg: string | undefined = e?.response?.data?.message;
      // let status: number | undefined = e?.response?.status;
      // if (status === 400) {
      //   msg = e?.response?.data?.message[0]?.message;
      // }
      // alert(statusText + " : " + status + "\nPesan : " + msg);
      setShowToastDeleteFailed(true);
    }
    setShowToastDelete(true);
    setTimeout(() => {
      setShowToastDelete(false);
    });
    mutate(`/admin/all?page=${currentPage}&search=${search}`);
    onCloseDeleteModal();
  };

  if (!isAdmin) {
    return loading();
  }

  return (
    <AdminLayout>
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex h-fit justify-between items-center mb-6">
        <Searchbar placeholder="Cari Akun Admin" onChange={handleSearch} />
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
            {dataAdmin?.items?.map((col, colIndex) => (
              <tr>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-center items-center   h-12 border-b">
                    {dataAdmin?.meta?.itemsPerPage * (currentPage - 1) +
                      colIndex +
                      1}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.username}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-start items-center   h-12 border-b">
                    {col.email}
                  </div>
                </td>
                <td className="border-collapse px-0 text-center">
                  <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                    <button
                      className="text-[#FF6B35] text-md"
                      onClick={(e) => {
                        setInitName(col.username);
                        setInitEmail(col.email);
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
        {dataAdmin?.meta?.totalPages > 1 && (
          <Pagination
            theme={paginationTheme}
            layout="pagination"
            currentPage={currentPage}
            totalPages={dataAdmin?.meta?.totalPages}
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
              <p className="w-2/3 rounded-lg font-semibold">Edit Admin</p>
              <div className="flex w-full gap-5">
                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nama Admin
                  </label>
                  <input
                    type="text"
                    defaultValue={initName}
                    onFocus={(e) => (e.target.value = initName)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5 mb-2"
                    placeholder="Nama Admin"
                    {...registerEdit("username", {
                      required: true,
                      onChange(event) {
                        setInitName(event.target.value);
                      },
                    })}
                  ></input>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Kata Sandi
                  </label>
                  <input
                    type="text"
                    defaultValue={initPass}
                    onFocus={(e) => (e.target.value = initPass)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                    placeholder="Kata Sandi"
                    {...registerEdit("password", {
                      onChange(event) {
                        setInitPass(event.target.value);
                      },
                      required: true,
                    })}
                  ></input>
                </div>
                <div className="w-1/2 ">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    defaultValue={initEmail}
                    onFocus={(e) => (e.target.value = initEmail)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5 mb-2"
                    placeholder="Email"
                    {...registerEdit("email", {
                      required: true,
                      onChange(event) {
                        setInitEmail(event.target.value);
                      },
                    })}
                  ></input>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Foto Admin
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
                          accept=".png, .jpg, .jpeg"
                          className="hidden"
                          onChange={(e) => {
                            setFile(e.target.files?.[0] ?? null);
                          }}
                        />
                        Unggah
                      </label>
                      <p className="text-md text-[#B7B7B7]">
                        {file === null && !fileNotReady
                          ? "Unggah Gambar"
                          : file?.name}
                      </p>
                      <p className="text-md text-red-500">
                        {file === null && fileNotReady
                          ? "Gambar wajib diisi"
                          : ""}
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
              <p className="w-2/3 rounded-lg font-semibold">Tambah Admin</p>
              <div className="flex w-full gap-5">
                <div className="w-1/2 flex flex-col">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nama Admin
                  </label>
                  <input
                    type="text"
                    value={namaAdmin}
                    onFocus={(e) => (e.target.value = namaAdmin)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5 mb-2"
                    placeholder="Nama Admin"
                    {...register("username", {
                      required: true,
                      onChange(event) {
                        setNamaAdmin(event.target.value);
                      },
                    })}
                  ></input>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Kata Sandi
                  </label>
                  <input
                    type="text"
                    value={kataSandiAdmin}
                    onFocus={(e) => (e.target.value = kataSandiAdmin)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                    placeholder="Kata Sandi"
                    {...register("password", {
                      required: true,
                      onChange(event) {
                        setKataSandiAdmin(event.target.value);
                      },
                    })}
                  ></input>
                </div>
                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    value={emailAdmin}
                    onFocus={(e) => (e.target.value = emailAdmin)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5 mb-2"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      onChange(event) {
                        setEmailAdmin(event.target.value);
                      },
                    })}
                  ></input>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Foto Admin
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
                          accept=".png, .jpg, .jpeg"
                          className="hidden"
                          onChange={(e) => {
                            setFile(e.target.files?.[0] ?? null);
                          }}
                        />
                        Unggah
                      </label>
                      <p className="text-md text-[#B7B7B7]">
                        {file === null && !fileNotReady
                          ? "Unggah Gambar"
                          : file?.name}
                      </p>
                      <p className="text-md text-red-500">
                        {file === null && fileNotReady
                          ? "Gambar wajib diisi"
                          : ""}
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
      {showToast && (
        <ToastComponent
          className="absolute bottom-[6%] right-[8%]"
          text="Berhasil menambahkan admin."
          onDismiss={() => setShowToast(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M13.0013 2.16626C7.0213 2.16626 2.16797 7.01959 2.16797 12.9996C2.16797 18.9796 7.0213 23.8329 13.0013 23.8329C18.9813 23.8329 23.8346 18.9796 23.8346 12.9996C23.8346 7.01959 18.9813 2.16626 13.0013 2.16626ZM10.0655 17.6471L6.1763 13.7579C5.7538 13.3354 5.7538 12.6529 6.1763 12.2304C6.5988 11.8079 7.2813 11.8079 7.7038 12.2304L10.8346 15.3504L18.288 7.89709C18.7105 7.47459 19.393 7.47459 19.8155 7.89709C20.238 8.31959 20.238 9.00209 19.8155 9.42459L11.593 17.6471C11.1813 18.0696 10.488 18.0696 10.0655 17.6471Z"
              fill="#10B981"
            />
          </svg>
        </ToastComponent>
      )}
      {showToastFailed && (
        <ToastComponent
          className="absolute bottom-[6%] right-[8%]"
          text="Gagal menambahkan admin."
          onDismiss={() => setShowToastFailed(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.1735 18.4965C2.16738 17.4904 1.36928 16.2959 0.824765 14.9814C0.280256 13.6668 1.06012e-08 12.2579 0 10.835C-1.06012e-08 9.41213 0.280256 8.00319 0.824765 6.68862C1.36927 5.37406 2.16738 4.17962 3.1735 3.1735C4.17962 2.16738 5.37406 1.36927 6.68862 0.824765C8.00319 0.280256 9.41213 -1.06012e-08 10.835 0C12.2579 1.06012e-08 13.6668 0.280256 14.9814 0.824765C16.2959 1.36928 17.4904 2.16738 18.4965 3.1735C20.5285 5.20545 21.67 7.96138 21.67 10.835C21.67 13.7086 20.5285 16.4645 18.4965 18.4965C16.4645 20.5285 13.7086 21.67 10.835 21.67C7.96138 21.67 5.20545 20.5285 3.1735 18.4965ZM8.16695 6.73135C7.9744 6.55193 7.71972 6.45425 7.45657 6.45889C7.19342 6.46353 6.94234 6.57014 6.75624 6.75624C6.57014 6.94234 6.46353 7.19342 6.45889 7.45657C6.45425 7.71972 6.55193 7.9744 6.73135 8.16695L9.3994 10.835L6.73135 13.503C6.63155 13.596 6.55151 13.7082 6.49599 13.8328C6.44047 13.9574 6.41062 14.0919 6.40822 14.2283C6.40581 14.3647 6.4309 14.5001 6.48198 14.6266C6.53307 14.7531 6.60911 14.868 6.70556 14.9644C6.80202 15.0609 6.91691 15.1369 7.04339 15.188C7.16987 15.2391 7.30535 15.2642 7.44173 15.2618C7.57812 15.2594 7.71262 15.2295 7.83722 15.174C7.96182 15.1185 8.07396 15.0384 8.16695 14.9387L10.835 12.2706L13.503 14.9387C13.596 15.0384 13.7082 15.1185 13.8328 15.174C13.9574 15.2295 14.0919 15.2594 14.2283 15.2618C14.3647 15.2642 14.5001 15.2391 14.6266 15.188C14.7531 15.1369 14.868 15.0609 14.9644 14.9644C15.0609 14.868 15.1369 14.7531 15.188 14.6266C15.2391 14.5001 15.2642 14.3647 15.2618 14.2283C15.2594 14.0919 15.2295 13.9574 15.174 13.8328C15.1185 13.7082 15.0384 13.596 14.9387 13.503L12.2706 10.835L14.9387 8.16695C15.0384 8.07396 15.1185 7.96182 15.174 7.83722C15.2295 7.71262 15.2594 7.57812 15.2618 7.44173C15.2642 7.30535 15.2391 7.16987 15.188 7.04339C15.1369 6.91691 15.0609 6.80202 14.9644 6.70556C14.868 6.60911 14.7531 6.53307 14.6266 6.48198C14.5001 6.4309 14.3647 6.40581 14.2283 6.40822C14.0919 6.41062 13.9574 6.44047 13.8328 6.49599C13.7082 6.55151 13.596 6.63155 13.503 6.73135L10.835 9.3994L8.16695 6.73135Z"
              fill="#FB1919"
            />
          </svg>
        </ToastComponent>
      )}
      {showToastEdit && (
        <ToastComponent
          className="absolute bottom-[6%] right-[8%]"
          text="Berhasil memperbarui admin."
          onDismiss={() => setShowToastEdit(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M13.0013 2.16626C7.0213 2.16626 2.16797 7.01959 2.16797 12.9996C2.16797 18.9796 7.0213 23.8329 13.0013 23.8329C18.9813 23.8329 23.8346 18.9796 23.8346 12.9996C23.8346 7.01959 18.9813 2.16626 13.0013 2.16626ZM10.0655 17.6471L6.1763 13.7579C5.7538 13.3354 5.7538 12.6529 6.1763 12.2304C6.5988 11.8079 7.2813 11.8079 7.7038 12.2304L10.8346 15.3504L18.288 7.89709C18.7105 7.47459 19.393 7.47459 19.8155 7.89709C20.238 8.31959 20.238 9.00209 19.8155 9.42459L11.593 17.6471C11.1813 18.0696 10.488 18.0696 10.0655 17.6471Z"
              fill="#10B981"
            />
          </svg>
        </ToastComponent>
      )}
      {showToastDelete && (
        <ToastComponent
          className="absolute bottom-[6%] right-[8%]"
          text="Berhasil menghapus admin."
          onDismiss={() => setShowToastDelete(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M13.0013 2.16626C7.0213 2.16626 2.16797 7.01959 2.16797 12.9996C2.16797 18.9796 7.0213 23.8329 13.0013 23.8329C18.9813 23.8329 23.8346 18.9796 23.8346 12.9996C23.8346 7.01959 18.9813 2.16626 13.0013 2.16626ZM10.0655 17.6471L6.1763 13.7579C5.7538 13.3354 5.7538 12.6529 6.1763 12.2304C6.5988 11.8079 7.2813 11.8079 7.7038 12.2304L10.8346 15.3504L18.288 7.89709C18.7105 7.47459 19.393 7.47459 19.8155 7.89709C20.238 8.31959 20.238 9.00209 19.8155 9.42459L11.593 17.6471C11.1813 18.0696 10.488 18.0696 10.0655 17.6471Z"
              fill="#10B981"
            />
          </svg>
        </ToastComponent>
      )}
      {showToastEditFailed && (
        <ToastComponent
          className="absolute bottom-[6%] right-[8%]"
          text="Gagal memperbarui admin."
          onDismiss={() => setShowToastEditFailed(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.1735 18.4965C2.16738 17.4904 1.36928 16.2959 0.824765 14.9814C0.280256 13.6668 1.06012e-08 12.2579 0 10.835C-1.06012e-08 9.41213 0.280256 8.00319 0.824765 6.68862C1.36927 5.37406 2.16738 4.17962 3.1735 3.1735C4.17962 2.16738 5.37406 1.36927 6.68862 0.824765C8.00319 0.280256 9.41213 -1.06012e-08 10.835 0C12.2579 1.06012e-08 13.6668 0.280256 14.9814 0.824765C16.2959 1.36928 17.4904 2.16738 18.4965 3.1735C20.5285 5.20545 21.67 7.96138 21.67 10.835C21.67 13.7086 20.5285 16.4645 18.4965 18.4965C16.4645 20.5285 13.7086 21.67 10.835 21.67C7.96138 21.67 5.20545 20.5285 3.1735 18.4965ZM8.16695 6.73135C7.9744 6.55193 7.71972 6.45425 7.45657 6.45889C7.19342 6.46353 6.94234 6.57014 6.75624 6.75624C6.57014 6.94234 6.46353 7.19342 6.45889 7.45657C6.45425 7.71972 6.55193 7.9744 6.73135 8.16695L9.3994 10.835L6.73135 13.503C6.63155 13.596 6.55151 13.7082 6.49599 13.8328C6.44047 13.9574 6.41062 14.0919 6.40822 14.2283C6.40581 14.3647 6.4309 14.5001 6.48198 14.6266C6.53307 14.7531 6.60911 14.868 6.70556 14.9644C6.80202 15.0609 6.91691 15.1369 7.04339 15.188C7.16987 15.2391 7.30535 15.2642 7.44173 15.2618C7.57812 15.2594 7.71262 15.2295 7.83722 15.174C7.96182 15.1185 8.07396 15.0384 8.16695 14.9387L10.835 12.2706L13.503 14.9387C13.596 15.0384 13.7082 15.1185 13.8328 15.174C13.9574 15.2295 14.0919 15.2594 14.2283 15.2618C14.3647 15.2642 14.5001 15.2391 14.6266 15.188C14.7531 15.1369 14.868 15.0609 14.9644 14.9644C15.0609 14.868 15.1369 14.7531 15.188 14.6266C15.2391 14.5001 15.2642 14.3647 15.2618 14.2283C15.2594 14.0919 15.2295 13.9574 15.174 13.8328C15.1185 13.7082 15.0384 13.596 14.9387 13.503L12.2706 10.835L14.9387 8.16695C15.0384 8.07396 15.1185 7.96182 15.174 7.83722C15.2295 7.71262 15.2594 7.57812 15.2618 7.44173C15.2642 7.30535 15.2391 7.16987 15.188 7.04339C15.1369 6.91691 15.0609 6.80202 14.9644 6.70556C14.868 6.60911 14.7531 6.53307 14.6266 6.48198C14.5001 6.4309 14.3647 6.40581 14.2283 6.40822C14.0919 6.41062 13.9574 6.44047 13.8328 6.49599C13.7082 6.55151 13.596 6.63155 13.503 6.73135L10.835 9.3994L8.16695 6.73135Z"
              fill="#FB1919"
            />
          </svg>
        </ToastComponent>
      )}
      {showToastDeleteFailed && (
        <ToastComponent
          className="absolute bottom-[6%] right-[8%]"
          text="Gagal menghapus admin."
          onDismiss={() => setShowToastDeleteFailed(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.1735 18.4965C2.16738 17.4904 1.36928 16.2959 0.824765 14.9814C0.280256 13.6668 1.06012e-08 12.2579 0 10.835C-1.06012e-08 9.41213 0.280256 8.00319 0.824765 6.68862C1.36927 5.37406 2.16738 4.17962 3.1735 3.1735C4.17962 2.16738 5.37406 1.36927 6.68862 0.824765C8.00319 0.280256 9.41213 -1.06012e-08 10.835 0C12.2579 1.06012e-08 13.6668 0.280256 14.9814 0.824765C16.2959 1.36928 17.4904 2.16738 18.4965 3.1735C20.5285 5.20545 21.67 7.96138 21.67 10.835C21.67 13.7086 20.5285 16.4645 18.4965 18.4965C16.4645 20.5285 13.7086 21.67 10.835 21.67C7.96138 21.67 5.20545 20.5285 3.1735 18.4965ZM8.16695 6.73135C7.9744 6.55193 7.71972 6.45425 7.45657 6.45889C7.19342 6.46353 6.94234 6.57014 6.75624 6.75624C6.57014 6.94234 6.46353 7.19342 6.45889 7.45657C6.45425 7.71972 6.55193 7.9744 6.73135 8.16695L9.3994 10.835L6.73135 13.503C6.63155 13.596 6.55151 13.7082 6.49599 13.8328C6.44047 13.9574 6.41062 14.0919 6.40822 14.2283C6.40581 14.3647 6.4309 14.5001 6.48198 14.6266C6.53307 14.7531 6.60911 14.868 6.70556 14.9644C6.80202 15.0609 6.91691 15.1369 7.04339 15.188C7.16987 15.2391 7.30535 15.2642 7.44173 15.2618C7.57812 15.2594 7.71262 15.2295 7.83722 15.174C7.96182 15.1185 8.07396 15.0384 8.16695 14.9387L10.835 12.2706L13.503 14.9387C13.596 15.0384 13.7082 15.1185 13.8328 15.174C13.9574 15.2295 14.0919 15.2594 14.2283 15.2618C14.3647 15.2642 14.5001 15.2391 14.6266 15.188C14.7531 15.1369 14.868 15.0609 14.9644 14.9644C15.0609 14.868 15.1369 14.7531 15.188 14.6266C15.2391 14.5001 15.2642 14.3647 15.2618 14.2283C15.2594 14.0919 15.2295 13.9574 15.174 13.8328C15.1185 13.7082 15.0384 13.596 14.9387 13.503L12.2706 10.835L14.9387 8.16695C15.0384 8.07396 15.1185 7.96182 15.174 7.83722C15.2295 7.71262 15.2594 7.57812 15.2618 7.44173C15.2642 7.30535 15.2391 7.16987 15.188 7.04339C15.1369 6.91691 15.0609 6.80202 14.9644 6.70556C14.868 6.60911 14.7531 6.53307 14.6266 6.48198C14.5001 6.4309 14.3647 6.40581 14.2283 6.40822C14.0919 6.41062 13.9574 6.44047 13.8328 6.49599C13.7082 6.55151 13.596 6.63155 13.503 6.73135L10.835 9.3994L8.16695 6.73135Z"
              fill="#FB1919"
            />
          </svg>
        </ToastComponent>
      )}
    </AdminLayout>
  );
}

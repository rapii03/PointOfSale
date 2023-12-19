import React from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
// import FormTambahProdukAdmin from "@/components/formTambahProdukAdmin";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useEffect, useState } from "react";
import { Label, Modal, TextInput, Select } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SWRResponse } from "swr";
import useSWR from "swr";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/router";
import CustomSelect from "@/components/multipleSelect";
import ToastComponent from "@/components/Toast";

interface Unit {
  id: string;
  name: string;
}

interface Group {
  price?: number;
  stock?: number;
  unit?: string;
}

interface Kategori {
  id: string;
  name: string;
}

interface IDataForm {
  name?: string;
  image?: string;
  expired_at?: string;
  categories?: string[];
  group: Group[];
}

interface ListKategori {
  data: Kategori[];
}

interface ListUnit {
  data: Unit[];
}

export default function FormTambahProdukAdminPage() {
  const [showToast, setShowToast] = useState(false);
  const [showToastFailed, setShowToastFailed] = useState(false);
  const crumbs = [
    { text: "Home", href: "/dashboard-admin" },
    { text: "Inventori", href: "/inventori/produk" },
    { text: "Produk", href: "/inventori/produk" },
    { text: "Tambah" },
  ];

  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [accessToken, _] = useLocalStorage("accessToken", "");
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [dataForm, setDataForm] = useState<IDataForm>({
    name: "",
    image: "",
    // categories: [],
    group: [],
  });
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File | null>(null);
  const [fileNotReady, setFileNotReady] = useState<boolean>(false);
  const handleFileUpload = async (file: File) => {
    if (file) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            console.log(progress);
          },
        });
        return res.url;
      } catch (e) {
        alert(e);
      }
    }
  };

  const {
    data: dataKategori,
    error,
    isLoading,
  }: SWRResponse<ListKategori, any, boolean> = useSWR(
    `/product/category/list`,
    (url) =>
      axiosPrivate
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data)
  );

  const {
    data: dataUnit,
    error: errorUnit,
    isLoading: isLoadingUnit,
  }: SWRResponse<ListUnit, any, boolean> = useSWR(`/product/unit/list`, (url) =>
    axiosPrivate
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
  );

  function onCloseModal() {
    setOpenModal(false);
  }

  const columns = ["No", "Satuan", "Jumlah Stok", "Harga Barang", "Aksi"];
  const [targetUpdate, setTargetUpdate] = useState(0);
  // let selectedKategori: string[] = [];
  const [selectedKategori, setSelectedKategori] = useState<string[]>([]);

  const handleOpenUpdateModal = (num: number) => {
    setStock(dataForm.group[num].stock);
    setTargetUpdate(num);
    setOpenUpdateModal(true);
  };

  const [stock, setStock] = useState<any>(0);
  const { register, handleSubmit, resetField } = useForm<IDataForm>();
  const {
    register: registerModal,
    handleSubmit: handleSubmitDataModal,
    resetField: resetFieldModal,
  } = useForm<Group>();

  const {
    register: registerUpdateModal,
    handleSubmit: handleSubmitUpdateModal,
    resetField: resetFieldUpdateModal,
  } = useForm<Group>();

  const onSubmit: SubmitHandler<IDataForm> = async (data) => {
    if (!file) {
      setFileNotReady(true);
      return;
    }
    dataForm.name = data.name;
    delete dataForm.categories;
    delete dataForm.expired_at;
    if (selectedKategori.length > 0) {
      dataForm.categories = selectedKategori;
    }
    const url = await handleFileUpload(file as File);
    dataForm.image = url;
    if (data.expired_at) {
      dataForm.expired_at = new Date(data.expired_at).toISOString();
    }
    try{
      await axiosPrivate.post("/product/group/add", dataForm);
    }catch(e){
      setShowToastFailed(true);
      return;
    }
    setShowToast(true);
    setTimeout(() => {
      router.push("/inventori/produk");
    },2000)
  };

  const onSubmitModal: SubmitHandler<Group> = (data) => {
    setDataForm({ ...dataForm, group: [...dataForm.group, data] });
    onCloseModal();
    resetFieldModal("stock");
    resetFieldModal("price");
  };

  const onSubmitUpdateModal: SubmitHandler<Group> = (data) => {
    setDataForm({
      ...dataForm,
      group: dataForm.group.map((item, index) => {
        if (index === targetUpdate) {
          return {
            ...item,
            ...data,
          };
        }
        return item;
      }),
    });
    resetFieldUpdateModal("stock");
    setOpenUpdateModal(false);
  };

  const handleDelete = (num: number) => {
    setDataForm({
      ...dataForm,
      group: dataForm.group.filter((item, index) => index !== num),
    });
  };

  const handleChange = (selectedOption: any) => {
    const select = selectedOption.map((item: any) => item.value);
    setSelectedKategori(select);
  };

  let pilihan: any = [];

  {
    dataKategori?.data?.map((item) =>
      pilihan.push({ value: item.id, label: item.name })
    );
  }

  return (
    <div>
      <Head>
        <title>Tambah Produk</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.0.0/datepicker.min.js"></script> */}
        <AdminLayout>
          <Breadcrumbs crumbs={crumbs} />
          <div className="border border-[#FF6B35] bg-white w-100 h-100 rounded-lg p-5 flex flex-col gap-y-5">
            <form
              className="flex flex-col gap-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-full gap-5">
                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                    placeholder="Nama Produk"
                    {...register("name", { required: true })}
                  ></input>
                </div>
                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Kategori
                  </label>
                  <CustomSelect
                    options={pilihan}
                    onChange={handleChange}
                    isMulti
                    isClearable
                    placeholder="Pilih Kategori"
                    // {...register("categories", { required: true })}
                  />
                  {/* <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                    {...register("categories.0", { required: true })}
                  >
                    {dataKategori?.data?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select> */}
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="w-1/2 relative ">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tanggal Kadaluarsa
                  </label>
                  <input
                    type="date"
                    {...register("expired_at")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                  />
                </div>
                <div className="w-1/2 ">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Gambar Produk
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
                          accept=".png, .jpg, .jpeg"
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
              <button
                className="bg-[#FF6B35] h-fit w-fit px-3 py-2 rounded-md text-white text-md flex justify-center items-center "
                onClick={() => setOpenModal(true)}
                type="button"
              >
                Tambah Stok
              </button>
              <div className="overflow-x-auto  border rounded-md border-[#FF6B35] ">
                <table className="table-auto min-w-full border-collapse ">
                  <thead>
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
                    {dataForm?.group?.map((col, colIndex) => (
                      <tr>
                        <td className="border-collapse  px-0 text-center">
                          <div className="flex justify-center items-center   h-12 border-b">
                            {colIndex + 1}
                          </div>
                        </td>
                        <td className="border-collapse  px-0 text-center">
                          <div className="flex justify-start items-center   h-12 border-b">
                            {
                              dataUnit?.data?.find(
                                (item) => item.id === col.unit
                              )?.name
                            }
                          </div>
                        </td>
                        <td className="border-collapse  px-0 text-center">
                          <div className="flex justify-start items-center   h-12 border-b">
                            {col.stock}
                          </div>
                        </td>
                        <td className="border-collapse  px-0 text-center">
                          <div className="flex justify-start items-center   h-12 border-b">
                            Rp. {col.price}
                          </div>
                        </td>
                        <td className="border-collapse  px-0 text-center">
                          <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                            <button
                              className="text-[#FF6B35] text-md"
                              onClick={() => handleOpenUpdateModal(colIndex)}
                            >
                              Atur Stok
                            </button>
                            <button
                              className="text-[#FB1919] text-md"
                              type="button"
                              onClick={() => handleDelete(colIndex)}
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
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#FF6B35] h-fit w-fit px-4 py-2 rounded-md text-white text-md flex justify-center items-center"
                >
                  Simpan
                </button>
              </div>
            </form>

            {/* Add Modal */}
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
                    className="flex flex-col gap-y-5"
                    onSubmit={handleSubmitDataModal(onSubmitModal)}
                  >
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="satuan" value="Tambah Stok" />
                      </div>
                      <Select
                        id="satuan"
                        required
                        className="w-fit"
                        {...registerModal("unit")}
                      >
                        {dataUnit?.data?.map((item, index) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="aturStok" value="Atur Stok" />
                      </div>
                      <TextInput
                        id="aturStok"
                        type="number"
                        placeholder="Atur Stok"
                        required
                        {...registerModal("stock")}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="harga" value="Harga Produk" />
                      </div>
                      <TextInput
                        type="number"
                        placeholder="Harga Produk"
                        required
                        {...registerModal("price")}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#FF6B35] text-white p-2 rounded-md"
                    >
                      Simpan
                    </button>
                  </form>
                </div>
              </Modal.Body>
            </Modal>

            {/* Update Modal */}
            <Modal
              dismissible
              show={openUpdateModal}
              size="md"
              onClose={onCloseModal}
              popup
            >
              <Modal.Body className="p-4 border-2 rounded-lg border-[#FF6B35]">
                <div className="space-y-6">
                  <div className="flex gap-x-5">
                    <p className="bg-[#F7D9CF] p-3 w-fit rounded-lg text-[#FF6B35]">
                      Stock Awal
                    </p>
                    <p className="bg-[#94A3B8] p-3 px-7 w-fit rounded-lg text-black font-bold">
                      {stock}
                    </p>
                  </div>
                  <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmitUpdateModal(onSubmitUpdateModal)}
                  >
                    <div className="flex gap-x-5">
                      <p className="bg-[#F7D9CF] p-3 w-1/3 rounded-lg text-[#FF6B35]">
                        Stock Akhir
                      </p>
                      <input
                        type="number"
                        className="border-2 w-1/3 rounded-lg border-[#94A3B8]"
                        placeholder="Atur Stok"
                        defaultValue={stock}
                        {...registerUpdateModal("stock", {
                          required: true,
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#FF6B35] text-white p-2 rounded-md"
                    >
                      Simpan
                    </button>
                  </form>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          {showToast && (
            <ToastComponent
              text="Berhasil menambahkan item."
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
              text="Gagal menambahkan item."
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
        </AdminLayout>
      </main>
    </div>
  );
}

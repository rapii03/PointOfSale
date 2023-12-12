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
    if(selectedKategori.length > 0){
      dataForm.categories = selectedKategori;
    }
    const url = await handleFileUpload(file as File);
    dataForm.image = url;
    if (data.expired_at) {
      dataForm.expired_at = new Date(data.expired_at).toISOString();
    }
    await axiosPrivate.post("/product/group/add", dataForm);
    router.push("/inventori/produk");
    console.log(dataForm);
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

  const handleChange = (selectedOption : any) => {
    const select = selectedOption.map((item: any) => item.value);
    setSelectedKategori(select);
  };

  let pilihan : any = [];

  {dataKategori?.data?.map((item) => (
    pilihan.push({ value: item.id, label: item.name })
  ))}

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
                          onChange={(e) => {
                            setFile(e.target.files?.[0] ?? null);
                          }}
                        />
                        Unggah
                      </label>
                      <p className="text-md text-[#B7B7B7]">
                        {file === null && !fileNotReady ?  "Unggah Gambar" : file?.name}
                      </p>
                      <p className="text-md text-red-500">
                        {file === null && fileNotReady ? "Gambar wajib diisi" : ''}
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
        </AdminLayout>
      </main>
    </div>
  );
}

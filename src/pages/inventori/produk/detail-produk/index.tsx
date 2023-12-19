/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Label, Modal, TextInput, Select } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/router";
import { SWRResponse, mutate } from "swr";
import useSWR from "swr";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEdgeStore } from "@/lib/edgestore";
import { AxiosRequestConfig } from "axios";
import CustomSelect from "@/components/multipleSelect";
import ToastComponent from "@/components/Toast";

interface Price {
  id?: string;
  price: string;
}

interface Stock {
  id?: string;
  stock: number;
}

interface Unit {
  id: string;
  name: string;
}

interface Group {
  id: string;
  price?: Price;
  stock?: Stock;
  unit?: Unit;
}

interface GroupStock {
  id: string;
  mode: string;
  stock: string;
}

interface Kategori {
  id: string;
  name: string;
}

interface IDataForm {
  id?: string;
  name?: string;
  image?: string;
  expired_at?: string;
  categories?: string[] | Kategori[];
  group: Group[];
}

interface SubmitDataForm {
  id?: string;
  name?: string;
  image?: string;
  expired_at?: string;
  categories?: string[] | Kategori[];
}

interface ListKategori {
  data: Kategori[];
}

interface ListUnit {
  data: Unit[];
}

const DetailProduk = () => {
  const [showToast, setShowToast] = useState(false);
  const [showToastFailed, setShowToastFailed] = useState(false);
  const router = useRouter();
  const [initDate, setInitDate] = useState();

  const [dataForm, setDataForm] = useState<SubmitDataForm>({
    id: "",
    name: "",
    image: "",
    categories: [],
  });

  const axiosPrivate = useAxiosPrivate();
  const [accessToken, _] = useLocalStorage("accessToken", "");

  const {
    data: dataProduk,
    error,
    isLoading,
  }: SWRResponse<IDataForm, any, boolean> = useSWR(
    `/product/group/one`,
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
            setInitDate(res.data.data.expired_at);
            return res.data.data;
          });
      }
    }
  );

  if (error) {
    console.log(error);
  }

  const {
    data: dataKategori,
    error: errorKategori,
    isLoading: isLoadingKategori,
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

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { edgestore } = useEdgeStore();
  const [updateId, setUpdateId] = useState("");
  const [oldStock, setOldStock] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileNotReady, setFileNotReady] = useState<boolean>(false);
  const [categoriesChanged, setCategoriesChanged] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          console.log(progress);
        },
      });
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
    }
  };

  const handleFileDelete = async (path: string) => {
    await edgestore.publicFiles.delete({
      url: path,
    });
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  const crumbs = [
    { text: "Home", href: "/dashboard-admin" },
    { text: "Inventori", href: "/inventori/produk" },
    { text: "Produk", href: "/inventori/produk" },
    { text: "Detail" },
  ];

  const columns = ["No", "Satuan", "Jumlah Stok", "Harga Barang", "Aksi"];
  const [selectedKategori, setSelectedKategori] = useState<string[]>([]);

  const [stock, setStock] = useState<any>(0);
  const { register, handleSubmit } = useForm<IDataForm>();
  const {
    register: registerModal,
    handleSubmit: handleSubmitDataModal,
    resetField: resetFieldModal,
  } = useForm<Group>();
  const {
    register: registerUpdateModal,
    handleSubmit: handleSubmitUpdateModal,
    resetField,
  } = useForm<GroupStock>();

  const onSubmit: SubmitHandler<IDataForm> = async (data) => {
    dataForm.id = dataProduk?.id as string;
    dataForm.name = data.name;
    if (initDate != undefined) {
      dataForm.expired_at = initDate;
    }
    if (data.expired_at) {
      dataForm.expired_at = new Date(data.expired_at).toISOString();
    }
    if (categoriesChanged) {
      dataForm.categories = selectedKategori;
    } else {
      const defaultCategories: string[] = [];
      dataProduk?.categories?.map((item: string | Kategori) => {
        if (typeof item !== "string") {
          defaultCategories.push(item?.id);
          dataForm.categories = defaultCategories;
        }
      });
    }
    dataForm.image = dataProduk?.image as string;
    if (file) {
      const url = await handleFileReplace(file, dataProduk?.image as string);
      dataForm.image = url;
    }
    try {
      await axiosPrivate.put("/product/group/product-set", dataForm);
    } catch (e) {
      setShowToastFailed(true);
      return;
    }
    setShowToast(true);
    setTimeout(() => {
      router.push("/inventori/produk");
    }, 2000);
  };

  const onSubmitModal: SubmitHandler<Group> = async (data) => {
    data.id = dataProduk?.id as string;
    await axiosPrivate.put("/product/group/group-set", data);
    mutate("/product/group/one", dataProduk?.id as string);
    onCloseModal();
    resetFieldModal("stock");
    resetFieldModal("price");
  };

  const onSubmitUpdateModal: SubmitHandler<GroupStock> = async (data) => {
    data.id = updateId;
    let result: number = parseInt(data.stock) - oldStock;
    data.mode = "plus";
    if (result < 0) {
      result *= -1;
      data.mode = "min";
    }
    data.stock = result.toString();
    if (result != 0) {
      await axiosPrivate.post("/inventory/stock/set", data);
    }
    mutate("/product/group/one", dataProduk?.id as string);
    setOpenUpdateModal(false);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  function onCloseDeleteModal() {
    setOpenDeleteModal(false);
  }

  const [openDeleteAllModal, setOpenDeleteAllModal] = useState(false);
  function onCloseDeleteAllModal() {
    setOpenDeleteAllModal(false);
  }

  const handleDeleteAll = async () => {
    const data: AxiosRequestConfig<any> = {
      data: { id: dataProduk?.id as string },
    };
    await axiosPrivate.delete("/product/group/product-delete", data);
    router.push("/inventori/produk");
  };

  const handleDelete = async () => {
    const data: AxiosRequestConfig<any> = {
      data: { id: updateId },
    };
    await axiosPrivate.delete("/product/group/group-delete", data);
    mutate("/product/group/one", dataProduk?.id as string);
    onCloseDeleteModal();
  };

  let pilihan: any = [];

  {
    dataKategori?.data?.map((item) =>
      pilihan.push({ value: item.id, label: item.name })
    );
  }

  const handleChange = (selectedOption: any) => {
    const select = selectedOption.map((item: any) => item.value);
    setCategoriesChanged(true);
    setSelectedKategori(select);
  };

  useEffect(() => {
    mutate("/product/group/one", router.query.id as string);
  }, [router.isReady]);

  if (isLoading) {
    return <div>loading</div>;
  } else {
    return (
      <AdminLayout>
        <div className="flex justify-between items-center">
          <Breadcrumbs crumbs={crumbs} />
          <button
            type="button"
            onClick={() => {
              setOpenDeleteAllModal(true);
            }}
            className="bg-[#FB1919] text-white px-[15px] py-[8px]  gap-[8px] max-h-[36px]  rounded flex items-center justify-center"
          >
            Hapus Produk
          </button>
        </div>
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
                  defaultValue={dataProduk?.name}
                  autoFocus={true}
                  // onChange={(e) => setInitName(e.target.value)}
                  // onFocus={(e) => (e.target.value = initName)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                  placeholder="Nama Produk"
                  {...register("name", { required: true })}
                ></input>
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Kategori
                </label>
                {dataProduk?.categories && (
                  <CustomSelect
                    options={pilihan}
                    defaultValue={dataProduk.categories.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    onChange={handleChange}
                    isMulti
                    isClearable
                    placeholder="Pilih Kategori"
                    // {...register("categories", { required: true })}
                  />
                )}
                {!dataProduk?.categories && (
                  <CustomSelect
                    options={pilihan}
                    onChange={handleChange}
                    isMulti
                    isClearable
                    placeholder="Pilih Kategori"
                    // {...register("categories", { required: true })}
                  />
                )}
                {/* <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                {...register("categories", { required: true })}
              >
                {dataKategori?.data?.map((categories) => (
                  <option value={categories.name}>{categories.name}</option>
                ))}
              </select> */}
              </div>
            </div>
            <div className="flex w-full gap-5">
              <div className="w-1/2 relative ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tanggal Kadaluarsa
                </label>
                {dataProduk?.expired_at ? (
                  <input
                    type="date"
                    defaultValue={new Date(
                      dataProduk.expired_at as string
                    ).toLocaleDateString("en-CA")}
                    {...register("expired_at", { required: false })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                  />
                ) : (
                  <input
                    type="date"
                    {...register("expired_at", { required: false })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                  />
                )}
                {/* {!dataProduk?.expired_at && (
                <input
                  type="date"
                  {...register("expired_at", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                />
              )} */}
              </div>
              <div className="w-1/2 relative">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Gambar Produk
                </label>
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
                    {file === null && fileNotReady ? "Gambar wajib diisi" : ""}
                  </p>
                </div>
                {/* <ImageUploader dirs={dirs} /> */}
              </div>
            </div>
            <button
              type="button"
              className="bg-[#FF6B35] h-fit w-fit px-3 py-2 rounded-md text-white text-md flex justify-center items-center "
              onClick={() => setOpenModal(true)}
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
                  {dataProduk?.group?.map((col, colIndex) => (
                    <tr>
                      <td className="border-collapse  px-0 text-center">
                        <div className="flex justify-center items-center   h-12 border-b">
                          {colIndex + 1}
                        </div>
                      </td>
                      <td className="border-collapse  px-0 text-center">
                        <div className="flex justify-start items-center   h-12 border-b">
                          {col.unit?.name}
                        </div>
                      </td>
                      <td className="border-collapse  px-0 text-center">
                        <div className="flex justify-start items-center   h-12 border-b">
                          {col.stock?.stock}
                        </div>
                      </td>
                      <td className="border-collapse  px-0 text-center">
                        <div className="flex justify-start items-center   h-12 border-b">
                          Rp. {col.price?.price}
                        </div>
                      </td>
                      <td className="border-collapse  px-0 text-center">
                        <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                          <button
                            className="text-[#FF6B35] text-md"
                            onClick={(e) => {
                              setUpdateId(col.id as string);
                              setOldStock(col.stock?.stock as number);
                              setOpenUpdateModal(true);
                            }}
                          >
                            Atur Stok
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
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#FF6B35] h-fit w-fit px-4 py-2 rounded-md text-white text-md flex justify-center items-center"
                // onClick={() => saveData()}
              >
                Simpan
              </button>
            </div>
          </form>
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
                      {dataUnit?.data?.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                      {/* <option value="Pcs">Pcs</option>
                    <option value="Dus">Dus</option>
                    <option value="Lusin">Lusin</option>
                    <option value="Kotak">Kotak</option> */}
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
                    {oldStock}
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

          <Modal
            dismissible
            show={openDeleteAllModal}
            size="md"
            onClose={onCloseDeleteAllModal}
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
                    onClick={onCloseDeleteAllModal}
                  >
                    Kembali
                  </button>
                  <button
                    className="bg-[#FF6B35] w-fit text-white px-4 p-2 self-end rounded-md"
                    onClick={handleDeleteAll}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        {showToast && (
          <ToastComponent
            text="Berhasil memperbarui item."
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
            text="Gagal memperbarui item."
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
    );
  }
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const props = { dirs: [] };
//   try {
//     const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"));
//     props.dirs = dirs as any;
//     return { props };
//   } catch (error) {
//     return { props };
//   }
// };

export default DetailProduk;

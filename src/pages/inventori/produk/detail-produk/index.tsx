/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Label, Modal, TextInput, Select } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import AdminLayout from "@/components/AdminLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { SWRResponse, mutate } from "swr";
import useSWR from "swr";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEdgeStore } from "@/lib/edgestore";

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
  id?: string;
  price?: Price;
  stock?: Stock;
  unit?: Unit;
}

interface Kategori {
  id: string;
  name: string;
}

interface IDataForm {
  id?: string;
  name?: string;
  image?: string;
  tanggal?: boolean;
  category?: Kategori[];
  group: Group[];
}

interface ListKategori {
  data: Kategori[];
}

interface ListUnit {
  data: Unit[];
}

const DetailProduk = () => {
  const [dataForm, setDataForm] = useState<IDataForm>({
    id: "",
    name: "",
    image: "",
    category: [],
    group: [],
  });

  const axiosPrivate = useAxiosPrivate();
  const [accessToken, _] = useLocalStorage("accessToken", "");

  // const {
  //   data: dataProduk,
  //   error: errorProduk,
  //   isLoading: isLoadingProduk,
  // }: SWRResponse<ListKategori, any, boolean> = useSWR(
  //   `/product/group/one`,
  //   (url) =>
  //     axiosPrivate
  //       .post(url, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         body: {
  //           id: targetId
  //         }
  //       })
  //       .then((res) => res.data)
  // );

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

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (router.isReady) {
          if (!router.query.id) {
            router.push("/inventori/produk");
          }
          const response = await axiosPrivate.post(
            `/product/group/one`,
            {
              id: router.query.id,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setDataForm(response.data.data);
        }
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [router.isReady]);

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

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
  const [targetUpdate, setTargetUpdate] = useState(0);

  const handleOpenUpdateModal = (num: number) => {
    console.log(num);
    console.log(dataForm);
    // setStock(dataForm.modal[num].stok);
    setTargetUpdate(num);
    setOpenUpdateModal(true);
  };

  const handleUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const [stock, setStock] = useState<any>(0);
  const { register, handleSubmit } = useForm<IDataForm>();
  const { register: registerModal, handleSubmit: handleSubmitDataModal } =
    useForm<Group>();
  // const {
  //   register: registerUpdateModal,
  //   handleSubmit: handleSubmitUpdateModal,
  //   resetField,
  // } = useForm<IModalData>();

  const onSubmit: SubmitHandler<IDataForm> = (data) => {
    console.log(dataKategori);
  };

  const onSubmitModal: SubmitHandler<Group> = (data) => {
    // handleSubmitModal(data, dataForm);
    console.log(data.unit?.name)
    const newData : Group = {
      unit : {
        id : "12312331",
        name : data.unit?.name as string
      }
    } 
    setDataForm({ ...dataForm, group: [...dataForm.group, data] });
    // console.log(dataForm);
    onCloseModal();
    // reset({ stok: "", harga: "" });
  };

  // const onSubmitUpdateModal: SubmitHandler<IModalData> = (data) => {
  //   setDataForm({
  //     ...dataForm,
  //     modal: dataForm.modal.map((item, index) => {
  //       if (index === targetUpdate) {
  //         return {
  //           ...item,
  //           ...data,
  //         };
  //       }
  //       return item;
  //     }),
  //   });

  //   resetField("stok");
  //   setOpenUpdateModal(false);
  // };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  function onCloseDeleteModal() {
    setOpenDeleteModal(false);
  }

  const handleDelete = () => {
    console.log("Delete");
    onCloseDeleteModal();
  };

  useEffect(() => {
    console.log(dataForm, "useEffect");
  }, [dataForm]);

  const saveData = () => {
    // alert("Data Tersimpan");
    // console.log(dataKategori?.data);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <Breadcrumbs crumbs={crumbs} />
        <button
          type="button"
          onClick={() => setOpenDeleteModal(true)}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                placeholder="Nama Produk"
                // {...register("nama", { required: true })}
              ></input>
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kategori
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                // {...register("kategori", { required: true })}
              >
                {dataKategori?.data?.map((categorie) => (
                  <option value={categorie.name}>{categorie.name}</option>
                ))}
                {/* <option value="">Pilih Kategori</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Cemilan">Cemilan</option> */}
              </select>
            </div>
          </div>
          <div className="flex w-full gap-5">
            <div className="w-1/2 relative ">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tanggal Kadaluarsa
              </label>
              <input
                type="date"
                {...register("tanggal", {
                  value: true,
                  valueAsDate: true,
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
              />
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
              {/* <ImageUploader dirs={dirs} /> */}
            </div>
          </div>
          <button
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
                {dataForm?.group?.map((col, colIndex) => (
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
                          onClick={() => handleOpenUpdateModal(colIndex)}
                        >
                          Atur Stok
                        </button>
                        <button
                          className="text-[#FB1919] text-md"
                          onClick={() => setOpenDeleteModal(true)}
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
              onClick={() => saveData()}
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
                    {...registerModal("unit.name")}
                  >
                    {dataUnit?.data?.map((item) => (
                      <option value={item.name}>{item.name}</option>
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
                  {stock}
                </p>
              </div>
              <form
                className="flex flex-col gap-5"
                // onSubmit={handleSubmitUpdateModal(onSubmitUpdateModal)}
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
                    // {...registerUpdateModal("stok", {
                    //   required: true,
                    //   valueAsNumber: true,
                    // })}
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
      </div>
    </AdminLayout>
  );
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

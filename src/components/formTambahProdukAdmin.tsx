/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Label, Modal, TextInput, Select } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IDataForm {
  nama?: string;
  kategori?: string;
  tanggal?: string;
  gambar?: string;
  modal: IModalData[];
}

interface IModalData {
  satuan?: string;
  stok?: number;
  harga?: number;
}

export default function FormTambahProdukAdmin() {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [dataForm, setDataForm] = useState<IDataForm>({
    nama: "",
    kategori: "",
    tanggal: "",
    gambar: "",
    modal: [],
  });

  function onCloseModal() {
    setOpenModal(false);
  }

  const columns = ["No", "Satuan", "Jumlah Stok", "Harga Barang", "Aksi"];
  const [targetUpdate, setTargetUpdate] = useState(0);

  const handleOpenUpdateModal = (num: number) => {
    console.log(num);
    console.log(dataForm);
    setStock(dataForm.modal[num].stok);
    setTargetUpdate(num);
    setOpenUpdateModal(true);
  };

  const handleUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const [stock, setStock] = useState<any>(0);
  const { register, handleSubmit } = useForm<IDataForm>();
  const { register: registerModal, handleSubmit: handleSubmitDataModal } =
    useForm<IModalData>();

  const {
    register: registerUpdateModal,
    handleSubmit: handleSubmitUpdateModal,
    resetField,
  } = useForm<IModalData>();

  const onSubmit: SubmitHandler<IDataForm> = (data) => {
    console.log(data);
  };

  const onSubmitModal: SubmitHandler<IModalData> = (data) => {
    // handleSubmitModal(data, dataForm);
    setDataForm({ ...dataForm, modal: [...dataForm.modal, data] });
    onCloseModal();
    // reset({ stok: "", harga: "" });
  };

  const onSubmitUpdateModal: SubmitHandler<IModalData> = (data) => {
    setDataForm({
      ...dataForm,
      modal: dataForm.modal.map((item, index) => {
        if (index === targetUpdate) {
          return {
            ...item,
            ...data,
          };
        }
        return item;
      }),
    });

    resetField("stok");
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    console.log(dataForm, "useEffect");
  }, [dataForm]);

  return (
    <div className="border border-[#FF6B35] bg-white w-100 h-100 rounded-lg p-5 flex flex-col gap-y-5">
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full gap-5">
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nama Produk
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
              placeholder="Nama Produk"
              {...register("nama", { required: true })}
            ></input>
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Kategori
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
              {...register("kategori", { required: true })}
            >
              <option value="">Pilih Kategori</option>
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
              <option value="Cemilan">Cemilan</option>
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
              {...register("tanggal")}
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
                  <input id="file-upload" type="file" className="hidden" />
                  Unggah
                </label>
                <p className="text-md text-[#B7B7B7]">
                  {dataForm.gambar === "" ? "Unggah Gambar" : dataForm.gambar}
                </p>
              </div>
            </div>
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
              {dataForm.modal.map((col, colIndex) => (
                <tr>
                  <td className="border-collapse  px-0 text-center">
                    <div className="flex justify-center items-center   h-12 border-b">
                      {colIndex + 1}
                    </div>
                  </td>
                  <td className="border-collapse  px-0 text-center">
                    <div className="flex justify-start items-center   h-12 border-b">
                      {col.satuan}
                    </div>
                  </td>
                  <td className="border-collapse  px-0 text-center">
                    <div className="flex justify-start items-center   h-12 border-b">
                      {col.stok}
                    </div>
                  </td>
                  <td className="border-collapse  px-0 text-center">
                    <div className="flex justify-start items-center   h-12 border-b">
                      Rp. {col.harga}
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
                      <button className="text-[#FB1919] text-md">Hapus</button>
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
            onClick={() => handleOpenUpdateModal(0)}
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
                  {...registerModal("satuan")}
                >
                  <option value="Pcs">Pcs</option>
                  <option value="Dus">Dus</option>
                  <option value="Lusin">Lusin</option>
                  <option value="Kotak">Kotak</option>
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
                  {...registerModal("stok")}
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
                  {...registerModal("harga")}
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
                  {...registerUpdateModal("stok", {
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
  );
}

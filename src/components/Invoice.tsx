import React from "react";

const Invoice = React.forwardRef((props, ref: React.Ref<any>) => {
  const produk: any = [
    { nama: "Indomie", satuan: 3, harga: "3.000", totalHarga: "15.000" },
    { nama: "Sedap", satuan: 3, harga: "3.000", totalHarga: "15.000" },
    { nama: "Supermie", satuan: 3, harga: "3.000", totalHarga: "15.000" },
    { nama: "Nabati", satuan: 3, harga: "3.000", totalHarga: "15.000" },
    { nama: "Lemonilo", satuan: 3, harga: "3.000", totalHarga: "15.000" },
  ];

  const kodeInvoice = "#INV213";
  const kasir = "Amel";

  const total = "2220.000";
  const diskon = "30.000";
  const totalHarga = "190.000";

  const cash = "200.000";
  const change = "10.000";
  return (
    <div
      className="flex flex-col w-[300px] h-[631px] px-[23px] py-[17px] items-center "
      ref={ref}
    >
      <div className="flex flex-col items-center space-y-1">
        <p className="text-[25px] text-[#FF6B35] font-bold">Yangs Grosir</p>
        <p className="text-[15px] text-[#FF6B35] font-normal ">
          Point of Sales
        </p>
        <p className="text-[9.935px] font-mono ">20-08-2023 • 9:27:53 AM</p>
      </div>

      <div className="flex flex-col  w-full border-dashed border-b-[0.994px] py-2 border-[#707275] ">
        <div className="flex justify-between">
          <p className="text-[9.935px] font-mono text-[#6D7278]">Invoice</p>
          <p className="text-[9.94px] font-mono text-[#2B2E34]">
            {kodeInvoice}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-[9.935px] font-mono text-[#6D7278]">Cashier</p>
          <p className="text-[9.94px] font-mono text-[#2B2E34]">{kasir}</p>
        </div>
      </div>

      <div className="flex justify-between  w-full my-4">
        <div className="flex">
          <div>
            {produk.map((produk: any) => (
              <p
                key={produk.nama}
                className="text-[9.935px] font-mono text-[#6D7278]"
              >
                {produk.nama}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            {produk.map((produk: any) => (
              <div key={produk.nama} className="flex space-x-1">
                <p className="text-[9.935px] font-mono ">{produk.satuan}pcs</p>
                <p className="text-[9.935px] font-mono ">{produk.harga}</p>
                <p className="text-[9.935px] font-mono ">{produk.totalHarga}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" w-full border-dashed border-y-[0.994px] py-4 border-[#707275] ">
        <div className="flex flex-col justify-end items-end space-y-1">
          <div className="flex space-x-8">
            <p className="text-[9.935px] font-mono text-[#6D7278]">Total</p>
            <p className="text-[9.935px] font-mono ">{total}</p>
          </div>

          <div className="flex space-x-8">
            <p className="text-[9.935px] font-mono text-[#6D7278]">Diskon</p>
            <p className="text-[9.935px] font-mono ">-{diskon}</p>
          </div>

          <div className="flex space-x-8">
            <p className="text-[9.935px] font-mono text-[#6D7278]">Total</p>
            <p className="text-[9.935px] font-mono ">{totalHarga}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full  py-4">
        <div className="space-y-1">
          <div className="flex justify-between">
            <p className="text-[9.935px] font-mono text-[#6D7278]"> Cash</p>
            <p className="text-[9.935px] font-mono ">{cash}</p>
          </div>

          <div className="flex justify-between ">
            <p className="text-[9.935px] font-mono text-[#6D7278]"> Change</p>
            <p className="text-[9.935px] font-mono ">{change}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3 items-center text-center mt-4">
        <p className="text-[8px] font-mono">
          Thanks for fueling our passion. Drop by again, if your wallet isn't
          still sulking. You're always welcome here!
        </p>
        <p className="text-[8px] font-mono">
          J64M+4FR, Jl. Imam Bonjol Jl. Darussalam, Langkapura, Kec. Langkapura,
          Kota Bandar Lampung, Lampung 35113
        </p>
      </div>
    </div>
  );
});

export default Invoice;

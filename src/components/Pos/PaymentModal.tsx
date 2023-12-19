import { SetStateAction, useState, ReactNode } from "react";
import InputCash from "./InputCash";

interface PaymentProps {
    children: ReactNode;
    quantity: number;
    total: number;
    isOpen: boolean;
    onClose: () => void;
    onPay?: () => void;
}
const PaymentModal: React.FC<PaymentProps> = ({ children, total, isOpen, onClose, onPay, quantity }) => {

    const [numericValue, setNumericValue] = useState('0');

    const handleNumericClick = (num: number) => {
        setNumericValue(numericValue + num.toString());
    };

    const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        // Validasi: Hanya izinkan angka
        const numericInput = input.replace(/[^0-9]/g, '');

        setNumericValue(numericInput);
    };

    const handleClearAll = () => {
        setNumericValue('0');
    };
    const handleBayar = () => {
        if (onPay) {
            onPay();
        }
        setNumericValue('0');
    };
    

    

    // modal
    const [modalVisible, setModalVisible] = useState(false);

    // Function to handle button click and toggle modal visibility
    const handleButtonClick = () => {
        setModalVisible(!modalVisible);
    };
    const handleCloseButton = () => {
        setModalVisible(false);
    };

    if (!isOpen) {
        return null; // If the modal is not open, don't render anything
    }

    // const kembalian = 

    return (

        <div className="">
            <div className="h-screen w-full flex justify-center items-center z-[1000] bg-modal absolute left-0 top-0">
                <div className="wrap w-[840px] bg-white flex flex-col gap-1 rounded-[10px] border-2 border-[#FF6B35] p-[20px]">
                    <div className="header mb-3">
                        <div className="wrap flex justify-between items-center">
                            <div className="title font-medium text-[16px]">Pembayaran</div>
                            <button onClick={onClose} className="text-[#D80027]">
                                Keluar
                            </button>
                        </div>
                        <div className="w-full h-[1px] bg-[#CBD5E1] mt-2 mb-2"></div>
                    </div>
                    <div className="wrap rounded-[10px] border border-[#FF6B35]  flex overflow-hidden">
                        <div className="py-[10px] kiri w-1/2  px-4">
                            <div className="head">
                                <div className="text-[14px] font-semibold">Detail Produk</div>
                                <div className="w-full  bg-[#CBD5E1] mt-2 mb-2"></div>
                            </div>
                            <div className="list flex justify-between">
                                <div className="text-[14px]">List Produk</div>
                                <div className="text-[14px] text-primary">{quantity} Produk</div>
                            </div>
                            <div className="wrap ">
                                <div className="title flex justify-between text-[14px] font-semibold mt-2">
                                    <div className="produk">Produk</div>
                                    <div className="jumlah">Jumlah</div>
                                    <div className="harga">Harga</div>
                                </div>
                                <div className="h-[280px] overflow-y-auto">
                                    {children}
                                </div>
                            </div>
                            <div className="list font-semibold flex justify-between p-3 rounded bg-[#CBD5E1] mt-2">
                                <div className="text-[14px]">Total Harga</div>
                                <div className="text-[14px]">Rp. {total.toLocaleString("id-ID")}</div>
                            </div>

                        </div>
                        <div className="kanan w-1/2 bg-[#F5F5F5] py-[10px] px-4">
                            <div className="head ">
                                <div className="text-[14px] font-semibold">Detail Pembayaran</div>
                                <div className="w-full h-[1px] bg-[#CBD5E1] mt-2 mb-2"></div>
                            </div>
                            <div className="wrap h-[90%] flex flex-col justify-between">
                                <div className="keynumbe">
                                    <div className="flex flex-col">
                                        <div className="text-[14px] mb-1">Pembayaran</div>
                                        <div className="wrapinput relative">
                                            <div className="text-[16px] font-semibold absolute left-2 top-[8px]">Rp.</div>
                                            <input
                                                type="text"
                                                className="text-[16px] font-semibold pl-[40px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                                                placeholder="0"
                                                value={parseInt(numericValue).toLocaleString("id-ID")}
                                                onChange={handleNumericInputChange}
                                            />
                                        </div>
                                        {/* <InputCash  value={numericValue} onChange={handleNumericInputChange}/> */}
                                        <div className="w-full mt-2">
                                            <div className="grid grid-cols-3 gap-2">
                                                <button className="bg-primary text-white font-semibold text-[16px] py-1 rounded" onClick={() => handleNumericClick(1)}>1</button>
                                                <button className="bg-primary text-white font-semibold text-[16px] py-1 rounded" onClick={() => handleNumericClick(2)}>2</button>
                                                <button className="bg-primary text-white font-semibold text-[16px] py-1 rounded" onClick={() => handleNumericClick(3)}>3</button>
                                                <button className="bg-primary text-white font-semibold text-[16px] py-1 rounded" onClick={() => handleNumericClick(4)}>4</button>
                                                <button className="bg-primary text-white font-semibold text-[16px] py-1 rounded" onClick={() => handleNumericClick(5)}>5</button>
                                                <button className="bg-primary text-white font-semibold text-[16px] py-1 rounded" onClick={() => handleNumericClick(6)}>6</button>
                                                <button className="bg-primary text-white font-semibold text-[16px] py-1 rounded" onClick={() => handleNumericClick(7)}>7</button>
                                                <button className="bg-primary text-white font-semibold text-[16px] py-1 rounded" onClick={() => handleNumericClick(8)}>8</button>
                                                <button className="bg-primary text-white font-semibold text-[16px] py-1 rounded" onClick={() => handleNumericClick(9)}>9</button>
                                            </div>
                                            <div className="grid grid-cols-6 gap-3 mt-2">
                                                <button className="col-span-4 bg-primary text-white font-semibold text-[16px] py-1 rounded" onClick={() => handleNumericClick(0)}>0</button>
                                                <button className="col-span-2 bg-[#FB1919] text-white font-semibold text-[16px] py-1 rounded" onClick={handleClearAll}>Clear</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="total-wrap flex flex-col gap-1 bg-white p-2 rounded border border-[#CBD5E1]">
                                    <div className="total text-[14px] flex justify-between">
                                        <div className="font-medium">Total Harga</div>
                                        <div className="t">Rp. {total.toLocaleString("id-ID")}</div>
                                    </div>
                                    <div className="total text-[14px] flex justify-between">
                                        <div className="font-medium">Pembayaran</div>
                                        <div className="t">Rp. {parseInt(numericValue).toLocaleString("id-ID")}</div>
                                    </div>
                                    <div className="total text-[14px] flex justify-between">
                                        <div className="font-medium">Kembalian</div>
                                        <div className={`font-semibold ${parseInt(numericValue) - total < 0 ? 'text-red-600' : 'text-green-500'}`}>Rp. {(parseInt(numericValue) - total).toLocaleString("id-ID")}</div>
                                    </div>
                                </div>
                                <button
                                    disabled={parseInt(numericValue) - total < 0}
                                    onClick={handleBayar}
                                    className={`bayar flex justify-center items-center py-[8px] text-[14px] font-semibold ${parseInt(numericValue) - total < 0 ? 'bg-gray-500' : 'bg-primary'} text-white rounded-[5px]`}>
                                    Bayar
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div >

        </div>
    );
}


export default PaymentModal
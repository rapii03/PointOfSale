import React, { useState } from 'react';

const KonfirmasiModal = () => {
    // State to manage the visibility of the modal
    const [modalVisible, setModalVisible] = useState(false);

    // Function to handle button click and toggle modal visibility
    const handleButtonClick = () => {
        setModalVisible(!modalVisible);
    };
    const handleCloseButton = () => {
        setModalVisible(false);
    };
    return (
        <div className="wrap">
            <button onClick={handleButtonClick} className="text-[#D80027] text-md">Batalkan</button>
            {/* modal */}
            {modalVisible && (
                <div className="MODAL h-screen w-full flex justify-center items-center z-[1000] bg-modal absolute left-0 top-0">
                    <div className="wrap w-[774px] bg-white flex flex-col gap-1 rounded-[10px] border-2 border-[#FF6B35] p-[20px]">
                        <div className="header mb-3">
                            <div className="wrap flex justify-between items-center">
                                <div className="title font-medium text-[16px]">Konfirmasi Pembatalan Pemesanan</div>
                                <button onClick={handleCloseButton} className="text-[#D80027]">
                                    Keluar
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#CBD5E1] mt-2 mb-2"></div>
                        </div>
                        <div className="wrap bg-white flex flex-col gap-3  border border-primary rounded-lg p-4">
                            <div className="head flex items-center justify-between">
                                <div className="nama flex items-center gap-2">
                                    <div className="h-[40px] w-[40px] img rounded-full overflow-hidden">
                                        <img src="/assets/pos/profile.png" alt="" />
                                    </div>
                                    <div className="flex flex-start flex-col">
                                        <div className='text-start text-[14px] font-semibold'>Amel Sinta</div>
                                        <div className="text-start text-[10px] text-[#5E5E5D]">Cashier</div>
                                    </div>

                                </div>
                                <div className="invoice text-[16px] font-semibold text-primary">#INV1213</div>
                            </div>
                            <div className="form bg-yellow flex flex-col gap-2">
                                <div className="kode">
                                    <div className="w-full flex flex-col items-start">
                                        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            Kode Kasir
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                                            placeholder="Kode kasir"
                                        ></input>
                                    </div>
                                </div>
                                <div className="keterangan">
                                    <div className="w-full flex flex-col items-start">
                                        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            Keterangan
                                        </label>
                                        <textarea rows={8}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                                            placeholder="Keterangan"
                                        ></textarea>
                                    </div>
                                </div>
                                <button className="btn text-white text-[14px] bg-primary w-full p-2 text-center rounded-lg">Konfirmasi</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default KonfirmasiModal
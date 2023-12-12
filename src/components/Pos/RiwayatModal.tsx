import { useState } from "react";
import { Pagination } from "flowbite-react";
import Searchbar from "../Searchbar";
import KonfirmasiModal from "./KonfirmasiModal";


const RiwayatModal = () => {
    const columns = [
        "Invoice",
        "Produk",
        "Waktu",
        "Aksi",
    ];
    interface kelolarRiwayat {
        invoice: string;
        waktu: string;
        produk: string;
    }
    const datarRiwayat: kelolarRiwayat[] = [
        {
            invoice: "#INV1214",
            waktu: "01.35.20",
            produk: "Indomie, Telur, Sunlight, Rinso",
        },

        {
            invoice: "#INV1214",
            waktu: "01.35.20",
            produk: "Indomie, Telur, Sunlight, Rinso",
        },

        {
            invoice: "#INV1214",
            waktu: "01.35.20",
            produk: "Indomie, Telur, Sunlight, Rinso",
        },
        {
            invoice: "#INV1214",
            waktu: "01.35.20",
            produk: "Indomie, Telur, Sunlight, Rinso",
        },
        {
            invoice: "#INV1214",
            waktu: "01.35.20",
            produk: "Indomie, Telur, Sunlight, Rinso",
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
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

    // modal
    const [modalVisible, setModalVisible] = useState(false);

    // Function to handle button click and toggle modal visibility
    const handleButtonClick = () => {
        setModalVisible(!modalVisible);
    };
    const handleCloseButton = () => {
        setModalVisible(false);
    };

    return (
        <div className="wrap w-full">
            <button onClick={handleButtonClick} className="text-md bg-white rounded-md flex-1  py-[5px] border focus:ring-grey focus:border-grey border-grey h-full w-full">Riwayat Pemesanan</button>

            {modalVisible && (
                <div className="h-screen w-full flex justify-center items-center z-[1000] bg-modal left-0 top-0 absolute">
                    <div className="wrap w-[774px] bg-white flex flex-col gap-1 rounded-[10px] border-2 border-[#FF6B35] p-[20px]">
                        <div className="header mb-3">
                            <div className="wrap flex justify-between items-center">
                                <div className="title font-medium text-[16px]">Riwayat Tersimpan</div>
                                <button onClick={handleCloseButton} className="text-[#D80027]">
                                    Keluar
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#CBD5E1] mt-2 mb-2"></div>
                        </div>
                        <div className="flex h-fit justify-between items-center mb-6">
                            <Searchbar placeholder="Cari invoice" />
                            <button
                                className="bg-[#FF6B35] h-fit px-3 py-1 rounded-md text-white text-md flex justify-center items-center gap-2"
                            >
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.4733 4.66667H2.80664C1.42331 4.66667 0.306641 5.78333 0.306641 7.16667V12.1667H3.63997V15.5H13.64V12.1667H16.9733V7.16667C16.9733 5.78333 15.8566 4.66667 14.4733 4.66667ZM11.9733 13.8333H5.30664V9.66667H11.9733V13.8333ZM14.4733 8C14.015 8 13.64 7.625 13.64 7.16667C13.64 6.70833 14.015 6.33333 14.4733 6.33333C14.9316 6.33333 15.3066 6.70833 15.3066 7.16667C15.3066 7.625 14.9316 8 14.4733 8ZM13.64 0.5H3.63997V3.83333H13.64V0.5Z" fill="#FAFAFA" />
                                </svg>
                                Print Semua
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
                                                            ? "bg-[#ff6b3546] px-3 font-semibold text-sm text-[#FF6B35] py-2 text-center"
                                                            : "bg-[#ff6b3546] px-3 font-semibold text-sm text-[#FF6B35] py-2 text-left"
                                                }
                                            >
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {datarRiwayat.map((col, colIndex) => (
                                        <tr>
                                            <td className="border-collapse px-3 text-center">
                                                <div className="flex justify-start items-center   h-12 border-b">
                                                    {col.invoice}
                                                </div>
                                            </td>
                                            <td className="border-collapse px-0 text-center">
                                                <div className="flex justify-start items-center   h-12 border-b">
                                                    {col.produk}
                                                </div>
                                            </td>
                                            <td className="border-collapse p2 px-0 text-center">
                                                <div className="flex justify-start items-center h-12 border-b">
                                                    {col.waktu} WIB
                                                </div>
                                            </td>
                                            <td className="border-collapse p2 px-0 text-center">
                                                <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                                                    <button className="text-[#FF6B35] text-md">Print</button>
                                                    <button className="text-[#D80027] text-md"><KonfirmasiModal /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex overflow-x-auto sm:justify-end">
                            <Pagination
                                theme={paginationTheme}
                                layout="pagination"
                                currentPage={currentPage}
                                totalPages={10}
                                onPageChange={onPageChange}
                                previousLabel=""
                                nextLabel=""
                                showIcons
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default RiwayatModal
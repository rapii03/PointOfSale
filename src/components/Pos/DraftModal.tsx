import React, { useState } from "react";
import { Pagination } from "flowbite-react";

interface ProductGroup {
    id: string;
    name: string;
    quantity: number;
    group: {
        id: string;
        Unit: string;
        price: number;
    }[];
}

interface Product {
    id: string;
    invoice: string;
    groupDraft: ProductGroup[];
    waktu?: string;
}

interface DraftModalProps {
    columns: string[];
    data: Product[];
    onAktif: (product: Product) => void;
    onHapus: () => void;
  }

const DraftModal: React.FC<DraftModalProps> = ({ columns, data, onAktif, onHapus }) => {
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
        <div className="w-full">
            <button onClick={handleButtonClick} className="w-full text-md bg-primary flex-1 rounded-md  py-[5px]  h-full flex gap-2 items-center justify-center">
                <div className="text-white">Pesanan Tersimpan</div>
                <div className="text-black bg-white text-[10px] font-bold rounded-full px-1 inline-block">11</div>
            </button>

            {modalVisible && (
                <div className="h-screen w-full flex justify-center items-center z-[1000] bg-modal absolute left-0 top-0">
                    <div className="wrap w-[744px] bg-white flex flex-col gap-1 rounded-[10px] border-2 border-[#FF6B35] p-[20px]">
                        <div className="header mb-3">
                            <div className="wrap flex justify-between items-center">
                                <div className="title font-medium text-[16px]">Pesanan Tersimpan</div>
                                <button onClick={handleCloseButton} className="text-[#D80027]">
                                    Keluar
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#CBD5E1] mt-2 mb-2"></div>
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
                                    {data.map((product, productIndex) => (
                                        <tr key={productIndex}>
                                            <td className="border-collapse px-3 text-center">
                                                <div className="flex justify-start items-center h-12 border-b">
                                                    {product.invoice}
                                                </div>
                                            </td>
                                            <td className="border-collapse px-0 text-center">
                                                <div className="flex justify-start items-center h-12 border-b">
                                                    {(() => {
                                                        const elements: React.ReactNode[] = [];
                                                        const groupDraft = product.groupDraft || [];

                                                        for (let index = 0; index < Math.min(groupDraft.length, 4); index++) {
                                                            elements.push(<div key={index}>{groupDraft[index].name}</div>);
                                                            if (index < 3 && index < groupDraft.length - 1) {
                                                                elements.push(<div key={`comma-${index}`}>,</div>);
                                                            }
                                                        }

                                                        if (groupDraft.reduce((totalChars, item) => totalChars + item.name.length, 0) > 35) {
                                                            elements.push(<div key="ellipsis">......</div>);
                                                        }

                                                        return elements;
                                                    })()}
                                                </div>
                                            </td>

                                            <td className="border-collapse p-2 px-0 text-center">
                                                <div className="flex justify-start items-center h-12 border-b">
                                                    {product.waktu} WIB
                                                </div>
                                            </td>
                                            <td className="border-collapse p-2 px-0 text-center">
                                                <div className="flex justify-center items-center gap-x-5 h-12 border-b">
                                                    <button  onClick={() => onAktif(product)} className="text-[#FF6B35] text-md">Aktif</button>
                                                    <button onClick={onHapus} className="text-[#D80027] text-md">Hapus</button>
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


export default DraftModal
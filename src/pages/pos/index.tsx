import React, { useState } from 'react';
import CardProduct from "@/components/Pos/CardProduct";
import FullscreenButton from "@/components/Pos/Fullscreen";
import Search from "@/components/Pos/Search";
import ProfilePos from '@/components/Pos/ProfilePos';
import AllDelete from '@/components/Pos/AllDelete';
import ArrowAtas from "@/components/Icons/ArrowAtas";
import ArrowB from "@/components/Icons/ArrowB";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import ModalCash from '@/components/Pos/ModalCash';
import PaymentModal from '@/components/Pos/PaymentModal';
import { Modal, Pagination } from "flowbite-react";
import DateComponent from '@/components/Pos/DateComponent';
import TimeComponent from '@/components/Pos/TimeComponent';
import Searchbar from '@/components/Searchbar';



/* eslint-disable react/no-unescaped-entities */

export interface Product {
    id: string;
    image?: string;
    name?: string;
    group?: {
        id: string;
        Unit: string;
        price: number;
        stock: number;
    }[];
    groupDraft?: {
        id: string;
        name: string;
        image?: string;
        quantity: number;
        group?: {
            id: string;
            Unit: string;
            price: number;
            stock?: number;
        }[];
    }[];
    quantity?: number;
    selectedUnitId?: string;
    selectedUnit?: {
        id: string;
        Unit: string;
        price: number;
        stock: number;
    };
    invoice?: string;
    waktu?: string; // Add this line for 'waktu' property
}

const dummyProducts: Product[] = [
    {
        id: "1",
        image: 'assets/pos/indomie.png',
        name: 'Indomie', // Unique name
        group: [
            { id: "1", Unit: 'Pcs', price: 3500, stock: 99 },
            { id: "2", Unit: 'Dus', price: 50000, stock: 50 },
        ],
    },
    {
        id: "2",
        image: 'assets/pos/indomie.png',
        name: 'Susu', // Unique name
        group: [
            { id: "1", Unit: 'Pcs', price: 5500, stock: 21 },
            { id: "2", Unit: 'Dus', price: 70000, stock: 9 },
        ],
    },
    {
        id: "3",
        image: 'assets/pos/indomie.png',
        name: 'Bimoli', // Unique name
        group: [
            { id: "1", Unit: 'Pcs', price: 5500, stock: 21 },
            { id: "2", Unit: 'Dus', price: 70000, stock: 9 },
        ],
    },
    {
        id: "4",
        image: 'assets/pos/indomie.png',
        name: 'Kukubima', // Unique name
        group: [
            { id: "1", Unit: 'Pcs', price: 3000, stock: 21 },
            { id: "2", Unit: 'Dus', price: 70000, stock: 9 },
        ],
    },
    // Add more dummy data as needed
];

const productsDraft = [
    {
        id: '1',
        invoice: 'INV123',
        waktu: '10:00:00',
        groupDraft: [
            { id: '5', name: 'Bimoli', quantity: 3, group: [{ id: '1', Unit: 'Pcs', price: 3000 }] },
            { id: '6', name: 'Sunlight', quantity: 2, group: [{ id: '1', Unit: 'Pcs', price: 4000 }] },
        ],
    },
    {
        id: '2',
        invoice: 'INV124',
        waktu: '10:00:00',
        groupDraft: [
            { id: '1', name: 'Indomie', quantity: 3, group: [{ id: '1', Unit: 'Pcs', price: 3500 },] },
            { id: '1', name: 'Indomie', quantity: 3, group: [{ id: '2', Unit: 'Dus', price: 50000 },] },
            { id: '2', name: 'Susu', quantity: 2, group: [{ id: '2', Unit: 'Dus', price: 70000 }] },
        ],
    },
    // Add more dummy data as needed
];

const productsRiwayat = [
    {
        id: '1',
        invoice: 'INV123',
        waktu: '10:00:00',
        groupRiwayat: [
            { id: '5', name: 'Riwayat', quantity: 3, group: [{ id: '1', Unit: 'Pcs', price: 3000 }] },
            { id: '6', name: 'Sunlight', quantity: 2, group: [{ id: '1', Unit: 'Pcs', price: 4000 }] },
        ],
    },
    {
        id: '2',
        invoice: 'INV124',
        waktu: '10:00:00',
        groupRiwayat: [
            { id: '1', name: 'Indomie', quantity: 3, group: [{ id: '1', Unit: 'Pcs', price: 3500 },] },
            { id: '1', name: 'Indomie', quantity: 3, group: [{ id: '2', Unit: 'Dus', price: 50000 },] },
            { id: '2', name: 'Susu', quantity: 2, group: [{ id: '2', Unit: 'Dus', price: 70000 }] },
        ],
    },
    // Add more dummy data as needed
];

const Pos = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);

    const addToCart = (product: Product, selectedUnitId: string) => {
        console.log("Adding to cart:", product, selectedProducts);
        const existingProduct = selectedProducts.find((p) => p.id === product.id && p.selectedUnitId === selectedUnitId);

        if (existingProduct) {
            const updatedProducts = selectedProducts.map((p) =>
                p.id === product.id && p.selectedUnitId === selectedUnitId
                    ? { ...p, quantity: (p.quantity || 0) + 1 }
                    : p
            );
            setSelectedProducts(updatedProducts);
        } else {
            const selectedUnit = product.group?.find((unit) => unit.id === selectedUnitId);
            if (selectedUnit) {
                const updatedProducts = [
                    ...selectedProducts,
                    { ...product, quantity: 1, selectedUnitId, selectedUnit },
                ];
                setSelectedProducts(updatedProducts);
            }
        }

        // Calculate the total price based on the selected unit's price
        const selectedUnitPrice = (product.group?.find((unit) => unit.id === selectedUnitId)?.price) || 0;
        const updatedTotalPrice = totalPrice + selectedUnitPrice;
        setTotalPrice(updatedTotalPrice);
    };

    const removeFromCart = (product: Product) => {
        const updatedProducts = selectedProducts.map((p) =>
            p.id === product.id && p.selectedUnitId === product.selectedUnitId
                ? { ...p, quantity: (p.quantity || 0) - 1 }
                : p
        );

        const remainingProducts = updatedProducts.filter((p) => p.quantity && p.quantity > 0);

        setSelectedProducts(remainingProducts);

        // Calculate the total price based on the selected unit's price
        const selectedUnitPrice = product.selectedUnit?.price || 0;
        const updatedTotalPrice = totalPrice - selectedUnitPrice * (product.quantity || 1);
        setTotalPrice(updatedTotalPrice);
    };

    const deleteProduct = (product: Product) => {
        const updatedProducts = selectedProducts.filter(
            (p) => p.id !== product.id || p.selectedUnitId !== product.selectedUnitId
        );
        setSelectedProducts(updatedProducts);

        // Calculate the total price based on the selected unit's price
        const selectedUnitPrice = product.selectedUnit?.price || 0;
        const updatedTotalPrice = totalPrice - selectedUnitPrice * (product.quantity || 1);
        setTotalPrice(updatedTotalPrice);
    };

    const deleteAllProducts = () => {
        setSelectedProducts([]);
        setTotalPrice(0);
        setDiscount(0);
    };

    const subtotal = selectedProducts.reduce((acc, product) => {
        const unitPrice = product.selectedUnit?.price || 0;
        return acc + unitPrice * (product.quantity || 1);
    }, 0);

    const totalAfterDiscount = subtotal - discount;
    const isCartEmpty = selectedProducts.length === 0;

    // modal
    const [modalValue, setModalValue] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleModalChange = (value: number) => {
        setModalValue(value);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // payment
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

    const handleBayarSekarang = () => {
        if (!isCartEmpty && totalAfterDiscount >= 0) {
            setPaymentModalOpen(true);
        }
    };

    const handleDraft = () => {
        console.log(selectedProducts)
    };

    const handleBayar = () => {
        console.log("Bayar");
        setPaymentModalOpen(false)
        deleteAllProducts()
    };
    // card

    // DRAFT
    const columnsDraft = ["Invoice", "Produk", "Waktu", "Aksi"];
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const [draftProducts, setDraftProducts] = useState<Product[]>(productsDraft);
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
    const [modalDraft, setmodalDraft] = useState(false);

    // Function to handle button click and toggle modal visibility
    const handleAddToCart = (product: Product) => {
        const { groupDraft, id: invoiceId } = product;

        if (groupDraft && groupDraft.length > 0) {
            // For each item in groupDraft, add a corresponding item to selectedProducts
            const itemsToAdd = groupDraft
                .flatMap((draftItem) =>
                    draftItem.group?.map((unit) => {
                        if (!draftItem.quantity) {
                            // Skip items without quantity
                            return null;
                        }

                        const selectedUnitId = `${draftItem.group?.[0]?.id}`;
                        const existingProduct = selectedProducts.find(
                            (p) => p.id === invoiceId && p.selectedUnitId === selectedUnitId
                        );

                        if (existingProduct) {
                            // If the same product and unit exist in the cart, increase quantity
                            const updatedProducts = selectedProducts.map((p) =>
                                p.id === invoiceId && p.selectedUnitId === selectedUnitId
                                    ? { ...p, quantity: (p.quantity || 0) + draftItem.quantity }
                                    : p
                            );
                            setSelectedProducts(updatedProducts);
                            return null; // Skip adding to itemsToAdd
                        }

                        const selectedUnit = {
                            id: selectedUnitId,
                            Unit: unit.Unit,
                            price: unit.price,
                            stock: unit.stock || 0,
                        };

                        return {
                            id: `${draftItem.id}`, // Use the formatted id
                            name: draftItem.name,
                            price: unit.price,
                            quantity: draftItem.quantity || 1,
                            selectedUnitId,
                            selectedUnit,
                            image: product.image || "",
                            group: product.group || [],
                            invoiceId,
                        };
                    }) || []
                )
                .filter((item): item is NonNullable<typeof item> => item !== null); // Type assertion

            console.log("Adding items to the cart:", itemsToAdd);
            // Add the selected products to the cart
            setSelectedProducts((prevSelectedProducts) => [
                ...prevSelectedProducts,
                ...itemsToAdd,
            ]);

            // Remove the selected product from the draft
            setDraftProducts((prevDraftProducts) =>
                prevDraftProducts.filter((draftProduct) => draftProduct.id !== invoiceId)
            );

            // Calculate the total price based on the selected unit's price
            const updatedTotalPrice = itemsToAdd.reduce((acc, item) => {
                const unitPrice = item.selectedUnit?.price || 0;
                return acc + unitPrice * item.quantity;
            }, 0);

            console.log("Updated total price:", updatedTotalPrice);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + updatedTotalPrice);
        }
        handleCloseDraft();
    };

    const handleOpenDraft = () => {
        setmodalDraft(!modalDraft);
    };
    const handleCloseDraft = () => {
        setmodalDraft(false);
    };

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    function onOpenDeleteDraft() {
        setOpenDeleteModal(true);
        handleCloseDraft()
    }
    function onCloseDeleteDraft() {
        setOpenDeleteModal(false);
        handleOpenDraft()
    }

    const handleDeleteDraft = () => {
        console.log("Delete");
        onCloseDeleteDraft();
        handleCloseDraft();
    };
    // DRAFT

    // RIWAYAT
    const [modalRiwayat, setmodalRiwayat] = useState(false);
    const handleOpenRiwayat = () => {
        setmodalRiwayat(!modalRiwayat);
    };
    const handleCloseRiwayat = () => {
        setmodalRiwayat(false);
    };

    const [openBatalModal, setOpenBatalModal] = useState(false);
    function onOpenBatalRiwayat() {
        setOpenBatalModal(true);
        handleCloseRiwayat()
    }
    function onCloseBatalRiwayat() {
        setOpenBatalModal(false);
        handleOpenRiwayat()
    }

    const handleKonfirmasi = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Batal");
        onCloseBatalRiwayat();
        handleCloseRiwayat();
    };

    // RIWAYAT


    return (
        <div>
            <div className="pos flex  w-full h-screen overflow-hidden">
                {/* halaman produk */}
                <div className="produk w-[65%] bg-white flex flex-col gap-3 p-2">
                    {/* header */}
                    <div className="header bg-primary flex justify-between items-center rounded-[5px] py-2 px-4">
                        <div className="left text-[16px] font-semibold text-white ">Yang's Grosir</div>
                        <div className="right text-end text-white">
                            <p className="text-[14px]">Penjualan</p>
                            <p className="text-[16px] font-bold">Rp. 560.500</p>
                        </div>
                    </div>

                    {/* tab card */}
                    <div className="headcard mt-2 gap-3 grid h-[36px] grid-cols-12 ">
                        <div className="search col-span-6">
                            <Search placeholder="Cari Produk" />
                        </div>
                        <div className="btn col-span-6 text-[14px] flex gap-3">
                            <div className="text-md bg-white rounded-md flex-1 h-full border focus:ring-grey focus:border-grey border-grey">
                                <button onClick={handleOpenRiwayat} className="w-full text-md bg-white flex-1 rounded-md  py-[5px]  h-full flex gap-2 items-center justify-center">
                                    <div className="text-black">Riwayat Pemesanan</div>
                                </button>
                            </div>
                            <div className="text-md bg-white rounded-md flex-1 h-full">
                                <button onClick={handleOpenDraft} className="w-full text-md bg-primary flex-1 rounded-md  py-[5px]  h-full flex gap-2 items-center justify-center">
                                    <div className="text-white">Pesanan Tersimpan</div>
                                    {productsDraft.length > 0 && (
                                        <div className="text-black bg-white text-[10px] font-bold rounded-full px-1 inline-block">{productsDraft.length}</div>
                                    )}
                                </button>
                            </div>
                            <FullscreenButton />
                        </div>
                    </div>

                    {/* wrap-card */}
                    <div className="wrap-card grid grid-cols-12 overflow-y-auto gap-3 h-[100%]">
                        {dummyProducts.map((product) => (
                            <div key={product.id} className="cardProduct col-span-3">
                                <CardProduct
                                    name={product.name}
                                    group={product.group}
                                    onAddToCart={(selectedUnitId) => addToCart(product, selectedUnitId)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* halaman produk */}

                {/* halaman keranjang */}
                <div className="keranjang w-[35%] bg-[#F8F8F6] p-2 flex flex-col gap-5 h-full">
                    {/* header keranjang */}
                    <div className="head py-2 px-4 flex justify-between items-center">
                        <div className="left">
                            <p className="text-[14px]">Uang Tunai di Tangan</p>
                            <p className="text-[16px] text-primary font-bold">Rp. {modalValue.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="right">
                            <ProfilePos />
                        </div>
                    </div>

                    {/* wrap keranjang */}
                    <div className="wrap bg-white h-[87%] rounded-[10px] overflow-hidden flex flex-col gap-1">
                        <div className="wrap-head  bg-yellozw-300 flex flex-col gap-2">
                            <div className="header bg-primary flex justify-between text-white p-3">
                                <div className="left font-semibold">
                                    <div className="text-[20px]">Pesanan Baru</div>
                                    <div className="text-[14px]">#Inv123</div>
                                </div>
                                <div className="right">
                                    <div className="font-semibold text-[14px]">
                                        <DateComponent />
                                    </div>
                                    <div className="text-[14px]">
                                        <TimeComponent />
                                    </div>
                                </div>
                            </div>
                            <div className=" flex justify-end px-3">
                                <button onClick={deleteAllProducts} className='hapus semua flex justify-end'>
                                    <div className="wra text-white bg-primary rounded-sm p-1 flex gap-1 items-center">
                                        <div className="ic"><AllDelete /></div>
                                        <div className="ic text-[10px] font-medium">Hapus Semua</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        {/* cart Produk*/}
                        <div className="Keranjangproduk bg-white p-3 gap-3 rounded-[5px] shadow-sm overflow-y-auto h-full">
                            {selectedProducts.map((product) => (
                                <div key={`${product.id}-${product.selectedUnitId}`} className="cart flex justify-between items-center">
                                    <div className="left flex gap-3 items-center">
                                        <button onClick={() => deleteProduct(product)} className="del">
                                            <DeleteIcon />
                                        </button>
                                        <div className="flex flex-col">
                                            <div className="text-[14px] font-medium">{product.name}</div>
                                            <div className="text-[12px] font-medium">
                                                Rp. {product.selectedUnit?.price.toLocaleString("id-ID")} / {product.selectedUnit?.Unit}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right flex justify-between gap-3 items-center">
                                        <div className="counter w-[62px] justify-between items-center flex bg-white border border-primary rounded-[3px] overflow-hidden">
                                            <div className="text-[14px] font-medium flex justify-center items-center flex-1">
                                                {product.quantity}
                                            </div>
                                            <div className="wrap flex-1 bg-primary rounded-[3px]">
                                                <div
                                                    onClick={() => product.selectedUnitId && addToCart(product, product.selectedUnitId)}
                                                    className="atas p-1 cursor-pointer flex justify-center items-center border-b border-white"
                                                >
                                                    <ArrowAtas />
                                                </div>

                                                <div
                                                    onClick={() => removeFromCart(product)}
                                                    className="bawah cursor-pointer flex justify-center items-center p-1"
                                                >
                                                    <ArrowB />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="totalharga text-end w-[90px] text-[14px] font-bold">
                                            Rp. {((product.selectedUnit?.price || 0) * (product.quantity || 1)).toLocaleString("id-ID")}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* jumlah */}
                        <div className="Total bg-white p-3 flex flex-col gap-2 rounded-[5px] shadow-sm ">
                            <div className="sub text-[14px] flex justify-between items-center">
                                <div className="font-semibold">Subtotal</div>
                                <div className="">Rp. {subtotal.toLocaleString("id-ID")}</div>
                            </div>
                            <div className="discount text-[14px] flex justify-between items-center">
                                <div className="font-semibold">Diskon</div>
                                <div className="">
                                    <input
                                        type="text"
                                        disabled={isCartEmpty}
                                        value={discount}
                                        onChange={(e) => setDiscount(Number(e.target.value))}
                                        className="text-[14px] h-[25px] rounded-[5px] border border-grey px-2 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                                    />
                                </div>
                            </div>
                            <div className="total text-[14px] flex justify-between items-center">
                                <div className="t font-semibold">Total Harga</div>
                                <div className={`t ${totalAfterDiscount < 0 ? 'text-red-600' : ''}`}>
                                    Rp. {totalAfterDiscount.toLocaleString("id-ID")}
                                </div>
                            </div>
                            <div className="btn flex gap-2">
                                <button onClick={handleDraft}
                                    disabled={isCartEmpty || totalAfterDiscount < 0}
                                    className={`simpan border justify-center items-center flex flex-1 py-[10px] text-[12px] ${isCartEmpty || totalAfterDiscount < 0 ? 'bg-gray-500 text-white' : 'bg-white'} border-grey rounded-[5px]`}>Simpan</button>
                                <button
                                    onClick={handleBayarSekarang}
                                    disabled={isCartEmpty || totalAfterDiscount < 0}
                                    className={`bayar flex justify-center items-center flex-1 py-[10px] text-[12px] ${isCartEmpty || totalAfterDiscount < 0 ? 'bg-gray-500' : 'bg-primary'} text-white rounded-[5px]`}
                                >
                                    Bayar Sekarang
                                </button>


                            </div>
                        </div>
                    </div>
                </div>
                {/* halaman keranjang */}
                {/* Komponen ModalCash */}
                {isModalOpen && (
                    <ModalCash value={modalValue} onChange={handleModalChange} onClose={handleModalClose} />
                )}
            </div>
            {/* payment */}
            <PaymentModal onPay={handleBayar} quantity={selectedProducts.length} total={totalAfterDiscount} onClose={() => setPaymentModalOpen(false)} isOpen={isPaymentModalOpen}>
                {selectedProducts.map((product) => (
                    <div key={`${product.id}-${product.selectedUnitId}`} className="cart  w-full flex justify-between text-[14px] mt-1">
                        <div className="produk w-[50%] ">{product.name}</div>
                        <div className="jumlah w-[15%] ">{product.quantity}</div>
                        <div className="harga w-[35%]  text-end"> Rp. {product.selectedUnit?.price.toLocaleString("id-ID")} / {product.selectedUnit?.Unit}</div>
                    </div>
                ))}
            </PaymentModal>
            {/* payment */}

            {/* DRAFT  MODAL*/}
            {modalDraft && (
                <div className="h-screen w-full flex justify-center items-center z-[1000] bg-modal absolute left-0 top-0">
                    <div className="wrap w-[744px] bg-white flex flex-col gap-1 rounded-[10px] border-2 border-[#FF6B35] p-[20px]">
                        <div className="header ">
                            <div className="wrap flex justify-between items-center">
                                <div className="title font-medium text-[16px]">Pesanan Tersimpan</div>
                                <button onClick={handleCloseDraft} className="text-[#D80027]">
                                    Keluar
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#CBD5E1] mt-2 mb-2"></div>
                        </div>
                        <div className="wr items-center flex justify-between mb-1">
                            <div className="text-[16px]">
                                Hapus produk dalam keranjang dahulu untuk mengatifkan draft!
                            </div>
                            <button onClick={deleteAllProducts} className='hapus semua flex justify-end'>
                                <div className="wra text-white bg-primary rounded-sm p-1 px-2 flex gap-1 items-center">
                                    <div className="ic text-[14px] font-medium">Hapus Keranjang</div>
                                </div>
                            </button>
                        </div>
                        <div className="overflow-x-auto  border rounded-md border-[#FF6B35] max-h-[50vh]">
                            <table className="table-auto min-w-full border-collapse">
                                <thead className="sticky top-0">
                                    <tr>
                                        {columnsDraft.map((column, index) => (
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
                                    {productsDraft.map((product, productIndex) => (
                                        <tr key={productIndex}>
                                            <td className="border-collapse  text-center">
                                                <div className="flex px-3 justify-start items-center h-12 border-b">
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
                                                    <button
                                                        disabled={selectedProducts.length > 0}
                                                        className={`text-md ${selectedProducts.length > 0 ? 'text-gray-500' : 'text-primary'} `} onClick={() => handleAddToCart(product)}>
                                                        Aktif
                                                    </button>
                                                    <button onClick={onOpenDeleteDraft} className="text-[#D80027] text-md">Hapus</button>
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
            {/* DRAFT DELETE MODAL */}
            <Modal
                dismissible
                show={openDeleteModal}
                size="md"
                onClose={onCloseDeleteDraft}
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
                            Anda yakin mau menghapus Draft ini ?
                        </p>
                        <div className="flex gap-6">
                            <button
                                className="bg-[#E2E8F0] w-fit text-black px-4 p-2 self-end rounded-md"
                                onClick={onCloseDeleteDraft}
                            >
                                Kembali
                            </button>
                            <button
                                className="bg-[#FF6B35] w-fit text-white px-4 p-2 self-end rounded-md"
                                onClick={handleDeleteDraft}
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* DRAFT MODAL*/}

            {/* RIWAYAT MODAL */}
            {modalRiwayat && (
                <div className="h-screen w-full flex justify-center items-center z-[1000] bg-modal absolute left-0 top-0">
                    <div className="wrap w-[744px] bg-white flex flex-col gap-1 rounded-[10px] border-2 border-[#FF6B35] p-[20px]">
                        <div className="header ">
                            <div className="wrap flex justify-between items-center">
                                <div className="title font-medium text-[16px]">Riwayat Pemesanan</div>
                                <button onClick={handleCloseRiwayat} className="text-[#D80027]">
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
                                        {columnsDraft.map((column, index) => (
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
                                    {productsRiwayat.map((product, productIndex) => (
                                        <tr key={productIndex}>
                                            <td className="border-collapse  text-center">
                                                <div className="flex px-3 justify-start items-center h-12 border-b">
                                                    {product.invoice}
                                                </div>
                                            </td>
                                            <td className="border-collapse px-0 text-center">
                                                <div className="flex justify-start items-center h-12 border-b">
                                                    {(() => {
                                                        const elements: React.ReactNode[] = [];
                                                        const groupRiwayat = product.groupRiwayat || [];

                                                        for (let index = 0; index < Math.min(groupRiwayat.length, 4); index++) {
                                                            elements.push(<div key={index}>{groupRiwayat[index].name}</div>);
                                                            if (index < 3 && index < groupRiwayat.length - 1) {
                                                                elements.push(<div key={`comma-${index}`}>,</div>);
                                                            }
                                                        }

                                                        if (groupRiwayat.reduce((totalChars, item) => totalChars + item.name.length, 0) > 35) {
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

                                                    <button className="text-primary text-md">Print</button>
                                                    <button onClick={onOpenBatalRiwayat} className="text-[#D80027] text-md">Batalkan</button>
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
            {/* Batalkan Riwayat */}
            <Modal
                dismissible
                show={openBatalModal}
                size="3xl"
                onClose={onCloseBatalRiwayat}
                popup
            >
                <Modal.Body className="p-4 border-2 rounded-lg border-[#FF6B35]">
                    <div className="wrap w-full bg-white flex flex-col gap-1 rounded-[10px] [#FF6B35] ">
                        <div className="header mb-3">
                            <div className="wrap flex justify-between items-center">
                                <div className="title font-medium text-[16px]">Konfirmasi Pembatalan Pemesanan</div>
                                <button onClick={onCloseBatalRiwayat} className="text-[#D80027]">
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
                            <form onSubmit={(event) => handleKonfirmasi(event)} className="form bg-yellow flex flex-col gap-2">
                                <div className="kode">
                                    <div className="w-full flex flex-col items-start">
                                        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            Kode Kasir
                                        </label>
                                        <input
                                            required
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
                                        <textarea rows={8} required
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35] block w-full p-2.5"
                                            placeholder="Keterangan"
                                        ></textarea>
                                    </div>
                                </div>
                                <button type='submit' className="btn text-white text-[14px] bg-primary w-full p-2 text-center rounded-lg">Konfirmasi</button>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* RIWAYAT MODAL */}
        </div>

    );
}

export default Pos;

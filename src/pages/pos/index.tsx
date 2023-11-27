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


/* eslint-disable react/no-unescaped-entities */

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    quantity?: number; // Add quantity property
}

const Pos = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);

    const addToCart = (product: Product) => {
        const existingProduct = selectedProducts.find((p) => p.id === product.id);

        if (existingProduct) {
            const updatedProducts = selectedProducts.map((p) =>
                p.id === product.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
            );
            setSelectedProducts(updatedProducts);
        } else {
            const updatedProducts = [...selectedProducts, { ...product, quantity: 1 }];
            setSelectedProducts(updatedProducts);
        }

        const updatedTotalPrice = totalPrice + product.price;
        setTotalPrice(updatedTotalPrice);
    };

    const removeFromCart = (product: Product) => {
        const updatedProducts = selectedProducts.map((p) =>
            p.id === product.id ? { ...p, quantity: (p.quantity || 0) - 1 } : p
        );

        const remainingProducts = updatedProducts.filter((p) => p.quantity && p.quantity > 0);

        setSelectedProducts(remainingProducts);
        const updatedTotalPrice = totalPrice - product.price * (product.quantity || 1);
        setTotalPrice(updatedTotalPrice);
    };

    const deleteProduct = (product: Product) => {
        const updatedProducts = selectedProducts.filter((p) => p.id !== product.id);
        setSelectedProducts(updatedProducts);
        const updatedTotalPrice = totalPrice - product.price * (product.quantity || 1);
        setTotalPrice(updatedTotalPrice);
    };

    const deleteAllProducts = () => {
        setSelectedProducts([]);
        setTotalPrice(0);
        setDiscount(0);
    };

    const subtotal = selectedProducts.reduce((acc, product) => {
        return acc + product.price * (product.quantity || 1);
    }, 0);

    const totalAfterDiscount = subtotal - discount;
    const isCartEmpty = selectedProducts.length === 0;

    // modal
    const [modalValue, setModalValue] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleModalChange = (value: number) => {
        setModalValue(value);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const dummyProducts: Product[] = [
        { id: 1, name: "Rinso Sabun", price: 5000, stock: 34 },
        { id: 2, name: "Product 2", price: 10000, stock: 20 },
        { id: 3, name: "Product 3", price: 15000, stock: 15 },
        { id: 4, name: "Product 4", price: 20000, stock: 25 },
        { id: 5, name: "Product 5", price: 12000, stock: 18 },
        { id: 6, name: "Product 6", price: 8000, stock: 30 },
        { id: 7, name: "Product 7", price: 8000, stock: 30 },
        { id: 8, name: "Product 8", price: 8000, stock: 30 },
        { id: 9, name: "Product 9", price: 8000, stock: 30 },
        { id: 10, name: "Product 10", price: 8000, stock: 30 },
        // Add more dummy data as needed
    ];
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
                            <p className="text=[16px] font-bold">Rp. 560.500</p>
                        </div>
                    </div>

                    {/* tab card */}
                    <div className="headcard mt-2 gap-3 grid h-[36px] grid-cols-12 ">
                        <div className="search col-span-6">
                            <Search placeholder="Cari Produk" />
                        </div>
                        <div className="btn col-span-6 text-[14px] flex gap-3">
                            <button className="text-md bg-white rounded-md flex-1  py-[5px] border focus:ring-grey focus:border-grey border-grey h-full">Riwayat Pesanan</button>
                            <button className="text-md bg-primary flex-1 rounded-md  py-[5px]  h-full flex gap-2 items-center justify-center">
                                <div className="text-white">Pesanan Tersimpan</div>
                                <div className="text-black bg-white text-[10px] font-bold rounded-full px-1 inline-block">11</div>
                            </button>
                            <FullscreenButton />
                        </div>
                    </div>

                    {/* wrap-card */}
                    <div className="wrap-card grid grid-cols-12 overflow-y-auto gap-3 h-[100%]">
                        {dummyProducts.map((product) => (
                            <div key={product.id} className="cardProduct col-span-3">
                                <CardProduct
                                    name={product.name}
                                    price={product.price}
                                    stock={product.stock}
                                    onAddToCart={() => addToCart(product)}
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
                                    <div className="font-semibold text-[14px]">25 Agustus 2023</div>
                                    <div className="text-[14px]">11.35.20 WIB</div>
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
                                <div key={product.id} className="cart flex justify-between items-center ">
                                    <div className="left flex gap-3 items-center">
                                        <button onClick={() => deleteProduct(product)} className="del">
                                            <DeleteIcon />
                                        </button>
                                        <div className="flex flex-col">
                                            <div className="text-[14px] font-medium">{product.name}</div>
                                            <div className="text-[12px] font-medium">Rp. {product.price.toLocaleString("id-ID")}</div>
                                        </div>
                                    </div>
                                    <div className="right flex justify-between gap-3 items-center">
                                        <div className="counter w-[62px] justify-between items-center flex bg-white border border-primary rounded-[3px] overflow-hidden">
                                            <div className="text-[14px] font-medium flex justify-center items-center flex-1">{product.quantity}</div>
                                            <div className="wrap flex-1 bg-primary rounded-[3px]">
                                                <div onClick={() => addToCart(product)} className="atas p-1 cursor-pointer flex justify-center items-center border-b border-white" ><ArrowAtas /></div>
                                                <div onClick={() => removeFromCart(product)} className="bawah cursor-pointer flex justify-center items-center p-1"><ArrowB /></div>
                                            </div>
                                        </div>
                                        <div className="totalharga text-end w-[90px] text-[14px] font-bold"> Rp. {(product.price * (product.quantity || 1)).toLocaleString("id-ID")}</div>
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
                                <button className="simpan border justify-center items-center flex flex-1 py-[10px] text-[12px] bg-white border-grey rounded-[5px]">Simpan</button>
                                <button className="bayar flex justify-center items-center flex-1 py-[10px] text-[12px] bg-primary text-white rounded-[5px]">Bayar Sekarang</button>
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
        </div>

    );
}

export default Pos;

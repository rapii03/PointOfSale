import React, { useState } from 'react';

export interface ProductCardComponentProps {
    image?: string;
    name?: string;
    group?: {
        id: string;
        Unit: string;
        price: number;
        stock: number;
    }[];
    onAddToCart: (selectedUnitId: string) => void;
}

const CardProduct = ({
    image = "assets/pos/indomie.png",
    name = "Indomie Goreng",
    group = [
        { id: "1", Unit: 'Pcs', price: 3500, stock: 99 },
        { id: "2", Unit: 'Dus', price: 4000, stock: 50 },
    ],
    onAddToCart,
}: ProductCardComponentProps) => {
    const [selectedUnitId, setSelectedUnitId] = useState<string>(group[0]?.id || '');

    const handleAddToCart = () => {
        onAddToCart(selectedUnitId);
    };

    return (
        <div className="wrap relative">
            <div className="satuan absolute top-1 right-1">
                <select
                    id="units"
                    value={selectedUnitId}
                    onChange={(e) => setSelectedUnitId(e.target.value)}
                    className="bg-white border p-[1px] border-gray-300 text-gray-900 text-[10px] rounded-md focus:ring-[#FF6B35] focus:border-[#FF6B35] active:border-[#FF6B35] block appearance-none"
                >
                    {group.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                            {unit.Unit}
                        </option>
                    ))}
                </select>
            </div>
            <div onClick={handleAddToCart} className="card cursor-pointer hover:bg-slate-50 w-full bg-white rounded-[5px] shadow-md overflow-hidden">
                <img className="h-[122px] w-full object-cover" src={image} alt={name} />
                <div className="des p-2 flex flex-col gap-1">
                    <div className="name text-[13px] font-semibold">{name}</div>
                    <div className="flex justify-between items-center">
                        <div className="price font-semibold text-[12px] text-primary">
                            Rp. {group.find((item) => item.id === selectedUnitId)?.price?.toLocaleString("id-ID")}
                        </div>
                        <div className="stock text-[10px] font-medium ">
                            {group.find((item) => item.id === selectedUnitId)?.stock}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;

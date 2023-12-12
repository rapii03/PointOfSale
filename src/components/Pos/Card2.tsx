import DropSatuan from "./DropSatuan";

export interface ProductCardComponentProps {
    image?: string;
    name?: string;
    price?: number;
    stock?: number;
    onAddToCart: () => void;
    // unit?: string;
}

const Card2 = ({
    image = "assets/pos/indomie.png",
    name = "Indomie Goreng",
    price = 3500,
    stock = 99,
    onAddToCart
    // unit = "Pcs",
}: ProductCardComponentProps) => {
    return (
        <div className="wrap relative">
            <div className="satuan absolute top-1 right-1">
                <DropSatuan />
            </div>
            <div onClick={onAddToCart} className="card cursor-pointer hover:bg-slate-50 w-full bg-white rounded-[5px] shadow-md overflow-hidden">
                <img className="h-[122px] w-full object-cover" src={image} />
                <div className="des p-2 flex flex-col gap-1">
                    <div className="name text-[13px] font-semibold">{name}</div>
                    <div className="flex justify-between items-center">
                        <div className="price font-semibold text-[12px] text-primary">Rp. {price.toLocaleString("id-ID")}</div>
                        <div className="stock text-[10px] font-medium ">{stock}</div>
                    </div>
                </div>
            </div>

        </div>
    );
}


export default Card2
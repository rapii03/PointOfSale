import ArrowAtas from "../Icons/ArrowAtas";
import ArrowB from "../Icons/ArrowB";
import DeleteIcon from "../Icons/DeleteIcon";


const CartProduct = () => {

    return (
        <div className="cart flex justify-between items-center ">
            <div className="left flex gap-3 items-center">
                <button className="del">
                    <DeleteIcon />
                </button>
                <div className="flex flex-col">
                    <div className="text-[14px] font-medium">Produk 1</div>
                    <div className="text-[12px] font-medium">Rp. 3.400 /Pcs</div>
                </div>
            </div>
            <div className="right flex justify-between gap-3 items-center">
                <div className="counter w-[62px] justify-between items-center flex bg-white border border-primary rounded-[3px] overflow-hidden">
                    <div className="text-[14px] font-medium flex justify-center items-center flex-1">1</div>
                    <div className="wrap flex-1 bg-primary rounded-[3px]">
                        <div className="atas p-1 cursor-pointer flex justify-center items-center border-b border-white" ><ArrowAtas /></div>
                        <div className="bawah cursor-pointer flex justify-center items-center p-1"><ArrowB /></div>
                    </div>
                </div>
                <div className="totalharga text-end w-[90px] text-[14px] font-bold">Rp. 200.000</div>
            </div>
        </div>
    );
}

export default CartProduct;

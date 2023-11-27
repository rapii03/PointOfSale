
const DropSatuan = () => {
    return (
        <select
              id="countries"
              className="bg-white  border p-[1px]   border-gray-300 text-gray-900 text-[10px] rounded-md focus:ring-[#FF6B35] focus:border-[#FF6B35] active:border-[#FF6B35] block appearance-none"
            //   {...register("kategori", { required: true })}
            >
              <option value="">Satuan</option>
              <option value="Makanan">Pcs</option>
              <option value="Minuman">Dus</option>
              <option value="Cemilan">Renteng</option>
            </select>
    );
}


export default DropSatuan
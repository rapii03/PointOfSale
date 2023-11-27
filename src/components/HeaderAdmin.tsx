import Image from "next/image";
import foto from "../../public/assets/admin/fotoKasir.png";

const HeaderAdmin = () => (
  <div className=" headerAdminLayout  border-b-4 border-grey  ">
    <div className="">
      <p className="text-[#FF6B35] font-bold text-2xl">Hello Amel</p>
      <p className="text-sm">Semoga Harimu Menyenangkan</p>
    </div>
    <div className="flex py-2 gap-x-6">
      <svg
        className="mt-2"
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill="none"
      >
        <path
          d="M16.9046 8.28819C16.9046 6.53695 16.2525 4.85744 15.0915 3.61913C13.9306 2.38081 12.3561 1.68513 10.7143 1.68513C9.07248 1.68513 7.49793 2.38081 6.33701 3.61913C5.17609 4.85744 4.5239 6.53695 4.5239 8.28819C4.5239 15.9918 1.42871 18.1928 1.42871 18.1928H19.9998C19.9998 18.1928 16.9046 15.9918 16.9046 8.28819Z"
          stroke="#FF6B35"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.5034 21.2867C12.322 21.5995 12.0617 21.859 11.7484 22.0394C11.4351 22.2198 11.08 22.3149 10.7185 22.3149C10.357 22.3149 10.0018 22.2198 9.68861 22.0394C9.37538 21.859 9.11497 21.5995 8.93359 21.2867"
          stroke="#FF6B35"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div className="">
        <p className="font-semibold ">Amel Sinta</p>
        <p className="text-sm">Admin</p>
      </div>
      <Image
        src={foto}
        width={40}
        height={40}
        alt="foto"
        className="rounded-full"
      />
    </div>
  </div>
);

export default HeaderAdmin;

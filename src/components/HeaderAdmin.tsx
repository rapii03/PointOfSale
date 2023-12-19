import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import useSWR from "swr";
import { SWRResponse } from "swr";
import foto from "../../public/assets/admin/fotoKasir.png";
import Notifikasi from "./Notifikasi";

interface profileI {
  username: string;
  nickname: string;
  imageProfile: string;
}

const HeaderAdmin = ({profile}: { profile: profileI}) => {
  const axiosPrivate = useAxiosPrivate();
  const [accessToken, _] = useLocalStorage("accessToken", "");

  const {
    data,
    error,
    isLoading,
  }: SWRResponse<any, any, boolean> = useSWR(
    `/notification/count`,
    (url) =>
      axiosPrivate
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data?.data)
  );

  return (
    <div className=" headerAdminLayout  border-b-4 border-grey  ">
      <div className="">
        <p className="text-[#FF6B35] font-bold text-2xl">Hello {profile.username}</p>
        <p className="text-sm">Semoga Harimu Menyenangkan</p>
      </div>
      <div className="flex py-2 gap-x-6">
        <Notifikasi counter={data?.notification} />
        <div className="">
          <p className="font-semibold ">{ profile.username }</p>
          <p className="text-sm">{profile.nickname === "OPM" ? "Super Admin" : "Admin"}</p>
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
}

export default HeaderAdmin;

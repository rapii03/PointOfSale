'use client';

import { Avatar, Dropdown } from 'flowbite-react';

interface ProfilePosProps {
  username: string;
  image: string;
  logout: () => void;
}

const ProfilePos = ({ username, image, logout }: ProfilePosProps ) => {

    return (
        <Dropdown
        label={
        <Avatar img={image} alt='Kasir' size={"sm"} rounded>
        <div className="flex flex-start flex-col">
          <div className='text-start text-[14px] font-semibold'>{username}</div>
          <div className="text-start text-[10px] text-[#5E5E5D]">Cashier</div>
        </div>
      </Avatar>}
        arrowIcon={false}
        inline
      >
        <Dropdown.Item onClick={logout} className='text-[14px] p-1'>Keluar</Dropdown.Item>
      </Dropdown>
    );
}


export default ProfilePos
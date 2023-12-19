'use client';

import { Avatar, Dropdown } from 'flowbite-react';

const ProfilePos = () => {
    return (
        <Dropdown
        label={
        <Avatar img="/assets/pos/profile.png" size={"sm"} rounded>
        <div className="flex flex-start flex-col">
          <div className='text-start text-[14px] font-semibold'>Amel Sinta</div>
          <div className="text-start text-[10px] text-[#5E5E5D]">Cashier</div>
        </div>
      </Avatar>}
        arrowIcon={false}
        inline
      >
        <Dropdown.Item href='/' className='text-[14px] p-1'>Keluar</Dropdown.Item>
      </Dropdown>
    );
}


export default ProfilePos
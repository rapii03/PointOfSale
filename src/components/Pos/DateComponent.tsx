// components/DateComponent.tsx
import React, { useEffect, useState } from 'react';

const DateComponent: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // Fungsi untuk memperbarui tanggal setiap detik
        const updateDate = () => {
            setCurrentDate(new Date());
        };

        // Set interval untuk memanggil fungsi update setiap detik
        const intervalId = setInterval(updateDate, 1000);

        // Membersihkan interval ketika komponen unmount
        return () => clearInterval(intervalId);
    }, []);

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };

        return new Intl.DateTimeFormat('id-ID', options).format(date);
    };

    const formattedDate = formatDate(currentDate);

    return (
        <div className="">
            <div className="font-semibold text-[14px] text-white">
                {formattedDate}
            </div>
        </div>
    );
};

export default DateComponent;

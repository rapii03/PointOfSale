import IconNotif from "./Icons/IconNotif";

export interface CounterProps {
    counter?: number | undefined; // Mengizinkan counter menjadi undefined
}

const NotifCounter = ({
    counter
}: CounterProps) => {
    // Mengecek apakah counter memiliki nilai sebelum menampilkan
    const shouldDisplayCounter = counter !== undefined;

    return (
        <div className="inline-block relative">
            {shouldDisplayCounter && (
                <div className="counter absolute text-[6px] w-3 h-3 flex justify-center items-center font-medium p-[1px] rounded-[50%] text-white bg-[#FB1919] right-0 -top-[4px]">
                    {counter}
                </div>
            )}
            <IconNotif></IconNotif>
        </div>
    );
}

export default NotifCounter;

// components/TimeComponent.tsx
import { useEffect, useState } from 'react';

const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}.${minutes}.${seconds} WIB`;
};

const TimeComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="text-[14px] text-white" dangerouslySetInnerHTML={{ __html: formatTime(currentTime) }} />
  );
};

export default TimeComponent;

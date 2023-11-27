import { useState } from 'react';
import MinIcon from '../Icons/MinIcon';
import MaxIcon from '../Icons/MaxIcon';

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    setIsFullscreen(!isFullscreen);
  };

  return (
    <button
      className=" bg-white rounded-md flex-1flex justify-center items-center  p-[5px] border focus:ring-grey focus:border-grey border-grey"
      onClick={toggleFullscreen}
    >
      {isFullscreen ? <MinIcon /> : <MaxIcon />}
    </button>
  );
};

export default FullscreenButton;

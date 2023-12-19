import React, { ReactNode } from "react";
import { Toast } from "flowbite-react";
type Props = {
  text?: string;
  children?: ReactNode;
  className?: string;
  onDismiss?: () => void;
};
const ToastComponent = ({ text, children, className, onDismiss }: Props) => {
  return (
    <div className={className}>
      <Toast
        theme={{
          root: {
            base: "flex w-full border-2 border-[#FF6B35] max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400",
            closed: "opacity-0 ease-out",
          },
        }}
      >
        {children}
        <div className="ml-3 text-sm font-normal text-[#FF6B35]">{text}</div>
        <Toast.Toggle onDismiss={onDismiss} />
      </Toast>
    </div>
  );
};

export default ToastComponent;

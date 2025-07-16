"use client";

import { useEffect, useState } from "react";

type PopupProps = {
  message: string;
  onCloseAction: () => void;
  type?: "success" | "error";
  animationDuration?: number;
};

export const Popup = ({ message, onCloseAction, type = "success", animationDuration = 1000 }: PopupProps) => {
  const [visible, setVisible] = useState(true);
  const popupClassName = [
    "fixed top-5 left-1/2 -translate-x-1/2 px-6 py-4 text-white rounded shadow-lg z-overDrawer transition-all " +
      "duration-300 flex items-center gap-3 font-medium text-base",
    type === "error" ? "bg-errorColor" : "bg-acceptColor",
    visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-8 pointer-events-none",
  ].join(" ");

  useEffect(() => {
    const hideTimeout = setTimeout(() => setVisible(false), animationDuration);
    const closeTimeout = setTimeout(() => onCloseAction(), animationDuration + 300);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(closeTimeout);
    };
  }, [animationDuration, onCloseAction]);

  return (
    <div className={popupClassName} role="alert" aria-live="assertive">
      <p>{message}</p>
      <button
        className="text-white text-lg cursor-pointer bg-transparent border-none p-0"
        onClick={onCloseAction}
        aria-label="Закрыть уведомление"
      >
        ✖
      </button>
    </div>
  );
};

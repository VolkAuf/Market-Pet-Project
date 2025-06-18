"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type PopupProps = {
  message: string;
  onClose: () => void;
  type?: "success" | "error";
  animationDuration?: number;
};

export const Popup = ({ message, onClose, type = "success", animationDuration = 1000 }: PopupProps) => {
  const [visible, setVisible] = useState(true);
  const popupClassName = [
    styles.popup,
    type === "error" ? styles.error : styles.success,
    visible ? styles.show : styles.hide,
  ].join(" ");

  useEffect(() => {
    const hideTimeout = setTimeout(() => setVisible(false), animationDuration);
    const closeTimeout = setTimeout(() => onClose(), animationDuration + 300);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(closeTimeout);
    };
  }, [animationDuration, onClose]);

  return (
    <div className={popupClassName} role="alert" aria-live="assertive">
      <p>{message}</p>
      <button onClick={onClose} aria-label="Закрыть уведомление">
        ✖
      </button>
    </div>
  );
};

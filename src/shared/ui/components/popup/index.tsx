"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type PopupProps = {
  message: string;
  onCloseAction: () => void;
  type?: "success" | "error";
  animationDuration?: number;
};

export const Popup = ({ message, onCloseAction, type = "success", animationDuration = 1000 }: PopupProps) => {
  const [visible, setVisible] = useState(true);
  const popupClassName = [
    styles.popup,
    type === "error" ? styles.error : styles.success,
    visible ? styles.show : styles.hide,
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
      <button className={styles.popup__closeButton} onClick={onCloseAction} aria-label="Закрыть уведомление">
        ✖
      </button>
    </div>
  );
};

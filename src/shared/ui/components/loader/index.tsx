"use client";

import styles from "./styles.module.scss";

type LoaderProps = {
  isActive: boolean;
  text: string;
};

export const Loader = ({ isActive, text }: LoaderProps) => {
  return <> {isActive ? <h2 className={styles.loader}>{text}</h2> : null}</>;
};

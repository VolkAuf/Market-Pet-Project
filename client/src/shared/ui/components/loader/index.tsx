"use client";

type LoaderProps = {
  isActive: boolean;
  text: string;
};

export const Loader = ({ isActive, text }: LoaderProps) => {
  return <> {isActive ? <h2 className="text-center bg-black text-white p-4 rounded">{text}</h2> : null}</>;
};

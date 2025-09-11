import { type ChangeEvent, useCallback } from "react";

type TextFilterProps = {
  value: string;
  onChange: (val: string) => void;
};

export function TextFilter({ value, onChange }: TextFilterProps) {
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange]);

  return (
    <input
      className="border rounded px-2 py-1 w-full text-sm placeholder-black"
      placeholder="Search..."
      value={value}
      onChange={changeHandler}
    />
  );
}

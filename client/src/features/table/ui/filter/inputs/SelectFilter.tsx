import { type ChangeEvent, useCallback } from "react";

type SelectFilterProps = {
  value: string;
  options: string[];
  onChange: (val: string) => void;
};

export function SelectFilter({ value, options, onChange }: SelectFilterProps) {
  const changeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value), [onChange]);

  return (
    <select className="border rounded px-2 py-1 text-sm " value={value} onChange={changeHandler}>
      <option value="any">Any</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

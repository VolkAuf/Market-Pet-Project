import { type ChangeEvent, useCallback } from "react";

type BooleanFilterProps = {
  value: boolean | "any";
  onChange: (val: boolean | "any") => void;
};

export function BooleanFilter({ value, onChange }: BooleanFilterProps) {
  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const raw = e.target.value;
      if (raw === "any") onChange("any");
      else if (raw === "true") onChange(true);
      else onChange(false);
    },
    [onChange],
  );

  return (
    <select
      className="border rounded px-2 py-1 text-sm"
      value={value === true ? "true" : value === false ? "false" : value}
      onChange={changeHandler}
    >
      <option value="any">Any</option>
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  );
}

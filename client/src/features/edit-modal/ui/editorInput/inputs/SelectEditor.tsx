import { useCallback, type ChangeEvent } from "react";

type SelectEditorProps = {
  value: string;
  onChange: (val: string) => void;
  options: Array<string>;
  disabled: boolean;
};

export function SelectEditor({ value, options, onChange, disabled }: SelectEditorProps) {
  const changeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value), [onChange]);

  return (
    <select
      className={`border rounded px-2 py-1 ${disabled ? "border-red-500" : ""}`}
      value={value}
      onChange={changeHandler}
      disabled={disabled}
    >
      {options.map((o) => (
        <option key={String(o)} value={String(o)}>
          {String(o)}
        </option>
      ))}
    </select>
  );
}

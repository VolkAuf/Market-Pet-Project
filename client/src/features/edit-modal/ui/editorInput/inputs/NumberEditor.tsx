import { type ChangeEvent, useCallback } from "react";

type NumberEditorProps = {
  value: number | null;
  onChange: (val: number | null) => void;
  placeholder: string;
  disabled: boolean;
};

export function NumberEditor({ value, onChange, placeholder, disabled }: NumberEditorProps) {
  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const num = Number(raw);
      onChange(Number.isFinite(num) ? num : null);
    },
    [onChange],
  );

  return (
    <input
      type="number"
      className="border rounded px-2 py-1"
      value={value ?? ""}
      onChange={changeHandler}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

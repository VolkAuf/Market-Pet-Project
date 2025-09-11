import { useCallback, type ChangeEvent } from "react";

type BooleanEditorProps = {
  value: boolean;
  onChange: (val: boolean) => void;
  disabled: boolean;
};

export function BooleanEditor({ value, onChange, disabled }: BooleanEditorProps) {
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked), [onChange]);

  return (
    <input className="size-5" type="checkbox" checked={Boolean(value)} onChange={changeHandler} disabled={disabled} />
  );
}

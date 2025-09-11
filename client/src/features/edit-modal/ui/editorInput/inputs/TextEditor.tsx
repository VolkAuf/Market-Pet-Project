import { useCallback, type ChangeEvent } from "react";

type TextEditorProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  disabled: boolean;
};

export function TextEditor({ value, onChange, placeholder, disabled }: TextEditorProps) {
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange]);

  return (
    <input
      className="border rounded px-2 py-1"
      value={value}
      onChange={changeHandler}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

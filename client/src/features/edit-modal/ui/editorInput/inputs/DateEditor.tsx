import { useCallback, type ChangeEvent } from "react";
import { isoToDateTimeLocal, localToIso0Z } from "@/shared/utils/dateConvert";

type DateEditorProps = {
  value: string | null;
  onChange: (val: string) => void;
  disabled: boolean;
};

export function DateEditor({ value, onChange, disabled }: DateEditorProps) {
  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(localToIso0Z(e.target.value));
    },
    [onChange],
  );

  return (
    <input
      type="datetime-local"
      step={1}
      className="border rounded px-2 py-1"
      value={value ? isoToDateTimeLocal(value) : ""}
      onChange={changeHandler}
      disabled={disabled}
    />
  );
}

import { memo, useCallback } from "react";
import { BooleanEditor } from "@/features/edit-modal/ui/editorInput/inputs/BooleanEditor";
import { DateEditor } from "@/features/edit-modal/ui/editorInput/inputs/DateEditor";
import { NumberEditor } from "@/features/edit-modal/ui/editorInput/inputs/NumberEditor";
import { SelectEditor } from "@/features/edit-modal/ui/editorInput/inputs/SelectEditor";
import { TextEditor } from "@/features/edit-modal/ui/editorInput/inputs/TextEditor";
import type { Column } from "@/features/table/types";
import type { BaseTypes } from "@/shared/utils/types";

type EditorInputProps<T> = {
  col: Column<T>;
  value: BaseTypes;
  onChange: (key: string, val: BaseTypes) => void;
  enabled: boolean;
};

export function EditorInput<T>({ col, value, onChange, enabled }: EditorInputProps<T>) {
  const changeHandler = useCallback((v: BaseTypes) => onChange(col.key, v), [col, onChange]);

  const errorTypes = "input value type not match with column type";

  switch (col.type) {
    case "text": {
      const stringValue = value?.toString() ?? "";
      return <TextEditor value={stringValue} onChange={changeHandler} placeholder={stringValue} disabled={!enabled} />;
    }
    case "number": {
      const numberValue = value !== null ? Number(value) : null;
      return (
        <NumberEditor
          value={numberValue}
          onChange={changeHandler}
          placeholder={numberValue?.toString() ?? ""}
          disabled={!enabled}
        />
      );
    }
    case "boolean": {
      return <BooleanEditor value={Boolean(value)} onChange={changeHandler} disabled={!enabled} />;
    }
    case "date": {
      return <DateEditor value={value?.toString() || null} onChange={changeHandler} disabled={!enabled} />;
    }
    case "select": {
      if (col.options === undefined || col.options.length === 0) return null;
      const stringValue = value ? value.toString() : col.options[0];
      return <SelectEditor value={stringValue} options={col.options} onChange={changeHandler} disabled={!enabled} />;
    }
    default:
      console.error(errorTypes);
      return null;
  }
}

export const EditorInputMemo = memo(EditorInput) as typeof EditorInput;

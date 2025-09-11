import type { Range } from "@/features/table/types";

type DateFilterProps = {
  value: Range | null;
  onChange: (val: Range) => void;
};

export function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <div className="flex gap-1">
      <input
        type="date"
        className="border px-2 py-1 rounded text-sm"
        value={value?.from ?? ""}
        onChange={(e) => onChange({ ...value, from: e.target.value })}
      />
      <input
        type="date"
        className="border px-2 py-1 rounded text-sm"
        value={value?.to ?? ""}
        onChange={(e) => onChange({ ...value, to: e.target.value })}
      />
    </div>
  );
}

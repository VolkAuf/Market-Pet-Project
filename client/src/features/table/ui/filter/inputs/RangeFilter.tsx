import type { Range } from "@/features/table/types";

type RangeFilterProps = {
  value: Range | null;
  onChange: (val: Range) => void;
};

export function RangeFilter({ value, onChange }: RangeFilterProps) {
  return (
    <div className="flex gap-1">
      <input
        type="number"
        placeholder="from"
        className="border px-2 py-1 rounded w-1/2 text-sm placeholder-black"
        value={value?.from ?? ""}
        onChange={(e) => {
          const raw = e.target.value.slice(0, 17);
          const next = raw === "" ? raw : Number(raw);
          onChange({ ...value, from: next });
        }}
      />
      <input
        type="number"
        placeholder="to"
        className="border px-2 py-1 rounded w-1/2 text-sm placeholder-black"
        value={value?.to ?? ""}
        onChange={(e) => {
          const raw = e.target.value.slice(0, 17);
          const next = raw === "" ? raw : Number(raw);
          onChange({ ...value, to: next });
        }}
      />
    </div>
  );
}

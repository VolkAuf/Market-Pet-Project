export function isoToDateTimeLocal(iso: string): string {
  const d = new Date(iso);
  return d.toISOString().slice(0, 19);
}

export function localToIso0Z(val: string): string {
  const d = new Date(val);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  const iso = d.toISOString();
  return iso.replace(/\.\d{3}Z$/, ".0Z");
}

import { useEffect, useRef } from "react";

export function useRestoreFocus(open: boolean) {
  const lastActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastActive.current = document.activeElement as HTMLElement | null;
    } else if (lastActive.current) {
      lastActive.current.focus?.();
      lastActive.current = null;
    }
  }, [open]);
}

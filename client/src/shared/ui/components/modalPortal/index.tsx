import { memo, type MouseEvent, type ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import { useRestoreFocus } from "@/shared/hooks/useRestoreFocus";

type ModalPortalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export function ModalPortal({ children, open, onClose }: ModalPortalProps) {
  useBodyScrollLock(open);
  useRestoreFocus(open);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const target = useMemo(() => {
    let el = document.getElementById("modal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  const overlayClickHandler = useCallback(
    (e: MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open, onClose]);

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root || !target) return;
    if (open) {
      root.setAttribute("inert", "");
      target.removeAttribute("inert");
    } else {
      root.removeAttribute("inert");
      target.setAttribute("inert", "");
    }

    return () => {
      root.removeAttribute("inert");
      target.setAttribute("inert", "");
    };
  }, [open, target]);

  return createPortal(
    <div
      ref={overlayRef}
      onMouseDown={overlayClickHandler}
      className="fixed inset-0 bg-black/30 z-[1000] flex items-center justify-center"
      aria-hidden={false}
    >
      {children}
    </div>,
    target,
  );
}

export const ModalPortalMemo = memo(ModalPortal) as typeof ModalPortal;

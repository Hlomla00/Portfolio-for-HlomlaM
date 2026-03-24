import { useEffect } from "react";
import { X } from "lucide-react";

interface SwipePanelProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SwipePanel = ({ open, onClose, children }: SwipePanelProps) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className={`swipe-panel ${open ? "open" : ""}`}>
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[60] p-2 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>
      <div className="p-6 md:p-12 pt-20 max-w-4xl mx-auto">{children}</div>
    </div>
  );
};

export default SwipePanel;

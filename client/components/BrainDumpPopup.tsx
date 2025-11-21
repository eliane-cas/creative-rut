import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface BrainDumpPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrainDumpPopup: React.FC<BrainDumpPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const savedText = localStorage.getItem("braindump-text");
    if (savedText) {
      setText(savedText);
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem("braindump-text", text);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-xl bg-gradient-to-br from-purple-100/80 to-white/80 rounded-[32px] border-2 border-neutral-300/40 shadow-xl animate-fade-in max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-neutral-800 mb-1">
                  Brain Dump
                </h2>
                <p className="text-sm font-light text-neutral-600">
                  Let it all out.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-500 hover:text-neutral-700 transition-colors flex-shrink-0"
                title="Close"
              >
                <svg
                  className="w-6 h-6 stroke-current stroke-[2]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Textarea */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write down everything on your mind..."
              className="w-full h-64 p-4 bg-white/60 border border-neutral-300/50 rounded-xl font-light text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400/50 focus:bg-white/80 resize-none"
            />

            {/* Buttons */}
            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border-2 border-neutral-300/60 text-neutral-700 font-light hover:bg-neutral-100/50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-full bg-neutral-800 text-white font-light hover:bg-neutral-700 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

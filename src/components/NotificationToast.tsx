import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface NotificationToastProps {
  message: string | null;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0F1E36] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-stone-700 animate-in slide-in-from-bottom-5 duration-300">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-xs sm:text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-stone-400 hover:text-white p-1 rounded-md transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

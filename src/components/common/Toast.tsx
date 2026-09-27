import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, setToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className={`
        flex items-start gap-3 p-4 rounded-md shadow-xl border
        bg-white border-neutral-200 text-neutral-900
        dark:bg-[#12121A] dark:border-[#222436] dark:text-neutral-100
      `}>
        <CheckCircle2 className="w-5 h-5 text-[#2F5CFF] dark:text-[#C6FF1A] shrink-0 mt-0.5" />
        <div className="flex-1 text-sm font-medium leading-snug">
          {toastMessage}
        </div>
        <button
          onClick={() => setToast('')}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-0.5"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

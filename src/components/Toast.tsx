import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9990] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto bg-dark-card/95 border border-electric-lime/40 backdrop-blur-xl px-5 py-3.5 rounded-full shadow-2xl flex items-center justify-between gap-3 text-sm text-typography-light"
            onClick={() => onDismiss(toast.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-electric-lime/10 flex items-center justify-center text-electric-lime shrink-0">
                {toast.type === 'info' ? <Info size={16} /> : <CheckCircle2 size={16} />}
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-semibold tracking-wider text-white">
                  {toast.title}
                </span>
                {toast.message && (
                  <span className="text-xs text-typography-muted font-mono">
                    {toast.message}
                  </span>
                )}
              </div>
            </div>
            <span className="font-mono text-[10px] text-electric-lime/80 uppercase tracking-widest pl-2">
              DISMISS
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

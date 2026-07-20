'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Play, X } from 'lucide-react';

export function VideoModal({ videoUrl, triggerLabel }: { videoUrl: string; triggerLabel: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-md transition-shadow hover:shadow-lg"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white transition-transform group-hover:scale-105">
          <Play size={14} fill="currentColor" className="ml-0.5" />
        </span>
        {triggerLabel}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              >
                <X size={18} />
              </button>
              <video src={videoUrl} controls autoPlay className="aspect-video w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

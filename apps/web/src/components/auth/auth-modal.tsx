'use client';

import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useAuthModal } from '@/lib/auth/auth-modal-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { LoginForm } from './login-form';
import { SignupForm } from './signup-form';
import { ForgotPasswordForm } from './forgot-password-form';

export function AuthModal() {
  const { view, close } = useAuthModal();
  const { t } = useLocale();
  const open = view !== 'closed';
  const titles: Record<string, string> = {
    login: t('auth.modalTitleLogin'),
    signup: t('auth.modalTitleSignup'),
    forgot: t('auth.modalTitleForgot'),
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label={t('auth.close')}
              className="absolute end-5 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-ink/[0.05] hover:text-ink"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-extrabold text-ink">{titles[view] ?? ''}</h2>

            <div className="mt-6">
              {view === 'login' && <LoginForm />}
              {view === 'signup' && <SignupForm />}
              {view === 'forgot' && <ForgotPasswordForm />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

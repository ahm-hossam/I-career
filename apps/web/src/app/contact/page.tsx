'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Linkedin, Mail, Send } from 'lucide-react';
import { cn } from '@i-career/utils';
import { CONTACT_FORM, CONTACT_PAGE, CONTACT_SIDE } from '@/data/contact';

export default function ContactPage() {
  const [who, setWho] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <p className="text-sm font-bold uppercase tracking-wide text-brand-600">{CONTACT_PAGE.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl">{CONTACT_PAGE.title}</h1>
        <p className="mt-4 text-ink-soft">{CONTACT_PAGE.subhead}</p>
      </motion.div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-3xl border border-ink/[0.07] bg-white p-6 shadow-sm sm:p-8"
        >
          <fieldset>
            <legend className="text-sm font-bold text-ink">{CONTACT_FORM.whoAreYouLabel}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONTACT_FORM.whoAreYouOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setWho(option)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                    who === option
                      ? 'border-brand-500 bg-brand-500 text-white'
                      : 'border-ink/10 text-ink-soft hover:bg-ink/[0.04]',
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="text-sm font-bold text-ink">{CONTACT_FORM.serviceLabel}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONTACT_FORM.serviceOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setService(option)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                    service === option
                      ? 'border-brand-500 bg-brand-500 text-white'
                      : 'border-ink/10 text-ink-soft hover:bg-ink/[0.04]',
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
              Name
              <input
                required
                type="text"
                name="name"
                className="rounded-xl border border-ink/10 px-4 py-2.5 font-normal text-ink outline-none transition-colors focus:border-brand-500"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
              Email
              <input
                required
                type="email"
                name="email"
                className="rounded-xl border border-ink/10 px-4 py-2.5 font-normal text-ink outline-none transition-colors focus:border-brand-500"
              />
            </label>
          </div>

          <label className="mt-4 flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Message
            <textarea
              required
              name="message"
              rows={4}
              className="resize-none rounded-xl border border-ink/10 px-4 py-2.5 font-normal text-ink outline-none transition-colors focus:border-brand-500"
            />
          </label>

          <motion.button
            type="submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-300 px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-shadow hover:shadow-md"
          >
            {CONTACT_FORM.submitLabel}
            <Send size={16} />
          </motion.button>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm font-medium text-brand-600"
              role="status"
            >
              Message sent — we&rsquo;ll be in touch soon.
            </motion.p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-between gap-8 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-hero p-8 text-white shadow-sm"
        >
          <div>
            <h2 className="text-2xl font-bold text-balance">{CONTACT_SIDE.heading}</h2>
            <a
              href={`mailto:${CONTACT_SIDE.email}`}
              className="mt-4 inline-flex items-center gap-2 text-white/90 underline-offset-4 hover:underline"
            >
              <Mail size={18} />
              {CONTACT_SIDE.email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center gap-3 text-sm font-medium text-white/85 hover:text-white">
              <Facebook size={18} />
              {CONTACT_SIDE.socialLabels.facebook}
            </a>
            <a href="#" className="flex items-center gap-3 text-sm font-medium text-white/85 hover:text-white">
              <Linkedin size={18} />
              {CONTACT_SIDE.socialLabels.linkedin}
            </a>
            <a href="#" className="flex items-center gap-3 text-sm font-medium text-white/85 hover:text-white">
              <Instagram size={18} />
              {CONTACT_SIDE.socialLabels.instagram}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { StatCounter } from '@/components/stat-counter';
import { VideoModal } from '@/components/video-modal';
import { STATS } from '@/data/home';
import { MISSION, NUMBERS_HEADING, TEAM, VALUES, VISION, WHO_ARE_WE } from '@/data/about';

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-hero via-brand-500 to-brand-600 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-bold uppercase tracking-widest text-white/80">{VISION.eyebrow}</p>
            <h1 className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl">{VISION.text}</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/20 bg-white/10 px-6 py-8 shadow-xl backdrop-blur-xl"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-white/80">{MISSION.eyebrow}</p>
            <p className="mt-3 text-balance text-xl font-semibold text-white">{MISSION.text}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-bold uppercase tracking-wide text-brand-600">{WHO_ARE_WE.eyebrow}</p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{WHO_ARE_WE.paragraph}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-ink shadow-sm"
          >
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-accent-300/20 blur-2xl" />
            <VideoModal videoUrl={WHO_ARE_WE.videoUrl} triggerLabel={WHO_ARE_WE.playVideoLabel} />
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-50/60 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center text-sm font-bold uppercase tracking-wide text-brand-600"
          >
            {VALUES.eyebrow}
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {VALUES.items.map((value, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-ink/[0.06] bg-white px-4 py-6 text-center shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
                  <Sparkles size={18} />
                </span>
                <span className="text-sm font-bold text-ink">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center text-3xl font-extrabold text-ink sm:text-[32px]"
          >
            {NUMBERS_HEADING}
          </motion.h2>
          <div className="mt-10 grid grid-cols-3 gap-6 rounded-3xl border border-ink/[0.06] bg-brand-50/50 px-6 py-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="bg-brand-50/60 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-extrabold text-ink sm:text-[32px]">{TEAM.heading}</h2>
            <p className="mt-2 text-lg font-semibold text-brand-600">{TEAM.subhead}</p>
            <p className="mt-4 text-ink-soft">{TEAM.paragraph}</p>
            <p className="mt-2 font-medium text-ink-soft">{TEAM.closing}</p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.members.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-4 rounded-2xl border border-ink/[0.06] bg-white px-6 py-8 text-center shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white">
                  {initialsOf(member.name)}
                </span>
                <div>
                  <p className="font-bold text-ink">{member.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

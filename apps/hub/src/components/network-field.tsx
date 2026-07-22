'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
  phase: number;
}

interface Packet {
  a: Particle;
  b: Particle;
  t: number;
  speed: number;
}

interface NetworkFieldProps {
  variant?: 'brand' | 'inverted';
  className?: string;
}

const LINK_DISTANCE = 190;
const CURSOR_DISTANCE = 220;
const MAX_PACKETS = 10;
const PACKET_SPAWN_CHANCE = 0.09;
const MAX_SPEED = .5;

/**
 * Animated connection network — drifting, gently pulsing nodes that link with
 * lines when close, send traveling pulses between each other, and reach toward
 * the cursor. Stands in for iCareer's "ecosystem" of youth, employers,
 * universities and NGOs, rather than generic decorative blur shapes.
 */
export function NetworkField({ variant = 'brand', className }: NetworkFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let packets: Packet[] = [];
    let frameId = 0;
    let tick = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const lineRgb = variant === 'brand' ? '46, 92, 66' : '255, 255, 255';
    const dotColor = variant === 'brand' ? 'rgba(79, 186, 116, 0.85)' : 'rgba(255, 255, 255, 0.9)';
    const accentColor = variant === 'brand' ? 'rgba(250, 162, 42, 0.9)' : 'rgba(253, 195, 116, 0.95)';
    const cursorRgb = variant === 'brand' ? '47, 143, 83' : '255, 255, 255';
    const packetColor = variant === 'brand' ? '250, 162, 42' : '255, 255, 255';

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      const count = Math.min(130, Math.max(45, Math.round((width * height) / 8000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        r: Math.random() * 1.5 + 1.2,
        accent: Math.random() < 0.14,
        phase: Math.random() * Math.PI * 2,
      }));
      packets = [];
    }

    function nearbyPairs(): Array<[Particle, Particle]> {
      const pairs: Array<[Particle, Particle]> = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < LINK_DISTANCE) pairs.push([particles[i], particles[j]]);
        }
      }
      return pairs;
    }

    function frame() {
      tick += 1;
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * 0.12;
        p.vy += (Math.random() - 0.5) * 0.12;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
      }

      if (!reduceMotion && packets.length < MAX_PACKETS && Math.random() < PACKET_SPAWN_CHANCE) {
        const pairs = nearbyPairs();
        if (pairs.length > 0) {
          const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
          packets.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.01 });
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            ctx!.strokeStyle = `rgba(${lineRgb}, ${(1 - dist / LINK_DISTANCE) * 0.26})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        const mdx = a.x - mouseX;
        const mdy = a.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < CURSOR_DISTANCE) {
          ctx!.strokeStyle = `rgba(${cursorRgb}, ${(1 - mdist / CURSOR_DISTANCE) * 0.55})`;
          ctx!.lineWidth = 1.2;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(mouseX, mouseY);
          ctx!.stroke();
        }
      }

      for (const p of particles) {
        const pulse = reduceMotion ? 1 : 0.7 + Math.sin(tick * 0.07 + p.phase) * 0.4;
        ctx!.globalAlpha = Math.max(0.35, pulse);
        ctx!.fillStyle = p.accent ? accentColor : dotColor;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * (0.85 + pulse * 0.25), 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      packets = packets.filter((pk) => pk.t < 1);
      for (const pk of packets) {
        pk.t += pk.speed;
        const x = pk.a.x + (pk.b.x - pk.a.x) * pk.t;
        const y = pk.a.y + (pk.b.y - pk.a.y) * pk.t;
        const fade = Math.sin(pk.t * Math.PI);
        ctx!.fillStyle = `rgba(${packetColor}, ${fade})`;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(${packetColor}, ${fade * 0.25})`;
        ctx!.beginPath();
        ctx!.arc(x, y, 5, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduceMotion) frameId = requestAnimationFrame(frame);
    }

    resize();
    initParticles();
    frame();

    const onResize = () => {
      resize();
      initParticles();
    };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [variant]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className ?? 'absolute inset-0 h-full w-full'} />;
}

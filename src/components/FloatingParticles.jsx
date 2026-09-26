import { useMemo } from 'react';

/* Particle characters for romantic effect */
const PARTICLES = ['❤️', '🌸', '✨', '💕', '🌹', '💫', '🌷', '💖'];

/**
 * Pure CSS floating particle background.
 * Each particle is absolutely positioned with random
 * left offset, animation duration, and delay.
 * No JS animation loops — purely CSS @keyframes.
 */
export default function FloatingParticles({ count = 18 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      char: PARTICLES[i % PARTICLES.length],
      left: `${5 + (i * 5.5) % 90}%`,
      delay: `${(i * 1.1) % 12}s`,
      duration: `${10 + (i * 2.3) % 10}s`,
      size: `${10 + (i * 3) % 8}px`,
    }));
  }, [count]);

  return (
    <div className="particle-container" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: '-30px',
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}

import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * A single glassmorphic message card with scroll-reveal animation.
 * @param {object}  props
 * @param {number}  props.index         – 1-based card number
 * @param {string}  props.text          – Main text content
 * @param {string}  [props.variant]     – 'headline' | 'arabic' | 'signature' | default
 * @param {number}  [props.delay]       – Transition delay in ms
 * @param {boolean} [props.showNumber]  – Show the small badge number
 */
export default function MessageCard({
  index,
  text,
  variant,
  delay = 0,
  showNumber = true,
}) {
  const ref = useScrollReveal({ threshold: 0.12 });

  const textClass =
    variant === 'headline'
      ? 'card-headline'
      : variant === 'arabic'
      ? 'card-arabic'
      : variant === 'signature'
      ? 'card-signature'
      : 'card-text';

  return (
    <article
      ref={ref}
      className="card relative"
      style={{ transitionDelay: `${delay}ms` }}
      role="article"
      aria-label={`Message card ${index}`}
    >
      {/* Floating glass background */}
      <div className="card-bg absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

      {/* 100% Static content container */}
      <div className="card-inner relative z-10">
        {showNumber && (
          <span className="slide-number" aria-hidden="true">
            {String(index).padStart(2, '0')}
          </span>
        )}

        {/* Decorative corner petals */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            fontSize: '1rem',
            opacity: 0.4,
          }}
        >
          🌸
        </span>

        <p className={textClass}>{text}</p>

        <div className="divider" aria-hidden="true">✦</div>
      </div>
    </article>
  );
}

/**
 * StickerField — renders floating, animated emoji stickers
 * pinned to the edges of their parent snap-section.
 *
 * Props:
 *   stickers: Array<{
 *     e: string,     // emoji
 *     t: number,     // top  %
 *     l: number,     // left %
 *     dur: number,   // animation duration (s)
 *     delay: number, // animation delay (s)
 *     drift: number, // translateY at 50% keyframe (px, negative = up)
 *     rot:  string,  // starting rotation (e.g. "-5deg")
 *     rot2: string,  // ending rotation at 50%
 *   }>
 */
export default function StickerField({ stickers = [] }) {
  return (
    <div className="sticker-field" aria-hidden="true">
      {stickers.map((s, i) => (
        <span
          key={i}
          className="sticker"
          style={{
            top:  `${s.t}%`,
            left: `${s.l}%`,
            '--dur':   `${s.dur}s`,
            '--delay': `${s.delay}s`,
            '--drift': `${s.drift}px`,
            '--rot':   s.rot,
            '--rot2':  s.rot2,
          }}
        >
          {s.e}
        </span>
      ))}
    </div>
  );
}

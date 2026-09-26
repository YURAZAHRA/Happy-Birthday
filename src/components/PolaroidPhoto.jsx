import { useState } from 'react';

/**
 * PolaroidPhoto — a single polaroid card with yellow tape.
 * Uses different tape styles per index (0-3).
 */
const TAPE_CONFIGS = [
  [{ cls: 'tape tape-top' }],
  [{ cls: 'tape tape-tl' }, { cls: 'tape tape-tr' }],
  [{ cls: 'tape tape-top' }],
  [{ cls: 'tape tape-tl' }, { cls: 'tape tape-tr' }],
];

export default function PolaroidPhoto({ src, caption, idx }) {
  const [imgError, setImgError] = useState(false);
  const tapes = TAPE_CONFIGS[idx % TAPE_CONFIGS.length];

  return (
    <div className={`polaroid-wrapper polaroid-${(idx % 4) + 1}`}>
      <div className="polaroid">
        {/* Tape strips */}
        {tapes.map((t, ti) => (
          <div key={ti} className={t.cls} />
        ))}

        {/* Image */}
        {!imgError ? (
          <img
            src={src}
            alt={caption}
            className="polaroid-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="polaroid-img-placeholder">📷</div>
        )}

        {/* Caption */}
        <p className="polaroid-caption">{caption}</p>
      </div>
    </div>
  );
}

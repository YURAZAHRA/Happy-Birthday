import { useScrollReveal } from '../hooks/useScrollReveal';
import PolaroidPhoto from './PolaroidPhoto';

const photos = [
  {
    id: 1,
    src: '/1.webp',
    caption: 'Senyuman yang paling aku cintai ✨',
    className: 'polaroid-wrapper polaroid-1',
    tapeStyle: 'top',
  },
  {
    id: 2,
    src: '/2.webp',
    caption: 'Wajah tercantik yang selalu kurindukan ❤️',
    className: 'polaroid-wrapper polaroid-2',
    tapeStyle: 'corners',
  },
  {
    id: 3,
    src: '/3.webp',
    caption: 'Bidadari terindah dalam balutan khimar 🌸',
    className: 'polaroid-wrapper polaroid-3',
    tapeStyle: 'top',
  },
  {
    id: 4,
    src: '/4.webp',
    caption: 'Kita, selamanya dalam doa dan cinta 🤍',
    className: 'polaroid-wrapper polaroid-4',
    tapeStyle: 'corners',
  },
];

export default function PhotoGallery() {
  const titleRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section aria-label="Photo memories gallery">
      {/* Section heading */}
      <h2 ref={titleRef} className="gallery-title">
        📸 &nbsp;Our Moments&nbsp; 📸
      </h2>

      {/* Scattered polaroid board */}
      <div className="gallery-section">
        {photos.map((photo) => (
          <PolaroidPhoto
            key={photo.id}
            id={photo.id}
            src={photo.src}
            caption={photo.caption}
            className={`polaroid-wrapper polaroid-${photo.id}`}
            tapeStyle={photo.tapeStyle}
          />
        ))}
      </div>
    </section>
  );
}

import { useEffect, useRef, useState, useCallback, memo } from "react";
import confetti from "canvas-confetti";
import "./index.css";

/* ─── Confetti Color Palette ───────────────────────────────── */
const THEME_CONFETTI_COLORS = [
  "#e0a899", // Rose gold
  "#b76e79", // Deep rose gold
  "#ffb6c1", // Soft pink
  "#f8c8dc", // Blush pink
  "#ffffff", // Crisp white
];

/* ─── Slides Data (13 Slides - Full Indonesian Content) ────── */
const SLIDES = [
  {
    id: 1,
    type: "title",
    text: "Selamat ulang tahun yang ke-21 untuk Zahra-ku yang cantik. ❤️",
  },
  {
    id: 2,
    type: "body",
    text: "Saat kamu menginjak usia 21 tahun hari ini, aku melihat betapa luar biasanya dirimu sekarang, dan aku sangat bangga. Melihat pertumbuhanmu, kekuatanmu, dan sejauh mana kamu melangkah menjadi dirimu yang sekarang, membuat hatiku penuh dengan kekaguman padamu.",
  },
  {
    id: 3,
    type: "body",
    text: "Aku masih sering teringat pesan pertama kita, momen saat kita pertama kali saling mengakui perasaan, bahkan saat kita bertengkar. Setiap momen itu sangat berarti bagiku karena itulah yang membangun fondasi hubungan kita.",
  },
  {
    id: 4,
    type: "body",
    text: "Bahkan melalui jarak dan jeda yang sengaja kita ambil—mundur selama beberapa minggu untuk mencari ridha Allah dan menyiapkan hati kita untuk hari saat semuanya menjadi halal—setiap kali kita kembali terhubung, itu membuktikan kepadaku bahwa kamu akan selalu menjadi kedamaian dan tempat berlindungku yang paling aman.",
  },
  {
    id: 5,
    type: "body",
    text: "Aku berdoa agar Allah mengisi hari-harimu dengan kebahagiaan mutlak, memberimu kesuksesan di setiap langkah, dan menjaga hatimu yang tulus. Semoga Dia menjadikan usiamu yang baru ini sebagai tahun terkabulnya doa-doa, kedamaian tanpa akhir, dan kejutan yang indah.",
  },
  {
    id: 6,
    type: "body",
    text: "Yang paling aku cintai darimu adalah keseimbangan kepribadianmu yang begitu indah dan langka ini. Kamu memiliki jiwa yang ceria, menyenangkan, dan sangat manis yang selalu bisa menerangi hari-hariku yang paling gelap dan membuatku tersenyum seberat apa pun hariku.",
  },
  {
    id: 7,
    type: "body",
    text: "Namun di saat yang sama, aku sangat menghormati dan menghargai betapa lembut, pengertian, dan sopannya dirimu. Caramu mendengarkanku, menghargai kata-kataku, dan menjaga batasan yang kita buat bersama membuatku sangat menghargaimu lebih dari yang bisa diungkapkan kata-kata. Kamu membuatku begitu mudah untuk memimpin, melindungimu, dan mencintaimu seutuhnya.",
  },
  {
    id: 8,
    type: "body",
    text: "Semoga Allah memberkahi niat baik kita, mempermudah jalan kita menuju halal, dan mengisi masa depan kita dengan ketenangan. Aku berdoa semoga kita bersama di Jannah sebagaimana kita berjuang untuk bersama di kehidupan ini.",
  },
  {
    id: 9,
    type: "body",
    text: "Untuk ulang tahun yang spesial ini, aku ingin kamu tahu bahwa aku sedang menyiapkan hadiah yang sangat istimewa hanya untukmu. Aku mencurahkan banyak pikiran dan usaha untuk membangunnya sedikit demi sedikit.",
  },
  {
    id: 10,
    type: "body",
    text: "Karena aku ingin hadiah ini benar-benar sempurna untukmu, masih butuh beberapa sentuhan akhir dan belum siap untuk diberikan hari ini. Aku mohon kamu sedikit bersabar, tapi aku pastikan padamu, penantian ini akan sangat sepadan.",
  },
  {
    id: 11,
    type: "body",
    text: "Langkahkan kakimu di usia yang baru ini dengan percaya diri, Sayang. Aku ada tepat di sisimu, mendukungmu dalam segala hal yang kamu lakukan. Nikmati usia 21 tahunmu sepenuhnya, jaga hatimu yang indah, dan semoga Allah memberkahi semua hari-harimu yang akan datang. Aku sangat mencintaimu. ❤️",
  },
  {
    id: 12,
    type: "quran",
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ",
    translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    reference: "Ar-Rum 21",
  },
  {
    id: 13,
    type: "signature",
    text: "Milikmu, Ahmed.",
  },
];

/* ─── Ambient Decorative Stickers ──────────────────────────── */
const STICKER_POSITIONS = [
  { top: "6%",  left: "8%",  shape: "heart",   color: "rgba(255,182,193,0.7)",  size: 14, dur: "4s",   delay: "0s",    rot: "-10deg" },
  { top: "12%", left: "84%", shape: "star",    color: "rgba(232,180,248,0.6)",  size: 16, dur: "4.5s", delay: "-1s",   rot: "12deg"  },
  { top: "22%", left: "5%",  shape: "sparkle", color: "rgba(255,212,168,0.6)",  size: 12, dur: "3.8s", delay: "-2s",   rot: "0deg"   },
  { top: "28%", left: "91%", shape: "heart",   color: "rgba(247,215,148,0.65)", size: 18, dur: "4.8s", delay: "-0.5s", rot: "8deg"   },
  { top: "38%", left: "12%", shape: "dot",     color: "rgba(255,150,180,0.55)", size: 10, dur: "3.6s", delay: "-1.5s", rot: "0deg"   },
  { top: "45%", left: "86%", shape: "sparkle", color: "rgba(255,182,193,0.7)",  size: 14, dur: "4.2s", delay: "-3s",   rot: "-5deg"  },
  { top: "54%", left: "6%",  shape: "star",    color: "rgba(232,180,248,0.6)",  size: 16, dur: "4s",   delay: "-0.8s", rot: "15deg"  },
  { top: "61%", left: "78%", shape: "heart",   color: "rgba(255,212,168,0.6)",  size: 12, dur: "4.6s", delay: "-2.2s", rot: "-8deg"  },
  { top: "68%", left: "18%", shape: "diamond", color: "rgba(247,215,148,0.65)", size: 14, dur: "3.5s", delay: "-1.8s", rot: "5deg"   },
  { top: "75%", left: "88%", shape: "heart",   color: "rgba(255,150,180,0.55)", size: 18, dur: "4.4s", delay: "-0.3s", rot: "0deg"   },
  { top: "82%", left: "4%",  shape: "sparkle", color: "rgba(255,182,193,0.7)",  size: 10, dur: "3.7s", delay: "-2.8s", rot: "-12deg" },
  { top: "86%", left: "72%", shape: "star",    color: "rgba(232,180,248,0.6)",  size: 14, dur: "4.8s", delay: "-1.2s", rot: "10deg"  },
  { top: "91%", left: "42%", shape: "heart",   color: "rgba(255,212,168,0.6)",  size: 12, dur: "3.9s", delay: "-2s",   rot: "-6deg"  },
  { top: "9%",  left: "55%", shape: "dot",     color: "rgba(247,215,148,0.65)", size: 8,  dur: "4.2s", delay: "-0.7s", rot: "0deg"   },
  { top: "50%", left: "50%", shape: "diamond", color: "rgba(255,150,180,0.55)", size: 16, dur: "4s",   delay: "-3.5s", rot: "20deg"  },
];

function StickerSVG({ shape, color, size }) {
  if (shape === "heart") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M12 21C12 21 3 14 3 8.5A4.5 4.5 0 0 1 12 6.9 4.5 4.5 0 0 1 21 8.5C21 14 12 21 12 21Z" fill={color}/>
      </svg>
    );
  }
  if (shape === "star") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={color}/>
      </svg>
    );
  }
  if (shape === "sparkle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color}/>
      </svg>
    );
  }
  if (shape === "diamond") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <polygon points="12,2 22,12 12,22 2,12" fill={color}/>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="6" fill={color}/>
    </svg>
  );
}

function StickersLayer() {
  return (
    <div className="stickers-layer" aria-hidden="true">
      {STICKER_POSITIONS.map((s, i) => (
        <span
          key={i}
          className="sticker"
          style={{
            top: s.top,
            left: s.left,
            "--dur": s.dur,
            "--delay": s.delay,
            "--rot": s.rot,
          }}
        >
          <StickerSVG shape={s.shape} color={s.color} size={s.size} />
        </span>
      ))}
    </div>
  );
}

/* ─── Touch Glow Orb (Zero Latency Touch + Idle Roaming Bounce) ─── */
function OilGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let isInteracting = false;
    let vx = 0.95;
    let vy = -0.95;
    let animId;

    const setPosition = (x, y) => {
      currentX = x;
      currentY = y;
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    };

    const handlePointerDown = (e) => {
      isInteracting = true;
      setPosition(e.clientX, e.clientY);
    };

    const handlePointerMove = (e) => {
      if (e.pointerType === "mouse" || isInteracting) {
        setPosition(e.clientX, e.clientY);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        isInteracting = true;
        setPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        isInteracting = true;
        setPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleRelease = () => {
      isInteracting = false;
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handleRelease, { passive: true });
    window.addEventListener("pointercancel", handleRelease, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleRelease, { passive: true });
    window.addEventListener("touchcancel", handleRelease, { passive: true });
    window.addEventListener("mouseleave", handleRelease, { passive: true });

    // Initial transform
    el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

    // Idle roaming loop using requestAnimationFrame
    const loop = () => {
      if (!isInteracting) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pad = Math.min(50, Math.min(width, height) * 0.12);

        currentX += vx;
        currentY += vy;

        if (currentX <= pad && vx < 0) {
          currentX = pad;
          vx = -vx;
        } else if (currentX >= width - pad && vx > 0) {
          currentX = width - pad;
          vx = -vx;
        }

        if (currentY <= pad && vy < 0) {
          currentY = pad;
          vy = -vy;
        } else if (currentY >= height - pad && vy > 0) {
          currentY = height - pad;
          vy = -vy;
        }

        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handleRelease);
      window.removeEventListener("pointercancel", handleRelease);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleRelease);
      window.removeEventListener("touchcancel", handleRelease);
      window.removeEventListener("mouseleave", handleRelease);
    };
  }, []);

  return <div id="oil-glow" ref={ref} aria-hidden="true" />;
}

/* ─── Minimal Progress Navigation Dots ─────────────────────── */
function ProgressDots({ total, active, onSelect }) {
  return (
    <nav className="progress-dots" aria-label="Slide progress">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          className={"progress-dot" + (i === active ? " active" : "")}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </nav>
  );
}

/* ─── Scroll Indicator ─────────────────────────────────────── */
function ScrollHint({ hidden }) {
  return (
    <div
      className={`scroll-hint transition-opacity duration-500 ${
        hidden ? "opacity-0 pointer-events-none hidden" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <span>SCROLL</span>
      <div className="scroll-hint-arrow" />
    </div>
  );
}

/* ─── Name Highlight Helper (Zahra, زهراء, Sayang) ──────────── */
function highlightNames(text) {
  return text.replace(
    /\b(Zahra|Sayang)\b|(زهراء)/g,
    '<span class="name-glow">$1$2</span>'
  );
}

/* ─── Slide Card with Separate Breathing Background ────────── */
function SlideCard({ slide, cardRef, isInitiallyVisible }) {
  let content;

  if (slide.type === "title") {
    content = (
      <>
        <div className="slide-number">_ {slide.id} _</div>
        <h1 className="card-title">
          Selamat ulang tahun yang ke-21 untuk <span className="name-glow">Zahra</span>-ku yang cantik. ❤️
        </h1>
        <div className="divider" aria-hidden="true">✦</div>
      </>
    );
  } else if (slide.type === "quran") {
    content = (
      <>
        <div className="slide-number">_ {slide.id} _</div>
        <p className="card-arabic" lang="ar" dir="rtl">{slide.arabic}</p>
        <div className="divider" aria-hidden="true">✦</div>
        <p className="card-translation">{slide.translation}</p>
        <p className="card-reference">{slide.reference}</p>
      </>
    );
  } else if (slide.type === "signature") {
    content = (
      <>
        <div className="slide-number">_ {slide.id} _</div>
        <p className="card-signature">{slide.text}</p>
      </>
    );
  } else {
    const html = highlightNames(slide.text);
    content = (
      <>
        <div className="slide-number">_ {slide.id} _</div>
        <p className="card-body" dangerouslySetInnerHTML={{ __html: html }} />
      </>
    );
  }

  return (
    <div className="card-wrapper h-[100dvh] w-full">
      <article ref={cardRef} className={`card relative${isInitiallyVisible ? " is-visible" : ""}`}>
        {/* Floating/breathing frosted glass background layer (moves independently along Y-axis) */}
        <div className="card-bg absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

        {/* 100% Static content container (firmly anchored, completely stationary & sharp) */}
        <div className="card-inner relative z-10">
          {content}
        </div>
      </article>
    </div>
  );
}

/* ─── Single Slide Section with Proximity Snap Anchor ──────── */
const SlideSection = memo(function SlideSection({ slide, index, onVisible }) {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const cardEl = cardRef.current;
    if (!sectionEl || !cardEl) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardEl.classList.add("is-visible");
            onVisible(index);
          } else {
            cardEl.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    obs.observe(sectionEl);
    return () => obs.disconnect();
  }, [index, onVisible]);

  return (
    <section
      ref={sectionRef}
      className="slide-section h-[100dvh] w-full"
      aria-label={`Slide ${index + 1}`}
      id={`slide-${index + 1}`}
    >
      <SlideCard slide={slide} cardRef={cardRef} isInitiallyVisible={index === 0} />
    </section>
  );
});

/* ─── Polaroid Photos Data ─────────────────────────────────── */
const POLAROIDS = [
  { src: `${import.meta.env.BASE_URL}1.webp`, caption: "Senyuman yang paling aku cintai ✨", tiltDeg: 2 },
  { src: `${import.meta.env.BASE_URL}2.webp`, caption: "Wajah tercantik yang selalu kurindukan ❤️", tiltDeg: -3 },
  { src: `${import.meta.env.BASE_URL}3.webp`, caption: "Bidadari terindah dalam balutan khimar 🌸", tiltDeg: 1.5 },
  { src: `${import.meta.env.BASE_URL}4.webp`, caption: "Kita, hari ini dan selamanya 🤍", tiltDeg: -2.5 },
];

/* ─── Gallery Section ──────────────────────────────────────── */
const GallerySection = memo(function GallerySection({ onVisible, totalSlides }) {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const wrapperEl = wrapperRef.current;
    if (!sectionEl || !wrapperEl) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wrapperEl.classList.add("is-visible");
            onVisible(totalSlides);
          } else {
            wrapperEl.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    obs.observe(sectionEl);
    return () => obs.disconnect();
  }, [onVisible, totalSlides]);

  return (
    <section
      ref={sectionRef}
      className="gallery-section no-scrollbar w-full flex flex-col items-center justify-center overflow-x-hidden"
      aria-label="Photo Gallery"
      id="gallery"
    >
      <div
        ref={wrapperRef}
        className="gallery-wrapper no-scrollbar w-full max-w-md mx-auto flex flex-col items-center justify-center overflow-x-hidden"
      >
        <h2 className="gallery-title">Our little moments ✨</h2>
        <div className="polaroid-stack w-full flex flex-col items-center justify-center gap-16 py-20">
          {POLAROIDS.map((p, i) => (
            <div
              key={i}
              className="polaroid"
              style={{
                "--tilt": p.tiltDeg + "deg",
                "--tape-rot": (i % 2 === 0 ? "-2.5deg" : "3deg"),
              }}
            >
              <div className="polaroid-tape" aria-hidden="true" />
              <div className="polaroid-img-wrap">
                <img src={p.src} alt={`Memory ${i + 1}`} loading="lazy" />
              </div>
              <p className="polaroid-caption">{p.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ─── Main Application Component ───────────────────────────── */
export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hintHidden, setHintHidden] = useState(false);
  const containerRef = useRef(null);
  const totalDots = SLIDES.length + 1;

  const handleVisible = useCallback((i) => {
    setActiveSlide(i);
    if (i > 0) {
      setHintHidden(true);
    }
  }, []);

  const handleSelectDot = (i) => {
    if (i > 0) {
      setHintHidden(true);
    }
    const el = i < SLIDES.length
      ? document.getElementById(`slide-${i + 1}`)
      : document.getElementById("gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Gentle, elegant burst on page load with low particle count (particleCount: 40)
  useEffect(() => {
    confetti({
      particleCount: 40,
      spread: 65,
      origin: { y: 0.65 },
      colors: THEME_CONFETTI_COLORS,
      startVelocity: 26,
      gravity: 0.65,
      scalar: 0.9,
      disableForReducedMotion: true,
    });
  }, []);

  // Scroll Indicator hide permanently when container scrollTop > 20, window scroll, or Slide 1 leaves viewport
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const top = Math.max(window.scrollY || 0, container?.scrollTop || 0);
      if (top > 20) {
        setHintHidden(true);
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver on Slide 1
    const slide1 = document.getElementById("slide-1");
    let observer;
    if (slide1) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.6) {
            setHintHidden(true);
          }
        },
        { threshold: [0, 0.6, 1.0] }
      );
      observer.observe(slide1);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const isEffectivelyHidden = hintHidden || activeSlide > 0;

  return (
    <>
      <OilGlow />
      <StickersLayer />
      <ProgressDots total={totalDots} active={activeSlide} onSelect={handleSelectDot} />
      <ScrollHint hidden={isEffectivelyHidden} />
      <main className="scroll-container no-scrollbar h-[100dvh] w-full overflow-x-hidden" ref={containerRef}>
        {SLIDES.map((slide, i) => (
          <SlideSection
            key={slide.id}
            slide={slide}
            index={i}
            onVisible={handleVisible}
          />
        ))}
        <GallerySection onVisible={handleVisible} totalSlides={SLIDES.length} />
      </main>
    </>
  );
}

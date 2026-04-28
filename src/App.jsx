import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import logo from './assets/logo.jpeg';
import './App.css';

/* ─── Custom Cursor ─── */
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const onMouseOver = (e) => {
      if (e.target.closest('.hover-target') || e.target.closest('button') || e.target.closest('a') || e.target.closest('.quiz-option')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <span className="cursor-text">View</span>
    </div>
  );
};

/* ─── Hero: Curtain Reveal ─── */
const Hero = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-richBlack">
      {/* Curtain overlay */}
      <motion.div
        className="absolute inset-0 bg-richBlack z-20"
        initial={{ y: 0 }}
        animate={{ y: revealed ? '-100%' : '0%' }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
      />

      {/* Logo with expansion */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.8 }}
      >
        <motion.img
          src={logo}
          alt="Everpace Logo"
          className="w-48 md:w-72 lg:w-96 grayscale hover:grayscale-0 transition-all duration-700 rounded-lg"
          whileHover={{ scale: 1.05 }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
        className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 tracking-tight"
      >
        Ink that outlasts time
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="text-secondary text-sm md:text-base tracking-[0.3em] uppercase font-light"
      >
        Everpace Tattoo Studio
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-secondary to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

/* ─── Portfolio: Horizontal Drag & Scroll Gallery ─── */
const Gallery = () => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const left = viewportWidth - containerWidth;
        setConstraints({ left: left < 0 ? left : 0, right: 0 });
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const currentX = x.get();
      const delta = e.deltaY;

      if (delta > 0 && currentX > constraints.left) {
        e.preventDefault();
        x.set(Math.max(currentX - delta * 1.5, constraints.left));
      } else if (delta < 0 && currentX < 0) {
        e.preventDefault();
        x.set(Math.min(currentX - delta * 1.5, 0));
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [constraints.left, x]);

  const tattoos = [
    { id: 1, src: logo, title: 'Abstract Flow', artist: 'Juve' },
    { id: 2, src: logo, title: 'Minimalist Geometry', artist: 'Juve' },
    { id: 3, src: logo, title: "Nature's Edge", artist: 'Juve' },
    { id: 4, src: logo, title: 'Modern Script', artist: 'Juve' },
    { id: 5, src: logo, title: 'Fine Line Art', artist: 'Juve' },
    { id: 6, src: logo, title: 'Eternal Bloom', artist: 'Juve' },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center bg-richBlack relative overflow-hidden py-24">
      <div className="absolute top-12 left-4 md:left-12 z-10">
        <h2 className="text-3xl md:text-5xl font-serif mb-2">Portfolio</h2>
        <p className="text-secondary text-xs tracking-[0.2em] uppercase">Drag or scroll to explore</p>
      </div>

      <motion.div
        ref={containerRef}
        style={{ x: smoothX }}
        drag="x"
        dragConstraints={constraints}
        className="parallax-container pl-4 md:pl-12 pt-24"
      >
        {tattoos.map((item, idx) => (
          <motion.div
            key={item.id}
            className="parallax-item hover-target glass glass-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <img src={item.src} alt={item.title} className="grayscale" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-xl font-serif">{item.title}</h3>
              <p className="text-secondary text-xs tracking-widest uppercase mt-1">by {item.artist}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

/* ─── Philosophy: Thin Stroke Typography ─── */
const Philosophy = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-richBlack relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-6xl mx-auto"
      >
        <motion.p
          className="philosophy-text font-serif"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          Permanent Art
        </motion.p>
        <motion.p
          className="philosophy-text font-serif mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          for Temporary Humans
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 max-w-xl mx-auto"
        >
          <p className="text-secondary text-sm md:text-base leading-relaxed font-light">
            Every piece we create is a dialogue between permanence and impermanence — 
            a ritual that transforms skin into canvas, and moments into eternity.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── Process: Vertical Timeline ─── */
const Process = () => {
  const steps = [
    { title: 'Consultation', desc: 'Understanding your story, vision, and the meaning behind your ink.' },
    { title: 'Stencil', desc: 'Translating ideas into precise skin-ready art with meticulous detail.' },
    { title: 'Inking', desc: 'Clinical safety meets artistic precision in every needle stroke.' },
    { title: 'Aftercare', desc: 'Guiding you through healing to ensure your art lasts a lifetime.' },
  ];

  return (
    <section className="py-32 px-4 md:px-12 bg-richBlack">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-4">The Ritual</h2>
          <p className="text-secondary text-xs tracking-[0.3em] uppercase">Our Process</p>
        </motion.div>

        <div className="timeline-container">
          <div className="timeline-line" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="timeline-step hover-target"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <span className="text-xs text-secondary mb-3 block tracking-widest">0{idx + 1}</span>
              <h3 className="step-title text-2xl md:text-3xl font-serif mb-3 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="step-desc text-secondary leading-relaxed max-w-md transition-colors duration-300 font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Digital Consultation Quiz ─── */
const ConsultationQuiz = () => {
  const [step, setStep] = useState(0);
  const [size, setSize] = useState('');
  const [placement, setPlacement] = useState('');

  const sizes = [
    { label: 'Kecil', desc: '3-8 cm', time: '1-2 jam' },
    { label: 'Sedang', desc: '8-15 cm', time: '2-4 jam' },
    { label: 'Besar', desc: '15+ cm', time: '4+ jam' },
  ];

  const placements = [
    { label: 'Lengan', desc: 'Forearm / Upper arm' },
    { label: 'Leher', desc: 'Side / Nape' },
    { label: 'Punggung', desc: 'Full / Upper / Lower' },
  ];

  const reset = () => {
    setStep(0);
    setSize('');
    setPlacement('');
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Halo Everpace! Saya ingin booking konsultasi tatto.\nUkuran: ${size}\nPenempatan: ${placement}\nMohon info lebih lanjut, terima kasih!`
    );
    return `https://wa.me/6282298402516?text=${text}`;
  };

  return (
    <section className="py-32 px-4 bg-richBlack">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Digital Consultation</h2>
          <p className="text-secondary text-xs tracking-[0.3em] uppercase">
            Dapatkan estimasi untuk tato impianmu
          </p>
        </motion.div>

        <div className="glass rounded-2xl p-8 md:p-12">
          {/* Progress */}
          <div className="quiz-progress mb-10">
            <div
              className="quiz-progress-fill"
              style={{ width: step === 0 ? '33%' : step === 1 ? '66%' : '100%' }}
            />
          </div>

          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-serif mb-8 text-center">Pilih ukuran tatomu</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sizes.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => { setSize(s.label); setStep(1); }}
                    className="quiz-option hover-target"
                  >
                    <div className="text-lg font-serif mb-1">{s.label}</div>
                    <div className="text-secondary text-xs">{s.desc}</div>
                    <div className="text-secondary text-xs mt-2">~{s.time}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-serif mb-8 text-center">Pilih penempatan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {placements.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => { setPlacement(p.label); setStep(2); }}
                    className="quiz-option hover-target"
                  >
                    <div className="text-lg font-serif mb-1">{p.label}</div>
                    <div className="text-secondary text-xs">{p.desc}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(0)}
                className="mt-8 text-secondary text-xs tracking-widest uppercase hover:text-white transition-colors hover-target"
              >
                ← Kembali
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full glass-strong flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif mb-2">Ringkasan Konsultasi</h3>
                <p className="text-secondary text-sm">Ukuran: <span className="text-white">{size}</span> · Penempatan: <span className="text-white">{placement}</span></p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium rounded-lg hover:bg-secondary hover:text-white transition-all duration-500 hover-target"
                >
                  Hubungi via WhatsApp
                </a>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center px-8 py-4 border border-border text-xs tracking-[0.2em] uppercase rounded-lg hover:border-white transition-all duration-500 hover-target"
                >
                  Ulangi
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ─── Booking CTA ─── */
const Booking = () => (
  <section className="py-32 px-4 text-center bg-richBlack">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-12 italic">
        Ready to make your mark?
      </h2>
      <a
        href="https://wa.me/6282298402516"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-underline inline-block px-12 py-4 border border-white hover:bg-white hover:text-black transition-all duration-500 tracking-[0.2em] uppercase text-xs hover-target"
      >
        Book an Appointment
      </a>
    </motion.div>
  </section>
);

/* ─── Footer ─── */
const Footer = () => (
  <footer className="py-16 px-4 border-t border-border bg-richBlack">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Everpace" className="w-10 h-10 rounded object-cover grayscale opacity-60" />
        <span className="text-xs tracking-[0.3em] uppercase text-secondary">Everpace Tattoo Studio</span>
      </div>
      <p className="text-xs tracking-widest text-secondary uppercase">
        &copy; {new Date().getFullYear()} Everpace. All rights reserved.
      </p>
    </div>
  </footer>
);

/* ─── Main App ─── */
function App() {
  return (
    <div className="bg-richBlack text-white selection:bg-white selection:text-black">
      <CustomCursor />
      <Hero />
      <Gallery />
      <Philosophy />
      <Process />
      <ConsultationQuiz />
      <Booking />
      <Footer />
    </div>
  );
}

export default App;


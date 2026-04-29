import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import logo from './assets/logo.jpeg';
import './App.css';

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
        Everpace Tattoo
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
    { id: 1, src: logo, title: 'Traditional / Oldschool', artist: 'Everpace' },
    { id: 2, src: logo, title: 'Neo Traditional', artist: 'Everpace' },
    { id: 3, src: logo, title: 'Realism / Realistic', artist: 'Everpace' },
    { id: 4, src: logo, title: 'Japanese', artist: 'Everpace' },
    { id: 5, src: logo, title: 'Watercolor', artist: 'Everpace' },
    { id: 6, src: logo, title: 'Geometric', artist: 'Everpace' },
    { id: 7, src: logo, title: 'Lettering', artist: 'Everpace' },
    { id: 8, src: logo, title: 'Blackwork', artist: 'Everpace' },
    { id: 9, src: logo, title: 'Minimalist / Fineline', artist: 'Everpace' },

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
  const [ink, setInk] = useState('');

  const sizes = [
    { label: 'Small', desc: '3-5 cm', time: '0.5 - 1 hr' },
    { label: 'Medium', desc: '6-10 cm', time: '1 - 2 hrs' },
    { label: 'Big', desc: '15+ cm', time: 'Depends on complexity' },
  ];

  const placements = [
    { label: 'Arm', desc: 'Forearm / Upper arm' },
    { label: 'Neck', desc: 'Side / Nape' },
    { label: 'Back', desc: 'Full / Upper / Lower' },
    { label: 'Foot', desc: 'Ankle / Top of foot' },
  ];

  const inks = [
    { label: 'Black', desc: 'Classic black ink' },
    { label: 'Colour', desc: 'Vibrant coloured ink' },
  ];

  const reset = () => {
    setStep(0);
    setSize('');
    setPlacement('');
    setInk('');
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Everpace! I would like to book a tattoo consultation.\nSize: ${size}\nPlacement: ${placement}\nInk: ${ink}\nPlease provide more information, thank you!`
    );
    return `https://wa.me/6282298402516?text=${text}`;
  };

  const handleWhatsAppClick = () => {
    const url = getWhatsAppLink();
    window.location.href = url;
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
            Get an estimate for your dream tattoo
          </p>
        </motion.div>

        <div className="glass rounded-2xl p-8 md:p-12">
          {/* Progress */}
          <div className="quiz-progress mb-10">
            <div
              className="quiz-progress-fill"
              style={{ width: step === 0 ? '25%' : step === 1 ? '50%' : step === 2 ? '75%' : '100%' }}
            />
          </div>

          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-serif mb-8 text-center">Choose your tattoo size</h3>
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
              <h3 className="text-xl font-serif mb-8 text-center">Choose placement</h3>
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
                ← Back
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-serif mb-8 text-center">Choose ink type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inks.map((i) => (
                  <button
                    key={i.label}
                    onClick={() => { setInk(i.label); setStep(3); }}
                    className="quiz-option hover-target"
                  >
                    <div className="text-lg font-serif mb-1">{i.label}</div>
                    <div className="text-secondary text-xs">{i.desc}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="mt-8 text-secondary text-xs tracking-widest uppercase hover:text-white transition-colors hover-target"
              >
                ← Back
              </button>
            </motion.div>
          )}

          {step === 3 && (
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
                <h3 className="text-2xl font-serif mb-2">Consultation Summary</h3>
                <p className="text-secondary text-sm">
                  Size: <span className="text-white">{size}</span> · Placement: <span className="text-white">{placement}</span> · Ink: <span className="text-white">{ink}</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppLink()}
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium rounded-lg hover:bg-secondary hover:text-white transition-all duration-500 hover-target"
                >
                  Contact via WhatsApp
                </a>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center px-8 py-4 border border-border text-xs tracking-[0.2em] uppercase rounded-lg hover:border-white transition-all duration-500 hover-target"
                >
                  Restart
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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <a
          href="https://wa.me/6282298402516"
          onClick={(e) => {
            e.preventDefault();
            window.open('https://wa.me/6282298402516', '_blank', 'noopener,noreferrer');
          }}
          className="btn-underline inline-block px-12 py-4 border border-white hover:bg-white hover:text-black transition-all duration-500 tracking-[0.2em] uppercase text-xs hover-target"
        >
          Book an Appointment
        </a>
        <a
          href="https://instagram.com/everpace.tattoo"
          onClick={(e) => {
            e.preventDefault();
            window.open('https://instagram.com/everpace.tattoo', '_blank', 'noopener,noreferrer');
          }}
          className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors tracking-[0.2em] uppercase text-xs hover-target"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          @everpace.tattoo
        </a>
      </div>
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

      <div className="flex items-center gap-6">
        <a
          href="https://instagram.com/everpace.tattoo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-target text-secondary hover:text-white transition-colors"
          aria-label="Instagram"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>
        <a
          href="https://wa.me/6282298402516"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-target text-secondary hover:text-white transition-colors"
          aria-label="WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
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

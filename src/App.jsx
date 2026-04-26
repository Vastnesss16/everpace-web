import { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import logo from './assets/logo.jpeg';
import './App.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      if (e.target.closest('.hover-target')) {
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
      <span className="cursor-text">View Project</span>
    </div>
  );
};

const FoxLogo = () => (
  <motion.svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial="hidden"
    animate="visible"
  >
    {/* Ears */}
    <motion.path
      d="M30 40 L20 20 L45 35 M70 40 L80 20 L55 35"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: { 
          pathLength: 1, 
          opacity: 1,
          transition: { duration: 1.5, ease: "easeInOut" }
        }
      }}
    />
    {/* Head/Face */}
    <motion.path
      d="M50 85 L25 45 C25 45 35 35 50 35 C65 35 75 45 75 45 L50 85 Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: { 
          pathLength: 1, 
          opacity: 1,
          transition: { duration: 2, ease: "easeInOut", delay: 0.5 }
        }
      }}
    />
    {/* Nose detail */}
    <motion.circle
      cx="50"
      cy="85"
      r="1.5"
      fill="white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5 }}
    />
  </motion.svg>
);

const Hero = () => (
  <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
    <div className="mb-8">
      <FoxLogo />
    </div>
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="text-5xl md:text-7xl font-serif mb-4"
    >
      Ink that outlasts time
    </motion.h1>
  </section>
);

const Gallery = () => {
  const tattoos = [
    { id: 1, src: logo, title: "Abstract Flow" },
    { id: 2, src: logo, title: "Minimalist Geometry" },
    { id: 3, src: logo, title: "Nature's Edge" },
    { id: 4, src: logo, title: "Modern Script" },
    { id: 5, src: logo, title: "Fine Line Art" },
    { id: 6, src: logo, title: "Eternal Bloom" },
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif mb-12 text-center">Portfolio</h2>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {tattoos.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 break-inside-avoid hover-target group cursor-none overflow-hidden"
          >
            <motion.img 
              src={item.src} 
              alt={item.title}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="mt-4 text-sm tracking-widest uppercase text-secondary">
              {item.title}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: "Consultation", desc: "Understanding your story and vision." },
    { title: "Design", desc: "Crafting a unique piece of art for you." },
    { title: "Tattooing", desc: "Precise execution with clinical safety." },
  ];

  const scrollRef = useRef(null);
  useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={scrollRef} className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-serif mb-24 text-center">The Journey</h2>
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="flex-1 border-l border-border pl-8 py-4"
            >
              <span className="text-xs text-secondary mb-4 block">0{idx + 1}</span>
              <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
              <p className="text-secondary leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Booking = () => (
  <section className="py-32 px-4 text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-6xl font-serif mb-12 italic">Ready to make your mark?</h2>
      <button className="px-12 py-4 border border-white hover:bg-white hover:text-black transition-all duration-500 tracking-[0.2em] uppercase text-xs">
        Book an Appointment
      </button>
    </motion.div>
  </section>
);

function App() {
  return (
    <div className="bg-black text-white selection:bg-white selection:text-black">
      <CustomCursor />
      <Hero />
      <Gallery />
      <Process />
      <Booking />
      <footer className="py-12 border-t border-border text-center text-xs tracking-widest text-secondary uppercase">
        &copy; {new Date().getFullYear()} Everpace Tattoo Studio. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

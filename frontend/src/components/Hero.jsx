import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./SvgIcons";
import Magnetic from "./Magnetic";

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  const roles = [
    
    "Full Stack Developer",
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 120);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 lg:px-20 pt-28 pb-20 md:pt-0 md:pb-0"
    >
      
      {/* Background Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-secondary/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="text-sm font-medium tracking-wide text-accent-secondary uppercase">
              Welcome to the future
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-4"
          >
            Vinayak <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary to-accent">Hosur</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-12 md:h-16 text-2xl md:text-4xl font-light text-text-hero-sub mb-6 flex items-center gap-2"
          >
            <span className="text-accent-secondary font-mono">&lt;</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-display tracking-wide">{text}</span>
            <span className="animate-pulse w-[2px] h-8 md:h-10 bg-accent-secondary ml-1" />
            <span className="text-accent-secondary font-mono">/&gt;</span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-lg md:text-xl text-text-muted max-w-[500px] leading-relaxed mb-10 font-light"
          >
            I architect cinematic digital experiences bridging the gap between premium design and complex engineering.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="outline-none" data-cursor="pointer">
              <Magnetic>
                <button className="relative overflow-hidden group px-8 py-4 bg-accent text-foreground rounded-full font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(108,92,231,0.5)]">
                  <span className="relative z-10">Explore Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Magnetic>
            </a>
            <a href="/Vinayak_Resume_2026.pdf" target="_blank" rel="noopener noreferrer" className="outline-none" data-cursor="pointer">
              <Magnetic>
                <button className="px-8 py-4 bg-transparent text-foreground border border-white/20 rounded-full font-medium tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/40 backdrop-blur-md">
                  View Resume
                </button>
              </Magnetic>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex gap-6 mt-8 md:mt-16 z-20 relative"
          >
            <Magnetic><SocialLink href="https://www.linkedin.com/in/vinayak-hosur-49074b22a/" icon={<LinkedinIcon />} /></Magnetic>
            <Magnetic><SocialLink href="https://github.com/Vinayak123V" icon={<GithubIcon />} /></Magnetic>
          </motion.div>
        </motion.div>
        
        {/* Right side for potential 3D / Image integration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
          className="flex justify-center items-center relative"
        >
          <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">
            {/* Holographic glowing rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-accent/30 rounded-full border-dashed pointer-events-none"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 md:inset-6 lg:inset-8 border-2 border-accent-secondary/20 rounded-full pointer-events-none"
            />
            
            {/* Image container with perfect centering */}
            <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_100px_rgba(108,92,231,0.3)] z-10 bg-gradient-to-br from-accent/10 to-accent-secondary/10">
              <motion.img
                src="/VINAY.png"
                alt="Vinayak Hosur"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: 'center 20%'
                }}
                data-cursor="view"
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent mix-blend-overlay pointer-events-none" />
              
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: '0 0 60px rgba(108, 92, 231, 0.6) inset'
                }}
              />
            </div>
            
            {/* Additional decorative elements */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-6 md:inset-10 lg:inset-12 border border-accent/20 rounded-full pointer-events-none"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 cursor-pointer z-20 hidden md:flex"
        data-cursor="pointer"
        onClick={() => {
          const el = document.getElementById("about-profile");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-accent-secondary"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-text-muted hover:text-accent-secondary transition-colors duration-300"
      data-cursor="pointer"
    >
      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm hover:border-accent/50 hover:bg-white/10 transition-all duration-300">
        <span className="w-5 h-5">{icon}</span>
      </div>
    </a>
  );
}

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import TextReveal from "./TextReveal";

function AnimatedCounter({ to, suffix = "", label }) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 40, damping: 20 });
  const rounded = useTransform(spring, val => Math.round(val));

  useEffect(() => {
    const timeout = setTimeout(() => count.set(to), 300);
    return () => clearTimeout(timeout);
  }, [to, count]);

  return (
    <div className="flex flex-col items-center justify-center p-6 border border-white/5 bg-white/5 backdrop-blur-xl rounded-2xl hover:border-accent/40 transition-colors duration-500">
      <div className="flex items-baseline gap-1">
        <motion.span className="text-4xl lg:text-5xl font-display font-bold text-accent-secondary tabular-nums drop-shadow-[0_0_15px_rgba(162,155,254,0.4)]">
          {rounded}
        </motion.span>
        <span className="text-3xl lg:text-4xl font-display font-bold text-accent-secondary">{suffix}</span>
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-text-muted">{label}</p>
    </div>
  );
}

export default function AboutProfile() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    
    { to: 10, suffix: "+", label: "Projects Completed" },
    { to: 10, suffix: "+", label: "Technologies" },
    { to: 5, suffix: "+", label: "Certifications" }
  ];

  return (
    <section
      id="about-profile"
      ref={ref}
      className="relative min-h-screen py-32 px-6 lg:px-20 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl lg:text-7xl font-display font-bold mb-4 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary to-accent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Animated Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            >
              <AnimatedCounter to={stat.to} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="text-3xl lg:text-4xl font-display font-bold mb-6 leading-tight">
              Architecting the <br/>
              <span className="text-accent-secondary italic">digital future</span>
            </h3>
            <div className="text-lg text-text-muted leading-relaxed mb-8 font-light text-justify">
              <TextReveal>
                With a Master of Computer Applications (MCA) currently being pursued, my area of expertise is designing contemporary, user-friendly websites. Something that initially sparked curiosity with HTML & CSS at the age of 19 has now become a career ambition: developing beautiful applications that address real-life issues using clean code and intuitive interfaces.
              </TextReveal>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative"
          >
            {/* Background glowing blob */}
            <div className="absolute -inset-10 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
            
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#ffffff"
              glarePosition="all"
              scale={1.02}
              transitionSpeed={2000}
              className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl overflow-hidden"
            >
              <div className="space-y-6">
                {[
                  { label: "Name", value: "Vinayak Hosur" },
                  { label: "Email", value: "vinayakhosur85@gmail.com" },
                  { label: "Location", value: "Bengaluru, India" },
                  { label: "Status", value: "Open to opportunities" }
                ].map((item, i) => (
                  <InfoRow key={item.label} label={item.label} value={item.value} index={i} inView={inView} />
                ))}
              </div>

              <motion.a
                href="/Vinayak_Resume_2026.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent-secondary text-foreground rounded-xl font-bold tracking-wide shadow-[0_0_20px_rgba(108,92,231,0.3)] transition-all hover:shadow-[0_0_40px_rgba(108,92,231,0.5)] outline-none"
                data-cursor="pointer"
              >
                Download Resume
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </motion.a>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
      className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
    >
      <span className="text-sm font-semibold tracking-wider text-text-muted uppercase mb-1 sm:mb-0">
        {label}
      </span>
      <span className="text-base text-foreground font-medium group-hover:text-accent-secondary transition-colors break-words">
        {value}
      </span>
    </motion.div>
  );
}

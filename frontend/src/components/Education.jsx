import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationIcon, BookIcon, CalendarIcon, MapPinIcon } from "./SvgIcons";

// Circular Progress Component
const CircularProgress = ({ value, max, color, label }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="3"
          />
          <motion.path
            initial={{ strokeDasharray: "0, 100" }}
            whileInView={{ strokeDasharray: `${percentage}, 100` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-foreground tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{value}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-text-muted uppercase tracking-widest">{label}</span>
        <span className="text-sm font-semibold text-text-card-title">Score</span>
      </div>
    </div>
  );
};

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Sri Venkateshwar College Of Engineering",
      duration: "2024 - 2026",
      location: "Bangalore, Karnataka",
      gpaValue: 9.19,
      gpaMax: 10,
      gpaLabel: "CGPA",
      icon: <GraduationIcon style={{ fontSize: 20, color: "#fff" }} />,
      color: "#a29bfe",
      side: "left",
      semesters: [
        { sem: "1st Sem", value: 8.75 },
        { sem: "2nd Sem", value: 8.62 },
        { sem: "3rd Sem", value: 9.63 }
      ]
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "KLE Society's College Of BCA",
      duration: "2021 - 2024",
      location: "Gokak, Karnataka",
      gpaValue: 8.80,
      gpaMax: 10,
      gpaLabel: "CGPA",
      icon: <BookIcon style={{ fontSize: 20, color: "#fff" }} />,
      color: "#00d2d3",
      side: "right",
      semesters: [
        { sem: "1st Sem", value: 8.73 },
        { sem: "2nd Sem", value: 8.73 },
        { sem: "3rd Sem", value: 8.94 },
        { sem: "4th Sem", value: 9.00 },
        { sem: "5th Sem", value: 8.64 },
        { sem: "6th Sem", value: 8.77 }
      ]
    }
  ];

  return (
    <section id="education" ref={ref} className="py-32 px-6 lg:px-20 relative min-h-screen">
      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl lg:text-7xl font-display font-bold tracking-tight mb-6">
            Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">Timeline</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative py-8">
          {/* Center Glowing Line */}
          <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 lg:-translate-x-1/2">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-accent to-[#00d2d3] shadow-[0_0_20px_rgba(108,92,231,0.6)]" 
            />
          </div>

          <div className="flex flex-col gap-16 lg:gap-32 relative">
            {education.map((edu, index) => (
              <TimelineNode key={index} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({ edu, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [showSemesters, setShowSemesters] = useState(false);
  const isLeft = edu.side === "left";

  return (
    <div ref={ref} className={`flex flex-col lg:flex-row items-start lg:items-center w-full relative ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
      
      {/* Mobile Center Line Adjustment */}
      <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 lg:hidden" />

      {/* Node Marker */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
        className="absolute left-0 lg:left-1/2 -translate-x-0 lg:-translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 z-20 flex items-center justify-center shadow-[0_0_30px_rgba(108,92,231,0.5)]"
        style={{ borderColor: edu.color, boxShadow: `0 0 20px ${edu.color}60` }}
      >
        {edu.icon}
      </motion.div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 30 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        className={`w-full lg:w-[calc(50%-60px)] pl-20 lg:pl-0 ${!isLeft ? 'lg:pl-0' : 'lg:pr-[60px]'}`}
      >
        <div className="relative group bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-all duration-500 shadow-2xl overflow-hidden">
          
          {/* Decorative Glow */}
          <div 
            className="absolute top-0 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-20"
            style={{ 
              background: edu.color,
              [isLeft ? 'right' : 'left']: '-50px' 
            }}
          />

          <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
            {edu.degree}
          </h3>
          <p className="text-lg font-semibold mb-6" style={{ color: edu.color }}>
            {edu.institution}
          </p>

          <div className="flex flex-wrap gap-3 mb-8 text-sm text-text-muted">
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <CalendarIcon style={{ fontSize: 16, color: edu.color }} /> {edu.duration}
            </span>
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <MapPinIcon style={{ fontSize: 16, color: edu.color }} /> {edu.location}
            </span>
          </div>

          <div className="flex justify-between items-center border-t border-white/10 pt-6">
            <CircularProgress value={edu.gpaValue} max={edu.gpaMax} color={edu.color} label={edu.gpaLabel} />
            
            {edu.semesters && (
              <button
                onClick={() => setShowSemesters(!showSemesters)}
                className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 outline-none backdrop-blur-md"
                style={{
                  background: showSemesters ? `${edu.color}20` : 'transparent',
                  color: showSemesters ? edu.color : 'white',
                  border: `1px solid ${edu.color}50`,
                }}
              >
                {showSemesters ? "Hide Details" : "View Details"}
              </button>
            )}
          </div>

          {/* Semester-wise Breakdown */}
          <AnimatePresence>
            {showSemesters && edu.semesters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-widest">
                    Performance Matrix
                  </p>
                  <div className="flex flex-col gap-3">
                    {edu.semesters.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                      >
                        <span className="text-sm font-medium text-text-secondary">{s.sem}</span>
                        <span className="text-base font-bold tabular-nums" style={{ color: edu.color }}>
                          {s.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const technologies = [
    { name: "React", icon: "⚛️", color: "#61dafb" },
    { name: "TypeScript", icon: "📘", color: "#3178c6" },
    { name: "CSS", icon: "🎨", color: "#06b6d4" },
    { name: "Node.js", icon: "🟢", color: "#339933" },
    { name: "Git", icon: "🌿", color: "#f05032" },
    { name: "GitHub", icon: "🐙", color: "#181717" },
    { name: "Docker", icon: "🐳", color: "#2496ed" },
    { name: "Firebase", icon: "🔥", color: "#ffca28" },
    { name: "MongoDB", icon: "🍃", color: "#47a248" },
    { name: "PostgreSQL", icon: "🐘", color: "#4169e1" }
  ];

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "100px 5%",
        background: "transparent",
        color: "var(--text-primary)"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "var(--text-primary)",
              marginBottom: "1rem"
            }}
          >
            Skills & Expertise
          </h2>
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "var(--gradient-accent-h)",
              margin: "0 auto 1.5rem",
              borderRadius: "2px"
            }}
          />
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              maxWidth: "700px",
              margin: "0 auto 3rem",
              lineHeight: "1.8"
            }}
          >
            I specialize in front-end development with expertise in various web
            technologies and frameworks.
          </p>

          <h3
            style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "2.5rem"
            }}
          >
            Technologies & Tools
          </h3>
        </motion.div>

        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "1.5rem"
  }}
>
        
          {technologies.map((tech, index) => (
            <TechCard key={index} tech={tech} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCard({ tech, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.05 }}
      style={{
        background: "var(--bg-card)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "2rem 1.5rem",
        textAlign: "center",
        boxShadow: "var(--shadow-card)",
        transition: "all 0.3s",
        border: "1px solid var(--border-light)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "140px"
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ rotate: 360, scale: 1.2 }}
        style={{
          fontSize: "3rem",
          marginBottom: "1rem"
        }}
      >
        {tech.icon}
      </motion.div>
      <h4
        style={{
          fontSize: "1rem",
          fontWeight: "600",
          color: "var(--text-card-title)",
          margin: 0
        }}
      >
        {tech.name}
      </h4>
    </motion.div>
  );
}

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
        background: "linear-gradient(135deg, #F6E4E1, #EAF6EF, #E1F0FB )",
        color: "#333"
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
              color: "#222",
              marginBottom: "1rem"
            }}
          >
            Skills & Expertise
          </h2>
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "#4a90e2",
              margin: "0 auto 1.5rem",
              borderRadius: "2px"
            }}
          />
          <p
            style={{
              color: "#666",
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
              color: "#222",
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
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "2rem 1.5rem",
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "140px"
      }}
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.2 }}
        transition={{ duration: 0.6 }}
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
          color: "#222",
          margin: 0
        }}
      >
        {tech.name}
      </h4>
    </motion.div>
  );
}

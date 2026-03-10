import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Sri Venkateshwar College Of Engineering",
      duration: "2024 - 2026",
      location: "Bangalore, Karnataka",
      gpa: "Cumulative GPA: 8.75/10 (After 2st Semester)",
      icon: "🎓",
      color: "#667eea"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "KLE Socity's College Of BCA",
      duration: "2021 - 2024",
      location: "Gokak, Karnataka",
      gpa: "Percentage: CGA: 8.75",
      icon: "📚",
      color: "#4a90e2"
    },
    
  ];

  return (
    <section
      id="education"
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
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#222",
              marginBottom: "1rem"
            }}
          >
            Education Journey
          </h2>
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "#4a90e2",
              margin: "0 auto",
              borderRadius: "2px"
            }}
          />
        </motion.div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
          }}
        >
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ edu, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -5 }}
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        padding: "2.5rem",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: "2rem",
        alignItems: "center",
        transition: "all 0.3s"
      }}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "80px",
          height: "80px",
          background: edu.color,
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          boxShadow: `0 5px 15px ${edu.color}40`
        }}
      >
        {edu.icon}
      </motion.div>

      <div style={{ textAlign: "left" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: edu.color,
            marginBottom: "0.5rem"
          }}
        >
          {edu.degree}
        </h3>
        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: "500",
            color: "#333",
            marginBottom: "0.8rem"
          }}
        >
          {edu.institution}
        </p>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            fontSize: "0.95rem",
            color: "#666"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>📅</span>
            <span>{edu.duration}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>📍</span>
            <span>{edu.location}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>🎯</span>
            <span style={{ fontWeight: "600", color: "#333" }}>{edu.gpa}</span>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "60px",
          height: "60px",
          background: `${edu.color}15`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          color: edu.color,
          fontWeight: "700"
        }}
      >
        {index + 1}
      </div>
    </motion.div>
  );
}

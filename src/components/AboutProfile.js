import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutProfile() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="about-profile"
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
            About Me
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
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "4rem",
            alignItems: "center"
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
                color: "#222",
                marginBottom: "1.5rem",
                lineHeight: "1.4"
              }}
            >
              Passionate Full Stack Developer 
            </h3>
            <p
              style={{
                color: "#666",
                fontSize: "1.05rem",
                lineHeight: "1.8",
                marginBottom: "1.5rem"
              }}
            >
              With a Master of Computer Applications (MCA) currently being
              pursued, my area of expertise is designing contemporary,
              user-friendly websites. Something that initially sparked curiosity
              with HTML & CSS at the age of 19 has now become a career ambition:
              developing beautiful applications that address real-life issues
              using clean code and intuitive interfaces.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              padding: "2.5rem",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
            }}
          >
            <InfoRow label="Name:" value="Vinayak Hosur" />
            <InfoRow label="Email:" value="vinayakhosur85@gmail.com" />
            <InfoRow label="Location:" value="Bengaluru, India" />
            <InfoRow label="Availability:" value="Open to opportunities" />

            <motion.a
              href="/Vinayak_Resume_2025.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-block",
                marginTop: "2rem",
                padding: "14px 35px",
                background: "#222",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "all 0.3s"
              }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        marginBottom: "1.2rem",
        alignItems: "start"
      }}
    >
      <span
        style={{
          fontWeight: "600",
          color: "#222",
          fontSize: "0.95rem"
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "#666",
          fontSize: "0.95rem",
          wordBreak: "break-word"
        }}
      >
        {value}
      </span>
    </div>
  );
}

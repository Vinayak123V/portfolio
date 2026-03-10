import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import io from "socket.io-client";
import { FaGithub,FaEnvelope,FaYoutube,FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("typing-status", (data) => {
        if (data.email !== form.email) {
          setIsTyping(data.isTyping);
        }
      });
    }
  }, [socket, form.email]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (socket) {
      socket.emit("typing", { email: form.email, isTyping: value.length > 0 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await axios.post("http://localhost:5000/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  const contactInfo = [
    { icon: "📧", label: "Email", value: "vinayakhosur85@gmail.com" },
    { icon: "📱", label: "Phone", value: "+91 9483065328" },
    { icon: "📍", label: "Location", value: "Bagalkot, India" }
  ];

  return (
    <section id="contact" ref={ref} style={{
      padding: "100px 5%",
      background: "linear-gradient(135deg, #F6E4E1, #EAF6EF, #E1F0FB )",
      color: "black"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span style={{ color: "#00ff88", fontSize: "1.1rem", fontWeight: "600" }}>
            GET IN TOUCH
          </span>
          <h2 style={{
            fontSize: "3rem",
            fontWeight: "700",
            color:"black",
            marginTop: "1rem",
            marginBottom: "1.5rem"
          }}>
            Contact Me
          </h2>
          <p style={{
            color: "black",
            fontSize: "1.1rem",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.8"
          }}>
            Have a project in mind? Let's work together to create something amazing
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "3rem",
          alignItems: "start"
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 style={{
              fontSize: "1.8rem",
              marginBottom: "2rem",
              color: "black"
            }}>
              Let's Talk
            </h3>
            <p style={{
              color: "black",
              lineHeight: "1.8",
              marginBottom: "2.5rem"
            }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                  padding: "1.5rem",
                  background: "white",
                  borderRadius: "15px",
                  border: "1px solid #222"
                }}
              >
                <span style={{ fontSize: "2rem" }}>{info.icon}</span>
                <div>
                  <div style={{ color: "#888", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                    {info.label}
                  </div>
                  <div style={{ color: "black", fontWeight: "500" }}>
                    {info.value}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "2rem"
              }}
            >
            {[
  { href: "https://github.com", icon: <FaGithub /> },
  { href: "https://linkedin.com", icon: <FaLinkedin /> },
  { href: "https://twitter.com", icon: <FaTwitter /> }
].map((social, index) => (
  <a
    key={index}
    href={social.href}
    target="_blank"
    rel="noreferrer"
    style={{
      width: "50px",
      height: "50px",
      display: "flex",          // ✅ REQUIRED
      alignItems: "center",     // ✅ CENTER
      justifyContent: "center", // ✅ CENTER
      border: "2px solid #222",
      borderRadius: "10px",
      textDecoration: "none",
      fontSize: "22px",         // ✅ Bigger icons
      color: "blue",            // ✅ Visible color
      transition: "all 0.3s",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => {
      e.target.style.background = "#00ff88";
      e.target.style.color = "#0a0a0a";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = "transparent";
      e.target.style.color = "#00ff88";
    }}
  >
    {social.icon}
  </a>
))}

            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: "3rem",
              borderRadius: "20px",
              border: "1px solid #222"
            }}
          >
            {isTyping && (
              <div style={{
                color: "#00ff88",
                marginBottom: "1rem",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <span style={{
                  width: "8px",
                  height: "8px",
                  background: "#00ff88",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite"
                }} />
                Someone else is typing...
              </div>
            )}

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "black",
                fontSize: "0.9rem"
              }}>
                Your Name
              </label>
              <input
                placeholder="Vinayak Hosur"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "15px",
                  background: "white",
                  border: "2px solid #222",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  color: "black",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#00ff88"}
                onBlur={(e) => e.target.style.borderColor = "#222"}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "black",
                fontSize: "0.9rem"
              }}>
                Your Email
              </label>
              <input
                type="email"
                placeholder="vinayakhosur85@gmail.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "15px",
                  background: "white",
                  border: "2px solid #222",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  color: "black",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#00ff88"}
                onBlur={(e) => e.target.style.borderColor = "#222"}
              />
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "black",
                fontSize: "0.9rem"
              }}>
                Your Message
              </label>
              <textarea
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                rows="6"
                style={{
                  width: "100%",
                  padding: "15px",
                  background: "white",
                  border: "2px solid #222",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  color: "black",
                  resize: "vertical",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#00ff88"}
                onBlur={(e) => e.target.style.borderColor = "#222"}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "sending"}
              style={{
                width: "100%",
                padding: "18px",
                background: status === "success" ? "#10b981" : status === "error" ? "#ef4444" : "#00ff88",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "10px",
                fontSize: "1.1rem",
                fontWeight: "700",
                cursor: status === "sending" ? "not-allowed" : "pointer",
                transition: "all 0.3s"
              }}
            >
              {status === "sending" ? "Sending..." : status === "success" ? "✓ Message Sent!" : status === "error" ? "✗ Error Occurred" : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>

    

{/* FOOTER */}
<footer
  style={{
    background: "linear-gradient(135deg, #EAF6EF, #E1F0FB)",
    padding: "50px 1%",
    marginTop: "100px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    borderTop: "1px solid #ddd"
  }}
>
  {/* LEFT SIDE */}
  <div>
    <h2
      style={{
        color: "#2563EB",
        marginBottom: "12px",
        fontSize: "1.6rem",
        fontWeight: "700"
      }}
    >
      Vinayak Hosur
    </h2>

    <p
      style={{
        color: "#555",
        maxWidth: "420px",
        lineHeight: "1.7",
        fontSize: "1rem"
      }}
    >
      Harnessing machine learning and statistical analysis to uncover
      hidden patterns in data.
    </p>
  </div>

  {/* RIGHT SIDE */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "18px"
    }}
  >
    {/* SOCIAL ICONS */}
    <div
      style={{
        display: "flex",
        gap: "22px",
        fontSize: "1.5rem"
      }}
    >
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#111" }}
      >
        <FaGithub />
      </a>

      <a
        href="https://linkedin.com/in/yourprofile"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#111" }}
      >
        <FaLinkedin />
      </a>

      <a
        href="mailto:yourmail@gmail.com"
        style={{ color: "#111" }}
      >
        <FaEnvelope />
      </a>

      <a
        href="https://youtube.com/@yourchannel"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#111" }}
      >
        <FaYoutube />
      </a>

      <a
        href="https://instagram.com/yourprofile"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#111" }}
      >
        <FaInstagram />
      </a>
    </div>

    {/* COPYRIGHT */}
    <p
      style={{
        color: "#777",
        fontSize: "0.95rem"
      }}
    >
      © 2026 - All rights reserved.
    </p>
  </div>
</footer>

    </section>
  );
}

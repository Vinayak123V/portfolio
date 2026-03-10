import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";


export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

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

      setTypingSpeed(isDeleting ? 50 : 150);

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
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F6E4E1, #EAF6EF, #E1F0FB )",

        position: "relative",
        overflow: "hidden",
        padding: "0 5%"
      }}
    >
      <GridBackground />
      
      <div style={{
        maxWidth: "1200px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        zIndex: 1
      }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              color: "black",
              fontSize: "1.1rem",
              marginBottom: "1rem",
              fontWeight: "500"
            }}
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: "4rem",
              fontWeight: "700",
              color: "black",
              marginBottom: "1rem",
              lineHeight: "1.1"
            }}
          >
            Vinayak Hosur
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: "2rem",
              color: "black",
              marginBottom: "2rem",
              minHeight: "3rem"
            }}
          >
            <span style={{ color: "#00ff88" }}>&lt;</span>
            {text}
            <span style={{ borderRight: "2px solid #00ff88", marginLeft: "5px" }}>|</span>
            <span style={{ color: "#00ff88" }}> /&gt;</span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              color: "#aaa",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              marginBottom: "2.5rem"
            }}
          >
            I craft beautiful, responsive web applications with modern technologies.
            Passionate about creating seamless user experiences.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            style={{ display: "flex", gap: "1rem" }}
          >
            <a href="#contact" style={{ textDecoration: "none" }}>
              <button className="primary-btn">
                Get In Touch
              </button>
            </a>
            <a href="/Vinayak_Resume_2025.pdf" download style={{ textDecoration: "none" }}>
              <button className="secondary-btn">
                Download CV
              </button>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            style={{
              display: "flex",
              gap: "1.5rem",
              marginTop: "3rem"
            }}
          >
            <SocialLink href="https://github.com" icon={<FaGithub />} />
            <SocialLink href="https://linkedin.com" icon={<FaLinkedin />} />
            <SocialLink href="https://twitter.com" icon={<FaTwitter />} />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div style={{
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "0 0 60px rgba(0, 255, 136, 0.3)"
          }}>
            <div style={{
              width: "380px",
              height: "380px",
              borderRadius: "50%",
              background: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8rem"
            }}>
            <img src="/Vinayak.jpeg" alt="me" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />

            </div>
          </div>

         
        </motion.div>
      </div>
    </section>
  );
}

function GridBackground() {
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        linear-gradient(rgba(0, 255, 136, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 136, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
      opacity: 0.3
    }} />
  );
}


      

function SocialLink({ href, icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      style={{
        color: "#888",
        fontSize: "1.5rem",
        transition: "color 0.3s"
      }}
      onMouseEnter={(e) => e.target.style.color = "#00ff88"}
      onMouseLeave={(e) => e.target.style.color = "#888"}
    >
      {icon}
    </motion.a>
  );
}
